import React, { SVGProps } from 'react';
import { animated, useTransition } from 'react-spring';
import { GridScale, GridLines } from '@vx/grid/lib/types';
import useLineTransitionConfig, {
  TransitionConfig,
} from '../spring-configs/useLineTransitionConfig';

export type AnimatedGridLinesProps<Scale extends GridScale> = {
  lines: GridLines;
  lineKey: (line: GridLines[number]) => string;
  scale: Scale;
} & Omit<SVGProps<SVGLineElement>, 'ref'> &
  Pick<TransitionConfig<Scale>, 'animationTrajectory' | 'animateXOrY'>;

export default function AnimatedGridLines<Scale extends GridScale>({
  scale,
  lines,
  animationTrajectory,
  animateXOrY,
  lineKey,
  ...lineProps
}: AnimatedGridLinesProps<Scale>) {
  const animatedLines = useTransition(lines, lineKey, {
    unique: true,
    ...useLineTransitionConfig({
      scale,
      animateXOrY,
      animationTrajectory,
    }),
  });

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
          {...lineProps}
        />
      ))}
    </>
  );
}
