import React, { useContext } from 'react';
import TooltipWithBounds from '@vx/tooltip/lib/tooltips/TooltipWithBounds';
import TooltipContext from '../context/TooltipContext';
import ChartContext from '../context/ChartContext';
import { ScaleType, TooltipData } from '../types';

type TooltipProps = {
  renderTooltip: (d: TooltipData) => React.ReactNode;
  snapToDataX?: boolean;
  snapToDataY?: boolean;
  showVerticalCrosshair?: boolean;
};

function getOutputDimensionFromScale(scale: ScaleType<unknown>) {
  const outputRange = scale.range() as number[];
  return Math.abs(outputRange[0] - outputRange[1]);
}

export default function Tooltip({
  renderTooltip,
  snapToDataX,
  snapToDataY,
  showVerticalCrosshair = true,
}: TooltipProps) {
  const { tooltipData } = useContext(TooltipContext) || {};
  const { margin, xScale, yScale, dataRegistry } = useContext(ChartContext) || {};

  // early return if there's no tooltip
  const { closestDatum, svgMouseX, svgMouseY } = tooltipData || {};
  if (!closestDatum || svgMouseX == null || svgMouseY == null) return null;

  const xCoord = snapToDataX
    ? (xScale(dataRegistry[closestDatum.key].xAccessor(closestDatum.datum)) as number) +
      (xScale.bandwidth?.() ?? 0) / 2
    : svgMouseX;

  const yCoord = snapToDataY
    ? (yScale(dataRegistry[closestDatum.key].yAccessor(closestDatum.datum)) as number) -
      (yScale.bandwidth?.() ?? 0) / 2
    : svgMouseY;

  return (
    <>
      {/** @TODO not doing this in SVG is jank. Better solution? */}
      {yScale && showVerticalCrosshair && (
        <div
          style={{
            position: 'absolute',
            width: 1,
            height: getOutputDimensionFromScale(yScale),
            top: margin?.top ?? 0,
            left: 0,
            transform: `translate(${xCoord}px)`,
            borderLeft: '1px solid #222',
            pointerEvents: 'none',
          }}
        />
      )}
      <TooltipWithBounds left={xCoord} top={yCoord}>
        {renderTooltip(tooltipData)}
      </TooltipWithBounds>
    </>
  );
}
