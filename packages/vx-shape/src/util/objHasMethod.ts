export default function objHasMethod<T extends object & { [k: string]: any }>(
  obj: T,
  funcName: string,
) {
  return funcName in obj && typeof obj[funcName] === 'function';
}
