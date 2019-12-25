import React from 'react';
import { CurveFactory } from 'd3-shape';
import LinePath from './LinePath';
import getLineSegments from './getLineSegments';

interface Point {
  x: number;
  y: number;
}

type Segment<Datum> = Datum[];
// type ComputedSegment = Segment<Point>;

type SplitLinePathProps<Datum> = {
  /** Array of data for which to generate a line shape. */
  data: Segment<Datum>[];
  /** Styles to apply to each segment. */
  styles: React.SVGProps<SVGPathElement>[];
  /** Sets the curve factory (from @vx/curve or d3-curve) for the area generator. Defaults to curveLinear. */
  curve?: CurveFactory;

  /** Use this to force re-compute the segments, for example when dimensions change. */
  //   cacheKey: string | number;

  //   /** React RefObject passed to the path element. */
  //   innerRef?: React.Ref<SVGPathElement>;
  /** The defined accessor for the shape. The final line shape includes all points for which this function returns true. By default all points are defined. */
  defined?: (datum: Datum, index: number, data: Datum[]) => boolean;
  /** Given a datum, returns the x value. Defaults to d[0]. */
  x?: (datum: Datum, index: number, data: Datum[]) => number;
  /** Given a datum, returns the y value. Defaults to d[1]. */
  y?: (datum: Datum, index: number, data: Datum[]) => number;
  //   /** Override render function which is passed the configured path generator as input. */
  children?: (segment: Point[]) => React.ReactNode;
  //   /** Fill color of the path element. */
  //   fill?: string;
  //   /** className applied to path element. */
  //   className?: string;
};

export default function SplitLinePath<Datum>({
  children,
  curve,
  data: segments,
  defined,
  x,
  y,
  styles,
}: SplitLinePathProps<Datum>) {
  // combine data to first draw entire path
  const flatData = segments.reduce((flat, segmentData) => flat.concat([...segmentData]), []);

  return (
    <LinePath data={flatData} defined={defined} curve={curve} x={x} y={y}>
      {({ path }) => {
        const wholePath = path(flatData);
        const computedLineSegments = getLineSegments(wholePath || '', segments);

        return computedLineSegments.map((segment, i) => (
          <React.Fragment key={i}>
            {children ? (
              children({ index: i, segment, styles: styles[i] || styles[i % styles.length] })
            ) : (
              <LinePath
                key={i}
                data={segment}
                x={(d: Point) => d.x || 0}
                y={(d: Point) => d.y || 0}
                {...(styles[i] || styles[i % styles.length])}
              />
            )}
          </React.Fragment>
        ));
      }}
    </LinePath>
  );
}
