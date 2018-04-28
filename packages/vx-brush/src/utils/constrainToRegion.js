export default function constrainToRegion({ region, x, y }) {
  const { x0, x1, y0, y1 } = region;
  return {
    x: x < x0 ? x0 : x > x1 ? x1 : x,
    y: y < y0 ? y0 : y > y1 ? y1 : y
  };
}
