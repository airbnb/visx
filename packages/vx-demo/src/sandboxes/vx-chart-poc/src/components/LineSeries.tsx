import React, { useContext, useEffect, useCallback } from 'react';
import LinePath, { LinePathProps } from '@vx/shape/lib/shapes/LinePath';
import ChartContext from '../context/ChartContext';
import { ChartContext as ChartContextType } from '../types';

type LineSeriesProps<Datum, XScaleInput, YScaleInput> = {
  dataKey: string;
  data: Datum[];
  xAccessor: (d: Datum) => XScaleInput;
  yAccessor: (d: Datum) => YScaleInput;
  mouseEvents?: boolean;
} & Omit<LinePathProps<Datum>, 'x' | 'y' | 'data'>;

function LineSeries<Datum = unknown, XScaleInput = unknown, YScaleInput = unknown>({
  dataKey,
  data,
  xAccessor,
  yAccessor,
  mouseEvents,
  ...lineProps
}: LineSeriesProps<Datum, XScaleInput, YScaleInput>) {
  const { theme, xScale, yScale, registerData, unregisterData } = useContext<
    ChartContextType<XScaleInput, YScaleInput>
  >(ChartContext);

  // register data on mount
  useEffect(() => {
    registerData({ key: dataKey, data, xAccessor, yAccessor, mouseEvents });
    return () => unregisterData(dataKey);
  }, [registerData, unregisterData, dataKey, data, xAccessor, yAccessor, mouseEvents]);

  const getScaledX = useCallback(
    (d: Datum) => {
      const x = xAccessor(d);
      return xScale && x != null ? xScale(x) : null;
    },
    [xScale, xAccessor],
  );

  const getScaledY = useCallback(
    (d: Datum) => {
      const y = yAccessor(d);
      return yScale && y != null ? yScale(y) : null;
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

export default React.memo(LineSeries);
