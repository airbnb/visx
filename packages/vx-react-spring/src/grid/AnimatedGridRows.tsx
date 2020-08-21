import React from 'react';
import GridRows, { GridRowsProps } from '@vx/grid/lib/grids/GridRows';
import { GridScale } from '@vx/grid/lib/types';
import { TransitionConfig } from '../spring-configs/useLineTransitionConfig';
import AnimatedGridLines from './AnimatedGridLines';

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
        <AnimatedGridLines
          scale={scale}
          lines={lines}
          animationTrajectory={animationTrajectory}
          animateXOrY="y"
          lineKey={line => String(line?.from?.y ?? '')}
          {...lineProps}
        />
      )}
    </GridRows>
  );
}
