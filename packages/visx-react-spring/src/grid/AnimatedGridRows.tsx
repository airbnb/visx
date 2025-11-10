import type { GridRowsProps, GridScale } from '@visx/grid';
import { GridRows } from '@visx/grid';
import AnimatedGridLines from './AnimatedGridLines';
import type { AnimationTrajectory } from '../types';

export default function AnimatedGridRows<Scale extends GridScale>({
  scale,
  width,
  numTicks,
  tickValues,
  offset,
  className,
  animationTrajectory,
  top,
  left,
  ...lineProps
}: Omit<GridRowsProps<Scale>, 'children'> & { animationTrajectory?: AnimationTrajectory }) {
  return (
    <GridRows
      scale={scale}
      width={width}
      numTicks={numTicks}
      tickValues={tickValues}
      className={className}
      top={top}
      left={left}
      offset={offset}
    >
      {({ lines }) => (
        <AnimatedGridLines
          scale={scale}
          lines={lines}
          animationTrajectory={animationTrajectory}
          animateXOrY="y"
          lineKey={(line) => `row-${line?.from?.y ?? ''}-${line.index}`}
          {...lineProps}
        />
      )}
    </GridRows>
  );
}
