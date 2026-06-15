export type ChartA11yMode = 'chart' | 'data';

export type ChartA11yPointFocus = {
  seriesIndex: number;
  index: number;
};

export type ChartA11yKeyboardState = {
  mode: ChartA11yMode;
  focusedPoint: ChartA11yPointFocus | null;
  lastFocusedPoint: ChartA11yPointFocus | null;
};

export type ChartA11yKeyboardIntent =
  | 'enter'
  | 'exit'
  | 'nextPoint'
  | 'previousPoint'
  | 'nextSeries'
  | 'previousSeries'
  | 'firstPoint'
  | 'lastPoint'
  | 'firstChartPoint'
  | 'lastChartPoint';

export const initialChartA11yKeyboardState: ChartA11yKeyboardState = {
  mode: 'chart',
  focusedPoint: null,
  lastFocusedPoint: null,
};

function getSeriesLength(seriesLengths: readonly number[], seriesIndex: number) {
  return seriesLengths[seriesIndex] ?? 0;
}

function getPointCount(seriesLengths: readonly number[]) {
  return seriesLengths.reduce((total, length) => total + length, 0);
}

function getFirstPoint(seriesLengths: readonly number[]): ChartA11yPointFocus | null {
  const seriesIndex = seriesLengths.findIndex((length) => length > 0);

  return seriesIndex < 0 ? null : { seriesIndex, index: 0 };
}

function getLastPoint(seriesLengths: readonly number[]): ChartA11yPointFocus | null {
  for (let seriesIndex = seriesLengths.length - 1; seriesIndex >= 0; seriesIndex -= 1) {
    const length = getSeriesLength(seriesLengths, seriesIndex);

    if (length > 0) {
      return { seriesIndex, index: length - 1 };
    }
  }

  return null;
}

function arePointsEqual(
  firstPoint: ChartA11yPointFocus | null,
  secondPoint: ChartA11yPointFocus | null,
) {
  return (
    firstPoint?.seriesIndex === secondPoint?.seriesIndex && firstPoint?.index === secondPoint?.index
  );
}

function clampPoint(
  seriesLengths: readonly number[],
  point: ChartA11yPointFocus | null,
): ChartA11yPointFocus | null {
  if (!point || getPointCount(seriesLengths) === 0) {
    return getFirstPoint(seriesLengths);
  }

  const length = getSeriesLength(seriesLengths, point.seriesIndex);

  if (length > 0) {
    return {
      seriesIndex: point.seriesIndex,
      index: Math.min(Math.max(point.index, 0), length - 1),
    };
  }

  return getFirstPoint(seriesLengths);
}

function setFocusedPoint(
  state: ChartA11yKeyboardState,
  focusedPoint: ChartA11yPointFocus | null,
): ChartA11yKeyboardState {
  if (arePointsEqual(state.focusedPoint, focusedPoint)) {
    return state;
  }

  return {
    mode: focusedPoint ? 'data' : state.mode,
    focusedPoint,
    lastFocusedPoint: focusedPoint ?? state.lastFocusedPoint,
  };
}

function movePoint(
  seriesLengths: readonly number[],
  point: ChartA11yPointFocus | null,
  direction: 1 | -1,
): ChartA11yPointFocus | null {
  const focusedPoint = clampPoint(seriesLengths, point);

  if (!focusedPoint) {
    return null;
  }

  const length = getSeriesLength(seriesLengths, focusedPoint.seriesIndex);

  if (length <= 1) {
    return focusedPoint;
  }

  return {
    seriesIndex: focusedPoint.seriesIndex,
    index: (focusedPoint.index + direction + length) % length,
  };
}

function moveSeries(
  seriesLengths: readonly number[],
  point: ChartA11yPointFocus | null,
  direction: 1 | -1,
): ChartA11yPointFocus | null {
  const focusedPoint = clampPoint(seriesLengths, point);
  const seriesCount = seriesLengths.length;

  if (!focusedPoint || seriesCount <= 1) {
    return focusedPoint;
  }

  for (let offset = 1; offset < seriesCount; offset += 1) {
    const seriesIndex = (focusedPoint.seriesIndex + direction * offset + seriesCount) % seriesCount;
    const length = getSeriesLength(seriesLengths, seriesIndex);

    if (length > 0) {
      return {
        seriesIndex,
        index: Math.min(focusedPoint.index, length - 1),
      };
    }
  }

  return focusedPoint;
}

export function getChartA11ySeriesLengths(seriesData: readonly (readonly unknown[])[]) {
  return seriesData.map((series) => series.length);
}

export function focusChartA11yPoint(
  state: ChartA11yKeyboardState,
  seriesLengths: readonly number[],
  point: ChartA11yPointFocus | null,
): ChartA11yKeyboardState {
  return setFocusedPoint(state, clampPoint(seriesLengths, point));
}

export function transitionChartA11yKeyboardState(
  state: ChartA11yKeyboardState,
  seriesLengths: readonly number[],
  intent: ChartA11yKeyboardIntent,
): ChartA11yKeyboardState {
  if (getPointCount(seriesLengths) === 0) {
    return initialChartA11yKeyboardState;
  }

  if (intent === 'enter') {
    return setFocusedPoint(state, clampPoint(seriesLengths, state.lastFocusedPoint));
  }

  if (intent === 'exit') {
    return state.mode === 'chart'
      ? state
      : {
          mode: 'chart',
          focusedPoint: null,
          lastFocusedPoint: state.focusedPoint ?? state.lastFocusedPoint,
        };
  }

  if (state.mode !== 'data') {
    return state;
  }

  if (intent === 'nextPoint') {
    return setFocusedPoint(state, movePoint(seriesLengths, state.focusedPoint, 1));
  }

  if (intent === 'previousPoint') {
    return setFocusedPoint(state, movePoint(seriesLengths, state.focusedPoint, -1));
  }

  if (intent === 'nextSeries') {
    return setFocusedPoint(state, moveSeries(seriesLengths, state.focusedPoint, 1));
  }

  if (intent === 'previousSeries') {
    return setFocusedPoint(state, moveSeries(seriesLengths, state.focusedPoint, -1));
  }

  if (intent === 'firstPoint') {
    const focusedPoint = clampPoint(seriesLengths, state.focusedPoint);

    return setFocusedPoint(
      state,
      focusedPoint ? { seriesIndex: focusedPoint.seriesIndex, index: 0 } : null,
    );
  }

  if (intent === 'lastPoint') {
    const focusedPoint = clampPoint(seriesLengths, state.focusedPoint);
    const length = focusedPoint ? getSeriesLength(seriesLengths, focusedPoint.seriesIndex) : 0;

    return setFocusedPoint(
      state,
      focusedPoint ? { seriesIndex: focusedPoint.seriesIndex, index: length - 1 } : null,
    );
  }

  if (intent === 'firstChartPoint') {
    return setFocusedPoint(state, getFirstPoint(seriesLengths));
  }

  return setFocusedPoint(state, getLastPoint(seriesLengths));
}
