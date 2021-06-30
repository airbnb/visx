/** generates points along a sin wave, with increasing height toward the center.  */
export default function generateSinPoints({
  width,
  height,
  numberOfWaves = 10,
  pointsPerWave = 10,
}: {
  width: number;
  height: number;
  numberOfWaves?: number;
  pointsPerWave?: number;
}) {
  const waveLength = width / numberOfWaves;
  const distanceBetweenPoints = waveLength / pointsPerWave;
  const sinPoints: { x: number; y: number }[] = [];

  for (let waveIndex = 0; waveIndex < numberOfWaves; waveIndex += 1) {
    const waveDistFromStart = waveIndex * waveLength;

    for (let pointIndex = 0; pointIndex <= pointsPerWave; pointIndex += 1) {
      const waveXFraction = pointIndex / pointsPerWave;
      const waveX = pointIndex * distanceBetweenPoints;
      const globalX = waveDistFromStart + waveX;
      // scale height based x position
      const globalXFraction = (width - globalX) / width;
      const waveHeight = Math.min(globalXFraction, 1 - globalXFraction) * height;

      sinPoints.push({ x: globalX, y: waveHeight * Math.sin(waveXFraction * (2 * Math.PI)) });
    }
  }

  return sinPoints;
}
