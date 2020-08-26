import React, { useContext, useCallback, useEffect } from 'react';
import LinePath from '@vx/shape/lib/shapes/LinePath';
import DataContext from '../../context/DataContext';

type LineSeriesProps<Datum> = {
  dataKey: string;
  data: Datum[];
  xAccessor: (d: Datum) => unknown;
  yAccessor: (d: Datum) => unknown;
};

function isValidNumber(_: unknown): _ is number {
  return _ != null && typeof _ === 'number' && !isNaN(_) && isFinite(_);
}

export default function LineSeries<Datum>({
  data,
  xAccessor,
  yAccessor,
  dataKey,
  ...lineProps
}: LineSeriesProps<Datum>) {
  const { xScale, yScale, colorScale, dataRegistry } = useContext(DataContext);

  // register data on mount
  // @TODO(chris) make easier with HOC
  useEffect(() => {
    if (dataRegistry) dataRegistry.registerData({ key: dataKey, data, xAccessor, yAccessor });
    return () => dataRegistry?.unregisterData(dataKey);
  }, [dataRegistry, dataKey, data, xAccessor, yAccessor]);

  const getScaledX = useCallback(
    (d: Datum) => {
      const x = xScale(xAccessor?.(d));
      return isValidNumber(x) ? x + (xScale.bandwidth?.() ?? 0) / 2 : null;
    },
    [xScale, xAccessor],
  );

  const getScaledY = useCallback(
    (d: Datum) => {
      const y = yScale(yAccessor?.(d));
      return isValidNumber(y) ? y + (yScale.bandwidth?.() ?? 0) / 2 : null;
    },
    [yScale, yAccessor],
  );

  if (!data || !xAccessor || !yAccessor) return null;

  const color = colorScale?.(dataKey) ?? '#222';

  return (
    <LinePath
      data={data}
      x={getScaledX}
      y={getScaledY}
      stroke={color}
      strokeWidth={2}
      {...lineProps}
    />
  );
}
