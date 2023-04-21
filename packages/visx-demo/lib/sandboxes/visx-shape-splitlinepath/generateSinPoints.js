/** generates points along a sin wave, with increasing height toward the center.  */
export default function generateSinPoints(_a) {
    var width = _a.width, height = _a.height, _b = _a.numberOfWaves, numberOfWaves = _b === void 0 ? 10 : _b, _c = _a.pointsPerWave, pointsPerWave = _c === void 0 ? 10 : _c;
    var waveLength = width / numberOfWaves;
    var distanceBetweenPoints = waveLength / pointsPerWave;
    var sinPoints = [];
    for (var waveIndex = 0; waveIndex < numberOfWaves; waveIndex += 1) {
        var waveDistFromStart = waveIndex * waveLength;
        for (var pointIndex = 0; pointIndex <= pointsPerWave; pointIndex += 1) {
            var waveXFraction = pointIndex / pointsPerWave;
            var waveX = pointIndex * distanceBetweenPoints;
            var globalX = waveDistFromStart + waveX;
            // scale height based x position
            var globalXFraction = (width - globalX) / width;
            var waveHeight = Math.min(globalXFraction, 1 - globalXFraction) * height;
            sinPoints.push({ x: globalX, y: waveHeight * Math.sin(waveXFraction * (2 * Math.PI)) });
        }
    }
    return sinPoints;
}
