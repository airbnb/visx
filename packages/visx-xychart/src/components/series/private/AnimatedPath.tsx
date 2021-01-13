import React, { useCallback, useRef } from 'react';
import { animated, useSpring } from 'react-spring';
// @ts-ignore no types
import { interpolatePath } from 'd3-interpolate-path';
import debounce from 'lodash/debounce';

export default function AnimatedPath({
  d,
  stroke,
  fill,
  ...lineProps
}: Omit<React.SVGProps<SVGPathElement>, 'ref'>) {
  const previousD = useRef(d);
  // updating d in quick succession will ruin the animation because startD === endD.
  // debounce it slightly
  const setPreviousD = useCallback(
    debounce((dValue?: string) => {
      previousD.current = dValue;
    }, 50),
    [], // create once
  );

  // react-spring cannot interpolate paths which have a differing number of points
  // flubber is the "best" at interpolating but assumes closed paths
  // d3-interpolate-path is better at interpolating extra/fewer points so we use that
  const interpolator = interpolatePath(previousD.current, d);
  setPreviousD(d);

  // @ts-ignore t is not in CSSProperties
  const { t } = useSpring({
    from: { t: 0 },
    to: { t: 1 },
    reset: true,
    delay: 50,
  });
  const tweened = useSpring({ stroke, fill });
  return (
    <animated.path
      className="visx-path"
      d={t.interpolate(interpolator)}
      stroke={tweened.stroke}
      fill={tweened.fill}
      {...lineProps}
    />
  );
}
