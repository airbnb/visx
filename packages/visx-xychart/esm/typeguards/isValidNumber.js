export default function isValidNumber(_) {
  return _ != null && typeof _ === 'number' && !Number.isNaN(_) && Number.isFinite(_);
}