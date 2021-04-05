import findNearestDatumSingleDimension from './findNearestDatumSingleDimension';
export default function findNearestDatumX(_ref) {
  var scale = _ref.xScale,
      accessor = _ref.xAccessor,
      yScale = _ref.yScale,
      yAccessor = _ref.yAccessor,
      point = _ref.point,
      data = _ref.data;
  if (!point) return null;
  var nearestDatum = findNearestDatumSingleDimension({
    scale: scale,
    accessor: accessor,
    scaledValue: point.x,
    data: data
  });
  return nearestDatum ? {
    datum: nearestDatum.datum,
    index: nearestDatum.index,
    distanceX: nearestDatum.distance,
    distanceY: Math.abs(Number(yScale(yAccessor(nearestDatum.datum))) - point.y)
  } : null;
}