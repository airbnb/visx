export function getX(l) {
  return typeof (l == null ? void 0 : l.x) === 'number' ? l == null ? void 0 : l.x : 0;
}
export function getY(l) {
  return typeof (l == null ? void 0 : l.y) === 'number' ? l == null ? void 0 : l.y : 0;
}
export function getSource(l) {
  return l == null ? void 0 : l.source;
}
export function getTarget(l) {
  return l == null ? void 0 : l.target;
}
export function getFirstItem(d) {
  return d == null ? void 0 : d[0];
}
export function getSecondItem(d) {
  return d == null ? void 0 : d[1];
}