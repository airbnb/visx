import React from 'react';
import GridColumns, { GridColumnsProps } from '@vx/grid/lib/grids/GridColumns';
import { GridScale } from '@vx/grid/lib/types';
import AnimatedGridLines from './AnimatedGridLines';
import { AnimationTrajectory } from '../types';

export default function AnimatedGridColumns<Scale extends GridScale>({
  scale,
  height,
  numTicks,
  tickValues,
  offset,
  className,
  animationTrajectory,
  top,
  left,
  ...lineProps
}: Omit<GridColumnsProps<Scale>, 'children'> & { animationTrajectory?: AnimationTrajectory }) {
  return (
    <GridColumns
      scale={scale}
      height={height}
      numTicks={numTicks}
      tickValues={tickValues}
      className={className}
      top={top}
      left={left}
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
