export default function callOrValue(maybeFn, d, i) {
  if (typeof maybeFn === 'function') {
    return maybeFn(d,i);
  }
  return maybeFn;
}
