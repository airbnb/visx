export type NumberAccessor<Datum> = (d: Datum) => number;

/**
 * This is a workaround for TypeScript not inferring the correct
 * method overload/signature for some d3 shape methods.
 */
export default function setNumberOrNumberAccessor<Datum>(
  func: (d: number | NumberAccessor<Datum>) => void,
  value: number | NumberAccessor<Datum>,
) {
  if (typeof value === 'number') func(value);
  else func(value);
}
