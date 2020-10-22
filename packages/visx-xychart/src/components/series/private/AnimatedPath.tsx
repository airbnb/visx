import React from 'react';
import { animated, useSpring } from 'react-spring';

export default function AnimatedPath({
  d,
  stroke,
  fill,
  ...lineProps
}: Omit<React.SVGProps<SVGPathElement>, 'ref'>) {
  const tweened = useSpring({ d, stroke, fill });
  return <animated.path d={tweened.d} stroke={tweened.stroke} fill={tweened.fill} {...lineProps} />;
}
