export default function toNumberOrUndefined(
  val?: number | { valueOf(): number },
): number | undefined {
  if (typeof val === 'undefined') return val;
  return Number(val);
}
