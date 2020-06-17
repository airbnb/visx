import React, { useContext, useEffect, useCallback } from 'react';
import ParentSize from '@vx/responsive/lib/components/ParentSize';
import useMeasure from 'react-use-measure';

import ChartContext from '../context/ChartContext';
import { Margin } from '../types';
import TooltipContext from '../context/TooltipContext';

type Props = {
  events?: boolean;
  width?: number;
  height?: number;
  margin?: Margin;
  children: React.ReactNode;
  captureEvents?: boolean;
};

export default function XYChart(props: Props) {
  const { children, width, height, margin, captureEvents = true } = props;
  const { findNearestData, setChartDimensions } = useContext(ChartContext);
  const { showTooltip, hideTooltip } = useContext(TooltipContext) || {};
  const [svgRef, svgBounds] = useMeasure();

  // update dimensions in context
  useEffect(() => {
    if (width != null && height != null && width > 0 && height > 0) {
      setChartDimensions({ width, height, margin });
    }
  }, [setChartDimensions, width, height, margin]);

  const onMouseMove = useCallback(
    (event: React.MouseEvent<SVGRectElement, MouseEvent>) => {
      const nearestData = findNearestData(event);
      if (nearestData.closestDatum && showTooltip) {
        showTooltip({
          tooltipData: {
            ...nearestData,
            pageX: event.pageX,
            pageY: event.pageY,
            svgOriginX: svgBounds?.x,
            svgOriginY: svgBounds?.y,
          },
        });
      }
    },
    [findNearestData, showTooltip, svgBounds],
  );

  // if width and height aren't both provided, wrap in auto-sizer
  if (width == null || height == null) {
    return <ParentSize>{dims => <XYChart {...dims} {...props} />}</ParentSize>;
  }

  return width > 0 && height > 0 ? (
    <svg ref={svgRef} width={width} height={height}>
      {children}
      {captureEvents && (
        <rect
          x={margin.left}
          y={margin.top}
          fill="transparent"
          width={width - margin.left - margin.right}
          height={height - margin.top - margin.bottom}
          onMouseMove={onMouseMove}
          onMouseLeave={hideTooltip}
        />
      )}
    </svg>
  ) : null;
}
