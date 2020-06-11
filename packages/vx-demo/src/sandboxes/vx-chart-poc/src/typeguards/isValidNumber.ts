export default function isValidNumber(_: unknown): _ is number {
  return _ != null && typeof _ === 'number' && !isNaN(_) && isFinite(_);
}
