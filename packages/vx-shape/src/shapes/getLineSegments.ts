// import memoize from 'lodash/memoize';

const MEASUREMENT_ELEMENT_ID = '__vx_splitpath_svg_path_measurement_id';

function getLineSegments<Datum>(
  path: string,
  segments: Datum[][],
  sampleRate: number = 0.25,
): { x: number; y: number }[][] {
  try {
    let pathElement = document.getElementById(MEASUREMENT_ELEMENT_ID) as SVGPathElement | null;

    // create a single path element if not done already
    if (!pathElement) {
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.style.width = '0';
      svg.style.height = '0';
      svg.style.position = 'absolute';
      svg.style.top = '-100%';
      svg.style.left = '-100%';
      pathElement = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      pathElement.setAttribute('id', MEASUREMENT_ELEMENT_ID);
      svg.appendChild(pathElement);
      document.body.appendChild(svg);
    }

    pathElement.setAttribute('d', path);

    const totalPathLength = pathElement.getTotalLength();
    const totalPieces = segments.reduce((sum, curr) => sum + curr.length, 0);
    const pieceSize = totalPathLength / totalPieces;

    let cumulativeSize = 0;

    const lineSegments = segments.map((segment, segmentIndex) => {
      const segmentPointCount = segment.length;
      const coords: { x: number; y: number }[] = [];

      for (let i = 0; i < segmentPointCount + sampleRate; i += sampleRate) {
        const distance = cumulativeSize * pieceSize + i * pieceSize;
        const point = pathElement!.getPointAtLength(distance);
        coords.push(point);
      }

      //   segment.forEach((datum, datumIndex) => {
      //     // create samplesPerPoint along the path for each actual point.
      //     new Array(samplesPerPoint).fill(0).forEach((_, sampleIndex) => {
      //       const distance =
      //         datumIndex * datumIndex +
      //         (pieceSize * sampleIndex) / samplesPerPoint +
      //         cumulativeSize * pieceSize;

      //       const point = pathElement!.getPointAtLength(distance);
      //       coords.push(point);
      //     });
      //   });

      cumulativeSize += segmentPointCount;

      return coords;
    });

    return lineSegments;
  } catch (e) {
    return [];
  }
}

// cache on d attributes
// export default memoize(getLineSegments, (paths) => paths.join('-'));

export default getLineSegments;
