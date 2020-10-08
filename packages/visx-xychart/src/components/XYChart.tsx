/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React, { useCallback, useContext, useEffect } from 'react';
import ParentSize from '@visx/responsive/lib/components/ParentSize';

import DataContext from '../context/DataContext';
import { Margin } from '../types';
import useEventEmitter from '../hooks/useEventEmitter';
import EventEmitterProvider from '../providers/EventEmitterProvider';
import TooltipContext from '../context/TooltipContext';
import TooltipProvider from '../providers/TooltipProvider';

const DEFAULT_MARGIN = { top: 50, right: 50, bottom: 50, left: 50 };

type Props = {
  accessibilityLabel?: string;
  events?: boolean;
  width?: number;
  height?: number;
  margin?: Margin;
  children: React.ReactNode;
};

export default function XYChart(props: Props) {
  const {
    accessibilityLabel = 'XYChart',
    children,
    width,
    height,
    margin = DEFAULT_MARGIN,
  } = props;
  const { setDimensions } = useContext(DataContext);
  const tooltipContext = useContext(TooltipContext);
  const emit = useEventEmitter();

  // update dimensions in context
  useEffect(() => {
    if (setDimensions && width != null && height != null && width > 0 && height > 0) {
      setDimensions({ width, height, margin });
    }
  }, [setDimensions, width, height, margin]);

  const handleMouseTouchMove = useCallback(
    (event: React.MouseEvent | React.TouchEvent) => emit?.('mousemove', event),
    [emit],
  );
  const handleMouseOutTouchEnd = useCallback(
    (event: React.MouseEvent | React.TouchEvent) => emit?.('mouseout', event),
    [emit],
  );

  // if Context or dimensions are not available, wrap self in the needed providers
  if (width == null || height == null) {
    return <ParentSize>{dims => <XYChart {...dims} {...props} />}</ParentSize>;
  }
  if (emit == null) {
    return (
      <EventEmitterProvider>
        <XYChart {...props} />
      </EventEmitterProvider>
    );
  }
  if (tooltipContext == null) {
    return (
      <TooltipProvider>
        <XYChart {...props} />
      </TooltipProvider>
    );
  }

  return width > 0 && height > 0 ? (
    <svg width={width} height={height} aria-label={accessibilityLabel}>
      {children}
      {/** capture all mouse/touch events and emit them. */}
      <rect
        x={margin.left}
        y={margin.top}
        width={width - margin.left - margin.right}
        height={height - margin.top - margin.bottom}
        fill="transparent"
        onMouseMove={handleMouseTouchMove}
        onTouchMove={handleMouseTouchMove}
        onMouseOut={handleMouseOutTouchEnd}
        onTouchEnd={handleMouseOutTouchEnd}
      />
    </svg>
  ) : null;
}
