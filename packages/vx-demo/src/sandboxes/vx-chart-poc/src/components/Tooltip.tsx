import React, { useContext } from 'react';
import TooltipWithBounds from '@vx/tooltip/src/tooltips/TooltipWithBounds';
import EventContext from '../context/EventContext';
import ChartContext from '../context/ChartContext';
import { ScaleType } from '../types';

type TooltipProps = {
  snapToDataX?: boolean;
  snapToDataY?: boolean;
  showVerticalCrosshair?: boolean;
  showHorizontalCrosshair?: boolean;
};

function getOutputDimensionFromScale(scale: ScaleType<unknown>) {
  const outputRange = scale.range() as number[];
  return Math.abs(outputRange[0] - outputRange[1]);
}

export default function Tooltip({
  snapToDataX,
  snapToDataY,
  showVerticalCrosshair = true,
}: TooltipProps) {
  const { tooltipData } = useContext(EventContext) || {};
  const { margin, xScale, yScale, dataRegistry } = useContext(ChartContext) || {};

  // early return if there's no tooltip
  const { closestDatum, svgMouseX, svgMouseY } = tooltipData || {};
  if (!closestDatum || svgMouseX == null || svgMouseY == null) return null;

  const dataX =
    snapToDataX || showVerticalCrosshair
      ? (xScale(dataRegistry[closestDatum.key].xAccessor(closestDatum.datum)) as number)
      : null;

  return (
    <>
      {yScale && showVerticalCrosshair && (
        <div
          style={{
            position: 'absolute',
            width: 1,
            height: getOutputDimensionFromScale(yScale),
            top: margin?.top ?? 0,
            left: 0,
            transform: `translate(${dataX}px)`,
            borderLeft: '1px solid #222',
            pointerEvents: 'none',
          }}
        />
      )}
      <TooltipWithBounds
        left={
          snapToDataX && xScale
            ? (xScale(dataRegistry[closestDatum.key].xAccessor(closestDatum.datum)) as number)
            : svgMouseX
        }
        top={
          snapToDataY
            ? (yScale(dataRegistry[closestDatum.key].yAccessor(closestDatum.datum)) as number)
            : svgMouseY
        }
      >
        key {closestDatum.key}
        <pre>{JSON.stringify(closestDatum, null, 2)}</pre>
      </TooltipWithBounds>
    </>
  );
}
