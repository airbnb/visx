import React, { useCallback, useContext, useEffect } from 'react';
import ParentSize from '@visx/responsive/lib/components/ParentSize';

import DataContext from '../context/DataContext';
import { Margin } from '../types';
import useEventEmitter from '../hooks/useEventEmitter';
import EventEmitterProvider from '../providers/EventEmitterProvider';

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

  // if width and height aren't both provided, wrap in auto-sizer + preserve passed dims
  if (width == null || height == null) {
    return <ParentSize>{dims => <XYChart {...dims} {...props} />}</ParentSize>;
  }
  // if event emitter context is not available, wrap self in it
  if (emit == null) {
    return (
      <EventEmitterProvider>
        <XYChart {...props} />
      </EventEmitterProvider>
    );
  }

  return width > 0 && height > 0 ? (
    <svg width={width} height={height} aria-label={accessibilityLabel}>
      {children}
      {/** capture all events */}
      {/* eslint-disable-next-line jsx-a11y/mouse-events-have-key-events */}
      <rect
        x={margin.left}
        y={margin.top}
        width={width - margin.left - margin.right}
        height={height - margin.top - margin.bottom}
        fill="rgba(250,0,0,0.2)"
        onMouseMove={handleMouseTouchMove}
        onTouchMove={handleMouseTouchMove}
        onMouseOut={handleMouseOutTouchEnd}
        onTouchEnd={handleMouseOutTouchEnd}
      />
    </svg>
  ) : null;
}
