import { useMemo } from 'react';

function getSamples(restrictToPath: SVGGeometryElement, transform?: DOMMatrix, precision = 1) {
  if (!restrictToPath) return [];
  const samples = [];
  const pathLength = restrictToPath.getTotalLength();
  for (let sampleLength = 0; sampleLength <= pathLength; sampleLength += precision) {
    const sample = restrictToPath.getPointAtLength(sampleLength);
    const transformedSample = sample.matrixTransform(transform);
    samples.push(transformedSample);
  }
  return samples;
}

/** Return samples along a path, relative to the parent SVG  */
export default function useSamplesAlongPath(restrictToPath?: SVGGeometryElement | null) {
  const samples = useMemo(() => {
    if (!restrictToPath) return [];
    const transform = restrictToPath.getCTM() || new DOMMatrix();
    return getSamples(restrictToPath, transform);
    // The path can transform without triggering a re-render,
    // so we need to update the samples whenever the length changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restrictToPath?.getTotalLength()]);
  return samples;
}
