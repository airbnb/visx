import type { KeyboardEvent, RefCallback } from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import type { ChartA11yConfig, ChartA11yFocusedPoint } from './types';
import { DEFAULT_POINT_DESCRIPTION_THRESHOLD, normalizeChartA11yData } from './utils/data';
import {
  focusChartA11yPoint,
  getChartA11ySeriesLengths,
  initialChartA11yKeyboardState,
  transitionChartA11yKeyboardState,
} from './keyboard/stateMachine';
import type {
  ChartA11yKeyboardIntent,
  ChartA11yKeyboardState,
  ChartA11yPointFocus,
} from './keyboard/stateMachine';

const defaultKeyboardHelp =
  'Press Enter to explore chart data, arrow keys to move, Home and End for boundaries, and Escape to exit.';

export type UseChartKeyboardNavConfig<Datum> = Pick<
  ChartA11yConfig<Datum>,
  'data' | 'keyboardNavEnabled' | 'locale' | 'onPointFocus' | 'pointDescriptionThreshold' | 'series'
> & {
  onKeyboardHelp?: (message: string) => void;
};

export type UseChartKeyboardNavSvgProps = {
  tabIndex?: 0;
  onKeyDown?: (event: KeyboardEvent<SVGSVGElement>) => void;
  ref: RefCallback<SVGSVGElement>;
};

export type UseChartKeyboardNavPointProps = {
  ref: RefCallback<SVGElement>;
  tabIndex: 0 | -1;
  onFocus: () => void;
  'data-a11y-focused'?: boolean;
};

export type UseChartKeyboardNavResult = {
  svgProps: UseChartKeyboardNavSvgProps;
  getPointProps: (seriesIndex: number, index: number) => UseChartKeyboardNavPointProps;
  mode: ChartA11yKeyboardState['mode'];
  focusedPoint: ChartA11yPointFocus | null;
  focusPoint: (point: ChartA11yPointFocus | null) => void;
};

function getPointKey({ seriesIndex, index }: ChartA11yPointFocus) {
  return `${seriesIndex}:${index}`;
}

function getKeyboardIntent(
  event: KeyboardEvent<SVGSVGElement>,
  mode: ChartA11yKeyboardState['mode'],
): ChartA11yKeyboardIntent | null {
  if (mode === 'chart') {
    return event.key === 'Enter' || event.key === ' ' ? 'enter' : null;
  }

  if (event.key === 'ArrowRight') {
    return 'nextPoint';
  }

  if (event.key === 'ArrowLeft') {
    return 'previousPoint';
  }

  if (event.key === 'ArrowDown') {
    return 'nextSeries';
  }

  if (event.key === 'ArrowUp') {
    return 'previousSeries';
  }

  if (event.key === 'Home') {
    return event.ctrlKey ? 'firstChartPoint' : 'firstPoint';
  }

  if (event.key === 'End') {
    return event.ctrlKey ? 'lastChartPoint' : 'lastPoint';
  }

  if (event.key === 'Escape') {
    return 'exit';
  }

  return null;
}

function focusElement(element: SVGElement | null | undefined) {
  const focusableElement = element as (SVGElement & { focus?: () => void }) | null | undefined;

  focusableElement?.focus?.();
}

export function useChartKeyboardNav<Datum>({
  data,
  keyboardNavEnabled = true,
  locale,
  onKeyboardHelp,
  onPointFocus,
  pointDescriptionThreshold = DEFAULT_POINT_DESCRIPTION_THRESHOLD,
  series,
}: UseChartKeyboardNavConfig<Datum>): UseChartKeyboardNavResult {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const pointElementsRef = useRef(new Map<string, SVGElement>());
  const normalized = useMemo(() => normalizeChartA11yData({ data, series }), [data, series]);
  const seriesLengths = useMemo(
    () => getChartA11ySeriesLengths(normalized.series.map(({ data: seriesData }) => seriesData)),
    [normalized.series],
  );
  const navigationEnabled =
    keyboardNavEnabled &&
    normalized.pointCount > 0 &&
    normalized.pointCount <= pointDescriptionThreshold;
  const [state, setState] = useState<ChartA11yKeyboardState>(initialChartA11yKeyboardState);
  const { focusedPoint } = state;

  useEffect(() => {
    if (!navigationEnabled) {
      setState(initialChartA11yKeyboardState);
    }
  }, [navigationEnabled]);

  useEffect(() => {
    if (!navigationEnabled || state.mode !== 'data' || !focusedPoint) {
      return;
    }

    const focusedElement = pointElementsRef.current.get(getPointKey(focusedPoint));
    const focusedSeries = normalized.series[focusedPoint.seriesIndex];
    const datum = focusedSeries?.data[focusedPoint.index];

    focusElement(focusedElement);

    if (datum != null) {
      onPointFocus?.({
        seriesIndex: focusedPoint.seriesIndex,
        index: focusedPoint.index,
        datum,
      } satisfies ChartA11yFocusedPoint<Datum>);
    }
  }, [focusedPoint, navigationEnabled, normalized.series, onPointFocus, state.mode]);

  const setSvgRef = useCallback<RefCallback<SVGSVGElement>>((node) => {
    svgRef.current = node;
  }, []);

  const focusPoint = useCallback(
    (point: ChartA11yPointFocus | null) => {
      if (!navigationEnabled) {
        return;
      }

      setState((currentState) => focusChartA11yPoint(currentState, seriesLengths, point));
    },
    [navigationEnabled, seriesLengths],
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<SVGSVGElement>) => {
      if (!navigationEnabled) {
        return;
      }

      if (event.key === '?' || event.key === 'F1') {
        event.preventDefault();
        onKeyboardHelp?.(locale?.keyboardHelp ?? defaultKeyboardHelp);
        return;
      }

      const intent = getKeyboardIntent(event, state.mode);

      if (!intent) {
        return;
      }

      event.preventDefault();
      setState((currentState) =>
        transitionChartA11yKeyboardState(currentState, seriesLengths, intent),
      );

      if (intent === 'exit') {
        svgRef.current?.focus();
      }
    },
    [locale?.keyboardHelp, navigationEnabled, onKeyboardHelp, seriesLengths, state.mode],
  );

  const svgProps = useMemo<UseChartKeyboardNavSvgProps>(
    () => ({
      ...(navigationEnabled
        ? {
            onKeyDown: handleKeyDown,
            tabIndex: 0 as const,
          }
        : {}),
      ref: setSvgRef,
    }),
    [handleKeyDown, navigationEnabled, setSvgRef],
  );

  const getPointProps = useCallback(
    (seriesIndex: number, index: number): UseChartKeyboardNavPointProps => {
      const point = { seriesIndex, index };
      const isFocused =
        state.mode === 'data' &&
        focusedPoint?.seriesIndex === seriesIndex &&
        focusedPoint?.index === index;

      return {
        ref: (node) => {
          const key = getPointKey(point);

          if (node) {
            pointElementsRef.current.set(key, node);
          } else {
            pointElementsRef.current.delete(key);
          }
        },
        tabIndex: isFocused ? 0 : -1,
        onFocus: () => focusPoint(point),
        'data-a11y-focused': isFocused || undefined,
      };
    },
    [focusPoint, focusedPoint, state.mode],
  );

  return {
    svgProps,
    getPointProps,
    mode: state.mode,
    focusedPoint,
    focusPoint,
  };
}
