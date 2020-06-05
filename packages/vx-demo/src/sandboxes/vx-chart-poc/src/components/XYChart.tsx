import React, { useContext, useEffect, useCallback, useRef } from 'react';
import { localPoint } from '@vx/event';
import ParentSize from '@vx/responsive/lib/components/ParentSize';
import ChartContext from '../context/ChartContext';
import { Margin } from '../types';
import EventContext from '../context/EventContext';

const defaultMargin = { top: 30, right: 30, bottom: 30, left: 30 };

type Props = {
  events?: boolean;
  width?: number;
  height?: number;
  margin?: Margin;
  children: React.ReactNode;
  captureEvents?: boolean;
};

export default function XYChart(props: Props) {
  const { children, width, height, margin = defaultMargin, captureEvents = true } = props;
  const { findNearestData, setChartDimensions } = useContext(ChartContext);
  const { showTooltip, hideTooltip } = useContext(EventContext) || {};

  // update dimensions in context
  useEffect(() => {
    if (width != null && height != null && width > 0 && height > 0) {
      setChartDimensions({ width, height, margin });
    }
  }, [setChartDimensions, width, height, margin]);

  const svgRef = useRef<SVGSVGElement>(null);

  const onMouseMove = useCallback(
    (event: React.MouseEvent<SVGRectElement, MouseEvent>) => {
      const nearestData = findNearestData(event);
      if (nearestData.closestDatum && showTooltip) {
        showTooltip({ tooltipData: nearestData });
      }
    },
    [findNearestData, showTooltip],
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
          fill="rgba(100,0,100,0.01)"
          width={width - margin.left - margin.right}
          height={height - margin.top - margin.bottom}
          onMouseMove={onMouseMove}
          onMouseLeave={hideTooltip}
        />
      )}
    </svg>
  ) : null;
}
