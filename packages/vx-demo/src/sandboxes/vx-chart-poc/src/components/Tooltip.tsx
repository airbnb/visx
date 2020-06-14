import React, { useContext } from 'react';
import TooltipWithBounds from '@vx/tooltip/lib/tooltips/TooltipWithBounds';
import { defaultStyles } from '@vx/tooltip';
import { scaleOrdinal } from '@vx/scale';

import TooltipContext from '../context/TooltipContext';
import ChartContext from '../context/ChartContext';
import Portal from './Portal';
import { TooltipData } from '../types';

export type RenderTooltipArgs<Datum, DataKeys extends string> = TooltipData<Datum, DataKeys> & {
  colorScale: typeof scaleOrdinal;
};

export type TooltipProps<Datum, DataKeys extends string> = {
  renderTooltip: (d: RenderTooltipArgs<Datum, DataKeys>) => React.ReactNode;
  snapToDataX?: boolean;
  snapToDataY?: boolean;
  showVerticalCrosshair?: boolean;
  /** Whether the tooltip should be rendered in a React portal instead of the React element's parent DOM container */
  renderInPortal?: boolean;
};

export default function Tooltip<Datum, DataKeys extends string>({
  renderTooltip,
  snapToDataX,
  snapToDataY,
  showVerticalCrosshair = true,
  renderInPortal = true,
}: TooltipProps<Datum, DataKeys>) {
  const { tooltipData } = useContext(TooltipContext) || {};
  const { margin, xScale, yScale, colorScale, dataRegistry, height, theme } =
    useContext(ChartContext) || {};

  // early return if there's no tooltip
  const { closestDatum, svgMouseX, svgMouseY, pageX, pageY, svgOriginX, svgOriginY } =
    tooltipData || {};

  if (!closestDatum || svgMouseX == null || svgMouseY == null) return null;

  const { xAccessor, yAccessor } = dataRegistry[closestDatum.key];

  const xCoord = snapToDataX
    ? (xScale(xAccessor(closestDatum.datum)) as number) +
      (xScale.bandwidth?.() ?? 0) / 2 +
      (renderInPortal ? svgOriginX : 0)
    : renderInPortal
    ? pageX
    : svgMouseX;

  const yCoord = snapToDataY
    ? (yScale(yAccessor(closestDatum.datum)) as number) -
      (yScale.bandwidth?.() ?? 0) / 2 +
      (renderInPortal ? svgOriginY : 0)
    : renderInPortal
    ? pageY
    : svgMouseY;

  const Container = renderInPortal ? Portal : React.Fragment;

  return (
    <Container>
      {/** @TODO not doing this in SVG is jank. Better solution? */}
      {yScale && showVerticalCrosshair && (
        <div
          style={{
            position: 'absolute',
            width: 1,
            height: height - margin.top - margin.bottom,
            top: 0,
            left: 0,
            transform: `translate(${xCoord}px,${
              renderInPortal ? svgOriginY + margin.top : margin.top
            }px)`,
            borderLeft: `1px solid ${theme?.xAxisStyles?.stroke ?? '#222'}`,
            pointerEvents: 'none',
          }}
        />
      )}
      <TooltipWithBounds
        left={xCoord}
        top={yCoord}
        style={{
          ...defaultStyles,
          background: theme?.baseColor ?? 'white',
          color: theme?.xAxisStyles?.stroke ?? '#222',
        }}
      >
        {renderTooltip({ ...tooltipData, colorScale })}
      </TooltipWithBounds>
    </Container>
  );
}
