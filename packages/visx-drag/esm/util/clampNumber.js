/** Clamps number within the inclusive lower and upper bounds. */
export default function clampNumber(number, lower, upper) {
  return Math.min(Math.max(number, lower), upper);
}