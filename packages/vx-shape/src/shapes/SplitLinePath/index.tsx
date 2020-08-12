import React, { useMemo } from 'react';
import { CurveFactory } from 'd3-shape';
import LinePath from '../LinePath';
import getLineSegments from './getLineSegments';

interface Point {
  x: number;
  y: number;
}

type SplitLinePathProps<Datum> = {
  /** Array of data segments, where each segment will be a separate path in the rendered line. */
  segments: Datum[][];
  /** Styles to apply to each segment. If fewer styles are specified than the number of segments, they will be re-used. */
  styles: React.SVGProps<SVGPathElement>[];
  /** Sets the curve factory (from @vx/curve or d3-curve) for the area generator. Defaults to curveLinear. */
  curve?: CurveFactory;
  /** The defined accessor for the shape. The final line shape includes all points for which this function returns true. By default all points are defined. */
  defined?: (datum: Datum, index: number, data: Datum[]) => boolean;
  /** Given a datum, returns the x value. Defaults to d[0]. */
  x?: (datum: Datum, index: number, data: Datum[]) => number;
  /** Given a datum, returns the y value. Defaults to d[1]. */
  y?: (datum: Datum, index: number, data: Datum[]) => number;
  /** Override render function which is passed the configured path generator as input. */
  children?: (renderProps: {
    index: number;
    segment: { x: number; y: number }[];
    styles?: React.SVGProps<SVGPathElement>;
  }) => React.ReactNode;
  /** className applied to path element. */
  className?: string;
  /** Optionally specify the sample rate for interpolating line segments. */
  sampleRate?: number;
};

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
        const computedLineSegments = getLineSegments({
          path: entirePath || '',
          segments,
          sampleRate,
        });

        return computedLineSegments.map((segment, index) => (
          <React.Fragment key={index}>
            {children ? (
              children({ index, segment, styles: styles[index] || styles[index % styles.length] })
            ) : (
              <LinePath<Point>
                key={index}
                className={className}
                data={segment}
                x={d => d.x || 0}
                y={d => d.y || 0}
                {...(styles[index] || styles[index % styles.length])}
              />
            )}
          </React.Fragment>
        ));
      }}
    </LinePath>
  );
}
