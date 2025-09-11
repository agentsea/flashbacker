export function estimateTokensByChars(s: string): number {
  return Math.ceil(((s as any)?.length || 0) / 4);
}

export function basicLengthStats(lengths: number[]): { avg: number; p50: number; p90: number } {
  if (lengths.length === 0) return { avg: 0, p50: 0, p90: 0 };
  const sorted = [...lengths].sort((a, b) => a - b);
  const avg = Math.round(sorted.reduce((a, b) => a + b, 0) / sorted.length);
  const p = (q: number) => sorted[Math.min(sorted.length - 1, Math.floor(q * (sorted.length - 1)))];
  return { avg, p50: p(0.5), p90: p(0.9) };
}


