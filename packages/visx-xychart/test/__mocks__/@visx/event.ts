export function localPoint() {
  return {
    x: 5,
    y: 3,
    value: () => ({ x: 5, y: 3 }),
    toArray: () => [5, 3],
  };
}
