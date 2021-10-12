/* eslint jsx-a11y/mouse-events-have-key-events: 'off', @typescript-eslint/no-explicit-any: 'off' */
import React, { useContext, useEffect } from 'react';
import ParentSize from '@visx/responsive/lib/components/ParentSize';
import { AxisScaleOutput } from '@visx/axis';
import { ScaleConfig } from '@visx/scale';

import DataContext from '../context/DataContext';
import { Margin, EventHandlerParams } from '../types';
import useEventEmitter from '../hooks/useEventEmitter';
import EventEmitterProvider from '../providers/EventEmitterProvider';
import TooltipContext from '../context/TooltipContext';
import TooltipProvider from '../providers/TooltipProvider';
import DataProvider, { DataProviderProps } from '../providers/DataProvider';
import useEventEmitters from '../hooks/useEventEmitters';
import { XYCHART_EVENT_SOURCE } from '../constants';
import useEventHandlers, {
  POINTER_EVENTS_ALL,
  POINTER_EVENTS_NEAREST,
} from '../hooks/useEventHandlers';

const DEFAULT_MARGIN = { top: 50, right: 50, bottom: 50, left: 50 };

export type XYChartProps<
  XScaleConfig extends ScaleConfig<AxisScaleOutput, any, any>,
  YScaleConfig extends ScaleConfig<AxisScaleOutput, any, any>,
  Datum extends object,
> = {
  /** aria-label for the chart svg element. */
  accessibilityLabel?: string;
  /** Whether to capture and dispatch pointer events to EventEmitter context (which e.g., Series subscribe to). */
  captureEvents?: boolean;
  /** Total width of the desired chart svg, including margin. */
  width?: number;
  /** Total height of the desired chart svg, including margin. */
  height?: number;
  /** Margin to apply around the outside. */
  margin?: Margin;
  /** XYChart children (Series, Tooltip, etc.). */
  children: React.ReactNode;
  /** If DataContext is not available, XYChart will wrap itself in a DataProvider and set this as the theme. */
  theme?: DataProviderProps<XScaleConfig, YScaleConfig>['theme'];
  /** If DataContext is not available, XYChart will wrap itself in a DataProvider and set this as the xScale config. */
  xScale?: DataProviderProps<XScaleConfig, YScaleConfig>['xScale'];
  /** If DataContext is not available, XYChart will wrap itself in a DataProvider and set this as the yScale config. */
  yScale?: DataProviderProps<XScaleConfig, YScaleConfig>['yScale'];
  /* If DataContext is not available, XYChart will wrap itself in a DataProvider and set this as horizontal. Determines whether Series will be plotted horizontally (e.g., horizontal bars). By default this will try to be inferred based on scale types. */
  horizontal?: boolean | 'auto';
  /** Callback invoked for onPointerMove events for the nearest Datum to the PointerEvent _for each Series with pointerEvents={true}_. */
  onPointerMove?: ({
    datum,
    distanceX,
    distanceY,
    event,
    index,
    key,
    svgPoint,
  }: EventHandlerParams<Datum>) => void;
  /** Callback invoked for onPointerOut events for the nearest Datum to the PointerEvent _for each Series with pointerEvents={true}_. */
  onPointerOut?: (
    /** The PointerEvent. */
    event: React.PointerEvent,
  ) => void;
  /** Callback invoked for onPointerUp events for the nearest Datum to the PointerEvent _for each Series with pointerEvents={true}_. */
  onPointerUp?: ({
    datum,
    distanceX,
    distanceY,
    event,
    index,
    key,
    svgPoint,
  }: EventHandlerParams<Datum>) => void;
  /** Whether to invoke PointerEvent handlers for all dataKeys, or the nearest dataKey. */
  pointerEventsDataKey?: 'all' | 'nearest';
};

const allowedEventSources = [XYCHART_EVENT_SOURCE];

export default function XYChart<
  XScaleConfig extends ScaleConfig<AxisScaleOutput, any, any>,
  YScaleConfig extends ScaleConfig<AxisScaleOutput, any, any>,
  Datum extends object,
>(props: XYChartProps<XScaleConfig, YScaleConfig, Datum>) {
  const {
    accessibilityLabel = 'XYChart',
    captureEvents = true,
    children,
    height,
    horizontal,
    margin = DEFAULT_MARGIN,
    onPointerMove,
    onPointerOut,
    onPointerUp,
    pointerEventsDataKey = 'nearest',
    theme,
    width,
    xScale,
    yScale,
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

  const eventEmitters = useEventEmitters({ source: XYCHART_EVENT_SOURCE });
  useEventHandlers({
    dataKey: pointerEventsDataKey === 'nearest' ? POINTER_EVENTS_NEAREST : POINTER_EVENTS_ALL,
    onPointerMove,
    onPointerOut,
    onPointerUp,
    allowedSources: allowedEventSources,
  });

  // if Context or dimensions are not available, wrap self in the needed providers
  if (!setDimensions) {
    if (!xScale || !yScale) {
      console.warn(
        '[@visx/xychart] XYChart: When no DataProvider is available in context, you must pass xScale & yScale config to XYChart.',
      );
      return null;
    }
    return (
      <DataProvider
        xScale={xScale}
        yScale={yScale}
        theme={theme}
        initialDimensions={{ width, height, margin }}
        horizontal={horizontal}
      >
        <XYChart {...props} />
      </DataProvider>
    );
  }
  if (width == null || height == null) {
    return (
      <ParentSize>
        {(dims) => (
          <XYChart
            {...props}
            width={props.width == null ? dims.width : props.width}
            height={props.height == null ? dims.height : props.height}
          />
        )}
      </ParentSize>
    );
  }

  if (tooltipContext == null) {
    return (
      <TooltipProvider>
        <XYChart {...props} />
      </TooltipProvider>
    );
  }

  // EventEmitterProvider should be the last wrapper so we do not duplicate handlers
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
      {captureEvents && (
        <rect
          x={margin.left}
          y={margin.top}
          width={width - margin.left - margin.right}
          height={height - margin.top - margin.bottom}
          fill="transparent"
          {...eventEmitters}
        />
      )}
    </svg>
  ) : null;
}
