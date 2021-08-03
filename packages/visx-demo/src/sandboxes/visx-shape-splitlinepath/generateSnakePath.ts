interface Point {
  x: number;
  y: number;
}

const pointKey = ({ x, y }: Point) => [x, y].join('_');

function distance(a: Point, b: Point) {
  return Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2);
}

/** generate a continuous path that fill rectangular space, similar to the classic Nokia snake game. */
export default function generateSnakePath({
  width,
  height,
  step,
}: {
  width: number;
  height: number;
  step: number;
}) {
  const points: Point[] = [];

  const used = new Set();

  function next(point: Point) {
    const { x, y } = point;
    return [
      { x: x - step, y: y - step },
      { x: x - step, y },
      { x: x - step, y: y + step },
      { x, y: y - step },
      { x, y: y + step },
      { x: x + step, y: y - step },
      { x: x + step, y },
      { x: x + step, y: y + step },
    ]
      .filter(
        (p) => p.x >= 0 && p.x <= width && p.y >= 0 && p.y <= height && !used.has(pointKey(p)),
      )
      .map((p) => ({
        point: p,
        distance: distance(point, p),
      }))
      .sort((a, b) => a.distance - b.distance);
  }

  let currentPoint: Point | null = {
    x: width / 2,
    y: height / 2,
  };

  while (currentPoint) {
    points.push(currentPoint);
    used.add(pointKey(currentPoint));
    const choices = next(currentPoint);
    currentPoint = choices.length > 0 ? choices[0].point : null;
  }

  return points;
}
