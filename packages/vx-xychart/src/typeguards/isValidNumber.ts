export default function isValidNumber(_: unknown): _ is number {
  return _ != null && typeof _ === 'number' && !Number.isNaN(_) && Number.isFinite(_);
}
