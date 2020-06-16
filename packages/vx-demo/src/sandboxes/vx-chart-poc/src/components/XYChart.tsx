import React, { useContext, useEffect, useCallback, useState } from 'react';
import ParentSize from '@vx/responsive/lib/components/ParentSize';
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
  const { showTooltip, hideTooltip, tooltipOpen } = useContext(TooltipContext) || {};
  const [ownBoundingRect, setOwnBoundingClientRect] = useState<null | DOMRect>(null);

  // update dimensions in context
  useEffect(() => {
    if (width != null && height != null && width > 0 && height > 0) {
      setChartDimensions({ width, height, margin });
    }
  }, [setChartDimensions, width, height, margin]);

  // when Tooltip is rendered in a Portal, we need non-stale svg coordinates
  // use state for the ref so that it triggers a useEffect update below
  const [svgRef, setSvgRef] = useState<SVGSVGElement | null>(null);
  useEffect(() => {
    if (!svgRef || (ownBoundingRect && !tooltipOpen)) return;
    const rafHandle = window.requestAnimationFrame(() => {
      if (svgRef) {
        setOwnBoundingClientRect(svgRef.getBoundingClientRect());
      }
    });
    return () => window.cancelAnimationFrame(rafHandle);
  }, [svgRef, tooltipOpen, ownBoundingRect]);

  const onMouseMove = useCallback(
    (event: React.MouseEvent<SVGRectElement, MouseEvent>) => {
      const nearestData = findNearestData(event);
      if (nearestData.closestDatum && showTooltip) {
        showTooltip({
          tooltipData: {
            ...nearestData,
            pageX: event.pageX,
            pageY: event.pageY,
            svgOriginX: ownBoundingRect?.x,
            svgOriginY: ownBoundingRect?.y,
          },
        });
      }
    },
    [findNearestData, showTooltip, ownBoundingRect],
  );

  // if width and height aren't both provided, wrap in auto-sizer
  if (width == null || height == null) {
    return <ParentSize>{dims => <XYChart {...dims} {...props} />}</ParentSize>;
  }

  return width > 0 && height > 0 ? (
    <svg ref={setSvgRef} width={width} height={height}>
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
