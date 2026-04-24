/**
 * RNG determinista por seed. Permite reproducir un ExerciseAttempt
 * a partir del `input.seed` guardado, lo que hace auditable cada intento.
 *
 * Implementacion: Mulberry32 sobre hash FNV-1a del seed de texto.
 */

export function hashSeed(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function mulberry32(seedNumber: number): () => number {
  let a = seedNumber;
  return function random() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function createRng(seed: string): () => number {
  return mulberry32(hashSeed(seed));
}

export function pick<T>(arr: readonly T[], rng: () => number): T {
  return arr[Math.floor(rng() * arr.length)];
}

export function sampleWithout<T>(arr: readonly T[], count: number, rng: () => number): T[] {
  const pool = arr.slice();
  const out: T[] = [];
  while (out.length < count && pool.length > 0) {
    const idx = Math.floor(rng() * pool.length);
    out.push(pool.splice(idx, 1)[0]);
  }
  return out;
}

export function randomSeed(): string {
  return Math.random().toString(36).slice(2, 10);
}
