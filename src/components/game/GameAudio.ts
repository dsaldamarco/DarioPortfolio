/**
 * GameAudio — Web Audio API engine for the Rhythm Typing Game.
 * All sounds are synthesized in real-time, no external audio files needed.
 */

export class GameAudio {
  private ctx: AudioContext | null = null;
  private _enabled = true;

  private getCtx(): AudioContext | null {
    if (!this._enabled) return null;
    try {
      if (!this.ctx) {
        this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      return this.ctx;
    } catch {
      return null;
    }
  }

  private tone(
    freq: number,
    duration: number,
    type: OscillatorType = 'sine',
    volume = 0.1,
    attack = 0.004,
    delay = 0,
  ) {
    const ctx = this.getCtx();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      filter.type = 'lowpass';
      filter.frequency.value = 6000;
      filter.Q.value = 0.5;

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      const t = ctx.currentTime + delay;
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(volume, t + attack);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);

      osc.start(t);
      osc.stop(t + duration + 0.05);
    } catch {
      // Silently ignore audio errors
    }
  }

  /** Play on PERFECT timing hit */
  playPerfect() {
    // Bright ascending synth chord
    this.tone(880, 0.18, 'sine', 0.09, 0.003, 0);
    this.tone(1108, 0.16, 'sine', 0.06, 0.003, 0.025);
    this.tone(1320, 0.14, 'sine', 0.04, 0.003, 0.05);
  }

  /** Play on GOOD timing hit */
  playGood() {
    this.tone(660, 0.12, 'triangle', 0.07, 0.003, 0);
  }

  /** Play on wrong key */
  playMiss() {
    this.tone(230, 0.09, 'sawtooth', 0.05, 0.002, 0);
    this.tone(218, 0.11, 'sawtooth', 0.04, 0.002, 0.015);
  }

  /** Play on word completion */
  playWordComplete() {
    this.tone(440, 0.32, 'sine', 0.1, 0.003, 0);
    this.tone(554, 0.30, 'sine', 0.07, 0.003, 0.02);
    this.tone(659, 0.28, 'sine', 0.05, 0.003, 0.04);
  }

  /** Play the metronome tick on each beat */
  playBeatTick(strong = false) {
    if (strong) {
      this.tone(110, 0.07, 'sine', 0.14, 0.002, 0);
    } else {
      this.tone(80, 0.05, 'sine', 0.07, 0.002, 0);
    }
  }

  /** Play countdown beep */
  playCountdown(n: number) {
    const freq = n <= 0 ? 880 : 550;
    const vol = n <= 0 ? 0.18 : 0.12;
    this.tone(freq, 0.18, 'sine', vol, 0.003, 0);
  }

  /** Play the beat drop accent when hitting the drop segment */
  playDropBeat() {
    this.tone(120, 0.4, 'sine', 0.18, 0.002, 0);
    this.tone(80, 0.5, 'sine', 0.12, 0.002, 0.12);
  }

  /** Play the final chord sequence at game completion */
  playEnding() {
    const notes = [261, 329, 392, 523, 659, 784, 1047];
    notes.forEach((freq, i) => {
      const vol = Math.max(0.03, 0.14 - i * 0.016);
      this.tone(freq, 0.55, 'sine', vol, 0.01, i * 0.08);
    });
  }

  setEnabled(val: boolean) {
    this._enabled = val;
  }
}

// Singleton — one audio engine for the whole game session
export const gameAudio = new GameAudio();
