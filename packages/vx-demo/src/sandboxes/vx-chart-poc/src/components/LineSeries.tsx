import React, { useContext, useEffect, useCallback } from 'react';
import LinePath, { LinePathProps } from '@vx/shape/lib/shapes/LinePath';
import ChartContext from '../context/ChartContext';

type LineSeriesProps<Datum> = {
  dataKey: string;
  data: Datum[];
  xAccessor: (d: Datum) => unknown;
  yAccessor: (d: Datum) => unknown;
} & Omit<LinePathProps<Datum>, 'x' | 'y' | 'data'>;

export default function LineSeries<Datum = unknown>({
  dataKey,
  data,
  xAccessor,
  yAccessor,
  ...lineProps
}: LineSeriesProps<Datum>) {
  const { theme, xScale, yScale, registerData, unregisterData } = useContext(ChartContext);

  // register data on mount
  useEffect(() => {
    registerData({ key: dataKey, data, xAccessor, yAccessor });
    return () => unregisterData(dataKey);
  }, [registerData, unregisterData, dataKey, data, xAccessor, yAccessor]);

  const getScaledX = useCallback(
    (d: Datum) => {
      return xScale ? xScale(xAccessor(d)) : null;
    },
    [xScale, xAccessor],
  );

  const getScaledY = useCallback(
    (d: Datum) => {
      return yScale ? yScale(yAccessor(d)) : null;
    },
    [yScale, yAccessor],
  );

  // early return if scale is not available in context
  if (!xScale || !yScale) return null;

  return (
    <LinePath<Datum>
      data={data}
      x={getScaledX}
      y={getScaledY}
      stroke={theme.colors[0]}
      {...lineProps}
    />
  );
}
