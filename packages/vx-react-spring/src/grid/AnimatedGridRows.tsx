import React from 'react';
import { animated, useTransition } from 'react-spring';
import GridRows, { GridRowsProps } from '@vx/grid/lib/grids/GridRows';
import { GridScale, GridLines } from '@vx/grid/lib/types';
import useLineTransitionConfig, {
  TransitionConfig,
} from '../spring-configs/useLineTransitionConfig';

export default function AnimatedGridRows<Scale extends GridScale>({
  scale,
  width,
  numTicks,
  tickValues,
  offset,
  className,
  animationTrajectory,
  ...lineProps
}: Omit<GridRowsProps<Scale>, 'children'> & Pick<TransitionConfig<Scale>, 'animationTrajectory'>) {
  return (
    <GridRows
      scale={scale}
      width={width}
      numTicks={numTicks}
      tickValues={tickValues}
      className={className}
    >
      {({ lines }) => (
        <AnimatedGridRowLines
          scale={scale}
          lines={lines}
          animationTrajectory={animationTrajectory}
          {...lineProps}
        />
      )}
    </GridRows>
  );
}

function AnimatedGridRowLines<Scale extends GridScale>({
  scale,
  lines,
  animationTrajectory,
  ...lineProps
}: Omit<GridRowsProps<Scale>, 'children' | 'width' | 'numTicks' | 'offset' | 'className'> & {
  lines: GridLines;
} & Pick<TransitionConfig<Scale>, 'animationTrajectory'>) {
  const animatedLines = useTransition(lines, line => `${line?.from?.y}`, {
    unique: true,
    ...useLineTransitionConfig({
      scale,
      animateXOrY: 'y',
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
