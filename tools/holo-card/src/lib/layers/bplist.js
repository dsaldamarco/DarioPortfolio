/**
 * Minimal binary property list reader + NSKeyedArchiver resolver.
 * Enough for Procreate's Document.archive.
 */

export class UID {
  constructor(value) {
    this.value = value;
  }
}

export function parseBplist(bytes) {
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const magic = String.fromCharCode(...bytes.subarray(0, 6));
  if (magic !== 'bplist') throw new Error('Plist binaria non valida');

  const trailer = bytes.length - 32;
  const offsetSize = bytes[trailer + 6];
  const refSize = bytes[trailer + 7];
  const numObjects = Number(view.getBigUint64(trailer + 8));
  const topObject = Number(view.getBigUint64(trailer + 16));
  const tableOffset = Number(view.getBigUint64(trailer + 24));

  const uint = (pos, size) => {
    let v = 0;
    for (let i = 0; i < size; i++) v = v * 256 + bytes[pos + i];
    return v;
  };
  const offsets = new Array(numObjects);
  for (let i = 0; i < numObjects; i++) offsets[i] = uint(tableOffset + i * offsetSize, offsetSize);

  const cache = new Map();

  const lengthAt = (pos, low) => {
    // Returns [length, start of payload]
    if (low !== 0xf) return [low, pos + 1];
    const marker = bytes[pos + 1];
    const size = 1 << (marker & 0xf);
    return [uint(pos + 2, size), pos + 2 + size];
  };

  const read = (index) => {
    if (cache.has(index)) return cache.get(index);
    const pos = offsets[index];
    const marker = bytes[pos];
    const high = marker >> 4;
    const low = marker & 0xf;
    let value;
    switch (high) {
      case 0x0:
        value = low === 0x8 ? false : low === 0x9 ? true : null;
        break;
      case 0x1: {
        const size = 1 << low;
        if (size === 8) value = Number(view.getBigInt64(pos + 1));
        else value = uint(pos + 1, size);
        break;
      }
      case 0x2:
        value = low === 2 ? view.getFloat32(pos + 1) : view.getFloat64(pos + 1);
        break;
      case 0x3:
        value = new Date(Date.UTC(2001, 0, 1) + view.getFloat64(pos + 1) * 1000);
        break;
      case 0x4: {
        const [len, start] = lengthAt(pos, low);
        value = bytes.subarray(start, start + len);
        break;
      }
      case 0x5: {
        const [len, start] = lengthAt(pos, low);
        value = new TextDecoder('latin1').decode(bytes.subarray(start, start + len));
        break;
      }
      case 0x6: {
        const [len, start] = lengthAt(pos, low);
        let s = '';
        for (let i = 0; i < len; i++) s += String.fromCharCode(view.getUint16(start + i * 2));
        value = s;
        break;
      }
      case 0x8:
        value = new UID(uint(pos + 1, low + 1));
        break;
      case 0xa: {
        const [len, start] = lengthAt(pos, low);
        value = [];
        cache.set(index, value);
        for (let i = 0; i < len; i++) value.push(read(uint(start + i * refSize, refSize)));
        return value;
      }
      case 0xd: {
        const [len, start] = lengthAt(pos, low);
        value = {};
        cache.set(index, value);
        for (let i = 0; i < len; i++) {
          const key = read(uint(start + i * refSize, refSize));
          value[key] = read(uint(start + (len + i) * refSize, refSize));
        }
        return value;
      }
      default:
        value = null;
    }
    cache.set(index, value);
    return value;
  };

  return read(topObject);
}

/**
 * Wraps an NSKeyedArchiver plist. `root()` returns the root object; `get(obj, key)`
 * follows UIDs and unwraps NSArray / NSString / $null.
 */
export function keyedArchive(plist) {
  const objects = plist.$objects;
  const deref = (v) => {
    let guard = 0;
    while (v instanceof UID && guard++ < 64) v = objects[v.value];
    if (v === '$null') return null;
    if (v && typeof v === 'object' && !Array.isArray(v) && !(v instanceof Uint8Array)) {
      if ('NS.string' in v) return deref(v['NS.string']);
      if ('NS.objects' in v && !('NS.keys' in v)) return v['NS.objects'].map(deref);
      if ('NS.bytes' in v) return deref(v['NS.bytes']);
    }
    return v;
  };
  return {
    root: () => deref(plist.$top?.root ?? plist.$top?.[Object.keys(plist.$top)[0]]),
    get: (obj, key) => (obj ? deref(obj[key]) : undefined),
    deref,
  };
}
