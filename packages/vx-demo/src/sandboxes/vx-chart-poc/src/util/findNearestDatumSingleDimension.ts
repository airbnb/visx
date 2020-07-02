import { bisector, range as d3Range, bisectLeft } from 'd3-array';
import { ScaleType } from '../types';

export default function findNearestDatumSingleDimension<Datum, ScaleInput>({
  scale,
  accessor,
  mouseCoord,
  data,
}: {
  scale: ScaleType<ScaleInput, number>;
  accessor: (d: Datum) => ScaleInput;
  mouseCoord: number;
  data: Datum[];
}) {
  const isOrdinalScale = !('invert' in scale) || typeof scale.invert !== 'function';

  let nearestDatum: Datum;
  let nearestDatumIndex: number;
  if (isOrdinalScale) {
    // Ordinal scales don't have an invert function but they do have discrete domains
    // so we manually invert
    const domain = scale.domain();
    const range = scale.range();
    const sortedRange = [...range].sort(); // bisectLeft assumes sort
    const rangePoints = d3Range(sortedRange[0], sortedRange[1], scale.step());
    const domainIndex = bisectLeft(rangePoints, mouseCoord);
    // y-axis scales may have reverse ranges, correct for this
    const sortedDomain = range[0] < range[1] ? domain : domain.reverse();
    const domainValue = sortedDomain[domainIndex - 1];
    const index = data.findIndex(d => String(accessor(d)) === String(domainValue));
    nearestDatum = data[index];
    nearestDatumIndex = index;
  } else {
    const bisect = bisector(accessor).left;
    const dataValue = scale.invert(mouseCoord);
    const index = bisect(data, dataValue);
    const d0 = data[index - 1];
    const d1 = data[index];
    nearestDatum =
      !d0 || Math.abs(dataValue - accessor(d0)) > Math.abs(dataValue - accessor(d1)) ? d1 : d0;
    nearestDatumIndex = nearestDatum === d0 ? index - 1 : index;
  }

  if (!nearestDatum) return null;

  const distance = Math.abs(scale(accessor(nearestDatum)) - mouseCoord);

  return { datum: nearestDatum, index: nearestDatumIndex, distance };
}
