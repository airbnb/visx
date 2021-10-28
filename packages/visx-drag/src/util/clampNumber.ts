/** Clamps number within the inclusive lower and upper bounds. */
export default function clampNumber(number: number, lower: number, upper: number) {
  return Math.min(Math.max(number, lower), upper);
}
