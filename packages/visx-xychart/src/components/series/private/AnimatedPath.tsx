import React, { useRef } from 'react';
import { animated, useSpring } from 'react-spring';
// @ts-ignore no types
import { interpolatePath } from 'd3-interpolate-path';

export default function AnimatedPath({
  d,
  stroke,
  fill,
  ...lineProps
}: Omit<React.SVGProps<SVGPathElement>, 'ref'>) {
  const previousD = useRef(d);
  // react-spring cannot interpolate paths which have a differing number of points
  // flubber is the "best" at interpolating but assumes closed paths
  // d3-interpolate-path is better at interpolating extra/fewer points so we use that
  const interpolator = interpolatePath(previousD.current, d);
  previousD.current = d;
  // @ts-ignore t is not in CSSProperties
  const { t } = useSpring({
    from: { t: 0 },
    to: { t: 1 },
    reset: true,
  });
  const tweened = useSpring({ stroke, fill });
  return (
    <animated.path
      d={t.interpolate(interpolator)}
      stroke={tweened.stroke}
      fill={tweened.fill}
      {...lineProps}
    />
  );
}
