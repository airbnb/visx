import { getSeededRandom } from '@visx/mock-data';
var generateCircles = function (_a) {
    var width = _a.width, height = _a.height;
    var radiusRandom = getSeededRandom(0.2);
    var xRandom = getSeededRandom(0.3);
    var yRandom = getSeededRandom(0.4);
    return new Array(width < 360 ? 40 : 185).fill(1).map(function (d, i) {
        var radius = 25 - radiusRandom() * 20;
        return {
            id: "" + i,
            radius: radius,
            x: Math.round(xRandom() * (width - radius * 2) + radius),
            y: Math.round(yRandom() * (height - radius * 2) + radius),
        };
    });
};
export default generateCircles;
