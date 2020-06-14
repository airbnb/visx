import React, { useContext } from 'react';
import TooltipWithBounds from '@vx/tooltip/lib/tooltips/TooltipWithBounds';
import TooltipContext from '../context/TooltipContext';
import ChartContext from '../context/ChartContext';
import Portal from './Portal';
import { TooltipData } from '../types';
import { render } from 'enzyme';
import { defaultStyles } from '@vx/tooltip';

type TooltipProps = {
  renderTooltip: (d: TooltipData) => React.ReactNode;
  snapToDataX?: boolean;
  snapToDataY?: boolean;
  showVerticalCrosshair?: boolean;
  /** Whether the tooltip should be rendered in a React portal instead of the React element's parent DOM container */
  renderInPortal?: boolean;
};

// function getTooltipCoords({
//   tooltipData,
//   snapToDataX,
//   snapToDataY,
//   renderInPortal,
// }: { tooltipData: TooltipData } & Pick<
//   TooltipProps,
//   'snapToDataX' | 'snapToDataY' | 'renderInPortal'
// >) {
//   const { closestDatum, svgMouseX, svgMouseY, pageX, pageY, svgOriginX, svgOriginY } =
//     tooltipData || {};

//   let coords: { x: number | null; y: number | null } = { x: null, y: null };

// }

export default function Tooltip({
  renderTooltip,
  snapToDataX,
  snapToDataY,
  showVerticalCrosshair = true,
  renderInPortal = true,
}: TooltipProps) {
  const { tooltipData } = useContext(TooltipContext) || {};
  const { margin, xScale, yScale, dataRegistry, height, theme } = useContext(ChartContext) || {};

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
            borderLeft: `1px solid ${theme.xAxisStyles.stroke}`,
            pointerEvents: 'none',
          }}
        />
      )}
      <TooltipWithBounds
        left={xCoord}
        top={yCoord}
        style={{ ...defaultStyles, background: theme.baseColor, color: theme.xAxisStyles.stroke }}
      >
        {renderTooltip(tooltipData)}
      </TooltipWithBounds>
    </Container>
  );
}
