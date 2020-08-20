import React from 'react';
import GridColumns, { GridColumnsProps } from '@vx/grid/lib/grids/GridColumns';
import { GridScale } from '@vx/grid/lib/types';
import { TransitionConfig } from '../spring-configs/useLineTransitionConfig';
import AnimatedGridLines from './AnimatedGridLines';

export default function AnimatedGridColumns<Scale extends GridScale>({
  scale,
  height,
  numTicks,
  tickValues,
  offset,
  className,
  animationTrajectory,
  ...lineProps
}: Omit<GridColumnsProps<Scale>, 'children'> &
  Pick<TransitionConfig<Scale>, 'animationTrajectory'>) {
  return (
    <GridColumns
      scale={scale}
      height={height}
      numTicks={numTicks}
      tickValues={tickValues}
      className={className}
    >
      {({ lines }) => (
        <AnimatedGridLines
          scale={scale}
          lines={lines}
          animationTrajectory={animationTrajectory}
          animateXOrY="x"
          lineKey={line => String(line?.from?.x ?? '')}
          {...lineProps}
        />
      )}
    </GridColumns>
  );
}
