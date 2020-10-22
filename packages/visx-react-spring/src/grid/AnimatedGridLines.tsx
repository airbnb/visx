import React, { SVGProps } from 'react';
import { animated, useTransition } from 'react-spring';
import { GridScale, GridLines, CommonGridProps } from '@visx/grid/lib/types';
import useLineTransitionConfig, {
  TransitionConfig,
} from '../spring-configs/useLineTransitionConfig';

export type AnimatedGridLinesProps<Scale extends GridScale> = {
  lines: GridLines;
  lineKey: (line: GridLines[number]) => string;
  scale: Scale;
} & Omit<SVGProps<SVGLineElement>, 'ref' | 'scale'> &
  Pick<TransitionConfig<Scale>, 'animationTrajectory' | 'animateXOrY'> &
  Pick<CommonGridProps, 'stroke' | 'strokeWidth' | 'lineStyle' | 'strokeDasharray'>;

export default function AnimatedGridLines<Scale extends GridScale>({
  scale,
  lines,
  animationTrajectory,
  animateXOrY,
  lineKey,
  lineStyle,
  ...lineProps
}: AnimatedGridLinesProps<Scale>) {
  const animatedLines = useTransition(
    lines,
    lineKey,
    useLineTransitionConfig({
      scale,
      animateXOrY,
      animationTrajectory,
    }),
  );

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {animatedLines.map((
        // @ts-ignore react-spring types only include CSSProperties
        { key, props: { fromX, toX, fromY, toY, opacity } },
      ) => (
        <animated.line
          key={key}
          x1={fromX}
          x2={toX}
          y1={fromY}
          y2={toY}
          strokeOpacity={opacity}
          style={lineStyle}
          {...lineProps}
        />
      ))}
    </>
  );
}
