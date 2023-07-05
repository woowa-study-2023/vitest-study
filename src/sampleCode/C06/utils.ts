export function exclude<T>(arr: T[], v: T) {
  return arr.slice().filter((item) => item !== v);
}
