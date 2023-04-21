import generateSinPoints from './generateSinPoints';
export default function generateSinSegments(_a) {
    var width = _a.width, height = _a.height, _b = _a.numberOfWaves, numberOfWaves = _b === void 0 ? 10 : _b, _c = _a.pointsPerWave, pointsPerWave = _c === void 0 ? 10 : _c, _d = _a.direction, direction = _d === void 0 ? 'left-to-right' : _d;
    var isHorizontal = direction === 'left-to-right' || direction === 'right-to-left';
    // Generate points
    var data = generateSinPoints({
        width: isHorizontal ? width : height,
        height: isHorizontal ? height : width,
        numberOfWaves: numberOfWaves,
        pointsPerWave: pointsPerWave,
    });
    // Create empty segments
    var segments = [];
    for (var i = 0; i < numberOfWaves; i += 1) {
        segments.push([]);
    }
    // Split into equal width or height segments
    var segmentSize = (isHorizontal ? width : height) / numberOfWaves;
    data.forEach(function (d) {
        segments[Math.min(Math.floor(d.x / segmentSize), segments.length - 1)].push(d);
    });
    switch (direction) {
        case 'right-to-left':
            return segments.map(function (segment) { return segment.map(function (_a) {
                var x = _a.x, y = _a.y;
                return ({ x: -x, y: y });
            }); });
        case 'top-to-bottom':
            return segments.map(function (segment) { return segment.map(function (_a) {
                var x = _a.x, y = _a.y;
                return ({ x: y, y: x });
            }); });
        case 'bottom-to-top':
            return segments.map(function (segment) { return segment.map(function (_a) {
                var x = _a.x, y = _a.y;
                return ({ x: y, y: -x });
            }); });
        case 'left-to-right':
        default:
            return segments;
    }
}
