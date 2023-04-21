import { useMemo } from 'react';
function getSamples(restrictToPath, transform, precision) {
  if (precision === void 0) {
    precision = 1;
  }
  if (!restrictToPath) return [];
  var samples = [];
  var pathLength = restrictToPath.getTotalLength();
  for (var sampleLength = 0; sampleLength <= pathLength; sampleLength += precision) {
    var sample = restrictToPath.getPointAtLength(sampleLength);
    var transformedSample = sample.matrixTransform(transform);
    samples.push(transformedSample);
  }
  return samples;
}

/** Return samples along a path, relative to the parent SVG  */
export default function useSamplesAlongPath(restrictToPath) {
  var samples = useMemo(function () {
    if (!restrictToPath) return [];
    var transform = restrictToPath.getCTM() || new DOMMatrix();
    return getSamples(restrictToPath, transform);
    // The path can transform without triggering a re-render,
    // so we need to update the samples whenever the length changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restrictToPath == null ? void 0 : restrictToPath.getTotalLength()]);
  return samples;
}