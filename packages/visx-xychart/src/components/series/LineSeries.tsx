import React, { useContext, useCallback, useEffect } from 'react';
import LinePath from '@visx/shape/lib/shapes/LinePath';
import { ScaleInput } from '@visx/scale';
import { AxisScale } from '@visx/axis';
import DataContext from '../../context/DataContext';
import isValidNumber from '../../typeguards/isValidNumber';

type LineSeriesProps<XScale extends AxisScale, YScale extends AxisScale, Datum> = {
  dataKey: string;
  data: Datum[];
  xAccessor: (d: Datum) => ScaleInput<XScale>;
  yAccessor: (d: Datum) => ScaleInput<YScale>;
};

export default function LineSeries<XScale extends AxisScale, YScale extends AxisScale, Datum>({
  data,
  xAccessor,
  yAccessor,
  dataKey,
  ...lineProps
}: LineSeriesProps<XScale, YScale, Datum>) {
  const { xScale, yScale, colorScale, dataRegistry, theme } = useContext(DataContext);

  // register data on mount
  // @TODO(chris) make this easier with HOC
  useEffect(() => {
    if (dataRegistry) dataRegistry.registerData({ key: dataKey, data, xAccessor, yAccessor });
    return () => dataRegistry?.unregisterData(dataKey);
  }, [dataRegistry, dataKey, data, xAccessor, yAccessor]);

  const getScaledX = useCallback(
    (d: Datum) => {
      const x = xScale?.(xAccessor(d));
      return isValidNumber(x)
        ? x + (xScale && 'bandwidth' in xScale ? xScale?.bandwidth?.() ?? 0 : 0) / 2
        : NaN;
    },
    [xScale, xAccessor],
  );

  const getScaledY = useCallback(
    (d: Datum) => {
      const y = yScale?.(yAccessor(d));
      return isValidNumber(y)
        ? y + (yScale && 'bandwidth' in yScale ? yScale?.bandwidth?.() ?? 0 : 0) / 2
        : NaN;
    },
    [yScale, yAccessor],
  );

  if (!data || !xAccessor || !yAccessor) return null;

  const color = colorScale?.(dataKey) ?? theme?.colors?.[0] ?? '#222';

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
