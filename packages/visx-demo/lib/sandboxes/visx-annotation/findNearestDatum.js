import { bisector } from 'd3-array';
export default function findNearestDatum(_a) {
    var value = _a.value, scale = _a.scale, accessor = _a.accessor, data = _a.data;
    var bisect = bisector(accessor).left;
    var nearestValue = scale.invert(value);
    var nearestValueIndex = bisect(data, nearestValue, 1);
    var d0 = data[nearestValueIndex - 1];
    var d1 = data[nearestValueIndex];
    var nearestDatum = d0;
    if (d1 && accessor(d1)) {
        nearestDatum = nearestValue - accessor(d0) > accessor(d1) - nearestValue ? d1 : d0;
    }
    return nearestDatum;
}
