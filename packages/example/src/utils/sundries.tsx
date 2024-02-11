export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function rangeIndex(len: number, start = 0) {
  const result: number[] = [];
  for (let i = start; i < start + len; i += 1) {
    result.push(i);
  }
  return result;
}
