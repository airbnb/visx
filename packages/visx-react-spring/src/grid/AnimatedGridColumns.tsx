import type { GridColumnsProps, GridScale } from '@visx/grid';
import { GridColumns } from '@visx/grid';
import AnimatedGridLines from './AnimatedGridLines';
import type { AnimationTrajectory } from '../types';

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
      offset={offset}
      top={top}
      left={left}
    >
      {({ lines }) => (
        <AnimatedGridLines
          scale={scale}
          lines={lines}
          animationTrajectory={animationTrajectory}
          animateXOrY="x"
          lineKey={(line) => `column-${line?.from?.x ?? ''}-${line.index}`}
          {...lineProps}
        />
      )}
    </GridColumns>
  );
}
