import React from 'react';
import { animated, useSpring } from 'react-spring';

export default function AnimatedPath({
  d,
  stroke,
  ...lineProps
}: Omit<React.SVGProps<SVGPathElement>, 'ref'>) {
  const tweened = useSpring({ d, stroke, config: { precision: 0.01 } });
  return <animated.path d={tweened.d} stroke={tweened.stroke} fill="transparent" {...lineProps} />;
}
