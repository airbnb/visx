import { getSeededRandom } from '@visx/mock-data';
var random = getSeededRandom(0.65);
var getPoints = function (array, pointCount) {
    var x = 1 / (0.1 + random());
    var y = 2 * random() - 0.5;
    var z = 10 / (0.1 + random());
    for (var i = 0; i < pointCount; i += 1) {
        var w = (i / pointCount - y) * z;
        array[i] += x * Math.exp(-w * w);
    }
};
var generateData = function (pointCount, bumpCount) {
    var arr = [];
    var i;
    for (i = 0; i < pointCount; i += 1)
        arr[i] = 0;
    for (i = 0; i < bumpCount; i += 1)
        getPoints(arr, pointCount);
    return arr;
};
export default generateData;
