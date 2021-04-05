import findNearestDatumSingleDimension from './findNearestDatumSingleDimension';
export default function findNearestDatumY(_ref) {
  var scale = _ref.yScale,
      accessor = _ref.yAccessor,
      xScale = _ref.xScale,
      xAccessor = _ref.xAccessor,
      point = _ref.point,
      data = _ref.data;
  if (!point) return null;
  var nearestDatum = findNearestDatumSingleDimension({
    scale: scale,
    accessor: accessor,
    scaledValue: point.y,
    data: data
  });
  return nearestDatum ? {
    datum: nearestDatum.datum,
    index: nearestDatum.index,
    distanceY: nearestDatum.distance,
    distanceX: Math.abs(Number(xScale(xAccessor(nearestDatum.datum))) - point.x)
  } : null;
}