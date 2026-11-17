/**
 * Small decompressors for Procreate tiles. Procreate stores each 256×256 tile
 * of each layer as an LZO1X block (newer files may use LZ4). Both are tiny
 * formats, so they live here instead of pulling in extra dependencies.
 * `size` is the expected output length: tiles are always w*h*4 bytes.
 */

/** LZO1X decompression (port of lzo1x_decompress_safe). */
export function lzo1x(src, size) {
  const out = new Uint8Array(size);
  let ip = 0;
  let op = 0;
  let t = 0;
  let mPos = 0;

  const fail = () => {
    throw new Error('LZO: dati non validi');
  };
  const literals = (n) => {
    if (ip + n > src.length || op + n > size) fail();
    out.set(src.subarray(ip, ip + n), op);
    ip += n;
    op += n;
  };
  const copyMatch = (from, n) => {
    if (from < 0 || op + n > size) fail();
    for (let i = 0; i < n; i++) out[op++] = out[from++];
  };
  const longLength = (base) => {
    let n = 0;
    while (src[ip] === 0) {
      n += 255;
      ip++;
      if (ip >= src.length) fail();
    }
    return n + base + src[ip++];
  };

  // States of the reference implementation's goto graph.
  const LOOP = 0;
  const FIRST_LITERAL_RUN = 1;
  const MATCH = 2;
  const MATCH_DONE = 3;
  const MATCH_NEXT = 4;
  let state = LOOP;

  if (src[0] > 17) {
    t = src[ip++] - 17;
    if (t < 4) {
      state = MATCH_NEXT;
    } else {
      literals(t);
      state = FIRST_LITERAL_RUN;
    }
  }

  for (;;) {
    switch (state) {
      case LOOP:
        if (ip >= src.length) fail();
        t = src[ip++];
        if (t >= 16) {
          state = MATCH;
          break;
        }
        if (t === 0) t = longLength(15);
        literals(t + 3);
        state = FIRST_LITERAL_RUN;
        break;

      case FIRST_LITERAL_RUN:
        t = src[ip++];
        if (t >= 16) {
          state = MATCH;
          break;
        }
        mPos = op - (1 + 0x0800) - (t >> 2) - (src[ip++] << 2);
        copyMatch(mPos, 3);
        state = MATCH_DONE;
        break;

      case MATCH:
        if (t >= 64) {
          mPos = op - 1 - ((t >> 2) & 7) - (src[ip++] << 3);
          copyMatch(mPos, (t >> 5) - 1 + 2);
        } else if (t >= 32) {
          t &= 31;
          if (t === 0) t = longLength(31);
          mPos = op - 1 - ((src[ip] >> 2) + (src[ip + 1] << 6));
          ip += 2;
          copyMatch(mPos, t + 2);
        } else if (t >= 16) {
          mPos = op - ((t & 8) << 11);
          t &= 7;
          if (t === 0) t = longLength(7);
          mPos -= (src[ip] >> 2) + (src[ip + 1] << 6);
          ip += 2;
          if (mPos === op) {
            // End of stream marker
            if (op !== size) fail();
            return out;
          }
          mPos -= 0x4000;
          copyMatch(mPos, t + 2);
        } else {
          mPos = op - 1 - (t >> 2) - (src[ip++] << 2);
          copyMatch(mPos, 2);
        }
        state = MATCH_DONE;
        break;

      case MATCH_DONE:
        t = src[ip - 2] & 3;
        if (t === 0) {
          state = LOOP;
          break;
        }
        state = MATCH_NEXT;
        break;

      case MATCH_NEXT:
        literals(t);
        t = src[ip++];
        state = MATCH;
        break;

      default:
        fail();
    }
  }
}

/** LZ4 block decompression (no frame header). */
export function lz4Block(src, size) {
  const out = new Uint8Array(size);
  let ip = 0;
  let op = 0;
  while (ip < src.length) {
    const token = src[ip++];
    let len = token >> 4;
    if (len === 15) {
      let b;
      do {
        b = src[ip++];
        len += b;
      } while (b === 255);
    }
    if (op + len > size || ip + len > src.length) throw new Error('LZ4: dati non validi');
    out.set(src.subarray(ip, ip + len), op);
    ip += len;
    op += len;
    if (ip >= src.length) break;
    const offset = src[ip] | (src[ip + 1] << 8);
    ip += 2;
    let mlen = token & 15;
    if (mlen === 15) {
      let b;
      do {
        b = src[ip++];
        mlen += b;
      } while (b === 255);
    }
    mlen += 4;
    let from = op - offset;
    if (offset === 0 || from < 0 || op + mlen > size) throw new Error('LZ4: dati non validi');
    for (let i = 0; i < mlen; i++) out[op++] = out[from++];
  }
  if (op !== size) throw new Error('LZ4: lunghezza errata');
  return out;
}

/** LZ4 frame (magic 04 22 4D 18) → concatenated blocks. */
export function lz4Frame(src, size) {
  const view = new DataView(src.buffer, src.byteOffset, src.byteLength);
  if (view.getUint32(0, true) !== 0x184d2204) throw new Error('LZ4: non è un frame');
  const flg = src[4];
  let ip = 6 + (flg & 0x08 ? 8 : 0) + (flg & 0x01 ? 4 : 0) + 1;
  const out = new Uint8Array(size);
  let op = 0;
  for (;;) {
    const bsize = view.getUint32(ip, true);
    ip += 4;
    if (bsize === 0) break;
    const raw = bsize & 0x80000000;
    const n = bsize & 0x7fffffff;
    const block = src.subarray(ip, ip + n);
    ip += n + (flg & 0x10 ? 4 : 0);
    if (raw) {
      out.set(block, op);
      op += n;
    } else {
      const chunk = lz4Block(block, size - op);
      // lz4Block insists on filling the buffer; frames with several blocks are
      // rare for 1 MB tiles, so a single block is the expected case.
      out.set(chunk, op);
      op += chunk.length;
    }
    if (op >= size) break;
  }
  return out;
}

/** Tries every known tile encoding; returns w*h*4 bytes or throws. */
export function decodeTile(data, size) {
  if (data.length === size) return data;
  if (data[0] === 0x04 && data[1] === 0x22 && data[2] === 0x4d && data[3] === 0x18) return lz4Frame(data, size);
  try {
    return lzo1x(data, size);
  } catch (err) {
    try {
      return lz4Block(data, size);
    } catch {
      throw err;
    }
  }
}
