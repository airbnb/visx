/**
 * This is a workaround for TypeScript not inferring the correct
 * method overload/signature for some d3 shape methods.
 */
export default function setNumberOrNumberAccessor<NumAccessor>(
  func: (d: number | NumAccessor) => void,
  value: number | NumAccessor,
) {
  if (typeof value === 'number') func(value);
  else func(value);
}
