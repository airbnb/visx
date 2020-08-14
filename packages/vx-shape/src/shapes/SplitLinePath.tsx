import React, { useMemo } from 'react';
import LinePath from './LinePath';
import getSplitLineSegments from '../util/getSplitLineSegments';
import { LinePathConfig } from '../types';

interface Point {
  x: number;
  y: number;
}

type SplitLinePathProps<Datum> = {
  /** Array of data segments, where each segment will be a separate path in the rendered line. */
  segments: Datum[][];
  /** Styles to apply to each segment. If fewer styles are specified than the number of segments, they will be re-used. */
  styles: Omit<React.SVGProps<SVGPathElement>, 'x' | 'y' | 'children'>[];
  /** Override render function which is passed the configured path generator as input. */
  children?: (renderProps: {
    index: number;
    segment: { x: number; y: number }[];
    styles?: Omit<React.SVGProps<SVGPathElement>, 'x' | 'y' | 'children'>;
  }) => React.ReactNode;
  /** className applied to path element. */
  className?: string;
  /** Optionally specify the sample rate for interpolating line segments. */
  sampleRate?: number;
} & LinePathConfig<Datum>;

export default function SplitLinePath<Datum>({
  children,
  className,
  curve,
  defined,
  sampleRate,
  segments,
  x,
  y,
  styles,
}: SplitLinePathProps<Datum>) {
  // combine data to first draw entire path
  const combinedSegments: Datum[] = useMemo(
    () => segments.reduce((flat, segmentData) => flat.concat([...segmentData]), []),
    [segments],
  );

  return (
    <LinePath data={combinedSegments} defined={defined} curve={curve} x={x} y={y}>
      {({ path }) => {
        // use entire path to interpolate individual segments
        const entirePath = path(combinedSegments);
        const computedLineSegments = getSplitLineSegments({
          path: entirePath || '',
          segments,
          sampleRate,
        });

        return computedLineSegments.map((segment, index) =>
          children ? (
            children({ index, segment, styles: styles[index] || styles[index % styles.length] })
          ) : (
            <LinePath
              key={index}
              className={className}
              data={segment}
              x={(d: Point) => d.x || 0}
              y={(d: Point) => d.y || 0}
              {...(styles[index] || styles[index % styles.length])}
            />
          ),
        );
      }}
    </LinePath>
  );
}
