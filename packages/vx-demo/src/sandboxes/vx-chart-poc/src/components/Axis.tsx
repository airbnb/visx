import React, { useContext } from 'react';
import AxisLeft from '@vx/axis/src/axis/AxisLeft';
import AxisRight from '@vx/axis/src/axis/AxisRight';
import AxisBottom from '@vx/axis/src/axis/AxisBottom';

import ChartContext from '../context/ChartContext';

type AxisProps = {
  orientation: 'left' | 'bottom' | 'right';
  numTicks?: number;
  /** @TODO expose all axis props */
};

export default function Axis<ScaleInput = unknown>({ numTicks, orientation }: AxisProps) {
  const { xScale, yScale } = useContext(ChartContext);

  // early return if scale is not available in context
  if (!xScale || !yScale) return null;

  const AxisComponent =
    orientation === 'left' ? AxisLeft : orientation === 'right' ? AxisRight : AxisBottom;

  return (
    <AxisComponent<ScaleInput>
      top={orientation === 'bottom' ? Math.max(...yScale.range()) || 0 : 0}
      left={
        orientation === 'left'
          ? Math.min(...xScale.range()) ?? 0
          : orientation === 'right'
          ? Math.max(...xScale.range()) ?? 0
          : 0
      }
      scale={orientation === 'left' || orientation === 'right' ? yScale : xScale}
      numTicks={numTicks}
    />
  );
}
