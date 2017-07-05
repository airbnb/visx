export default function genBoxPlot(number) {
  const data = [];
  let i;
  for (i = 0; i < number; i += 1) {
    const points = [];
    let j;
    for (j = 0; j < 5; j += 1) {
      points.push(Math.random() * 100);
    }
    points.sort((a, b) => a - b);
    data.push({
      x: `Statistics ${i}`,
      min: points[0],
      firstQuartile: points[1],
      median: points[2],
      thirdQuartile: points[3],
      max: points[4]
    });
  }
  return data;
}
