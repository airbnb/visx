import React, { useContext, useCallback, useEffect } from 'react';
import LinePath from '@vx/shape/lib/shapes/LinePath';
import { ScaleConfig, ScaleConfigToD3Scale, ScaleInput } from '@vx/scale';
import { AxisScaleOutput } from '@vx/axis';
import DataContext, { InferDataContext } from '../../context/DataContext';
import isValidNumber from '../../typeguards/isValidNumber';
import { DataContext as DataContextType } from '../../types/data';

type LineSeriesProps<
  XScaleConfig extends ScaleConfig<AxisScaleOutput>,
  YScaleConfig extends ScaleConfig<AxisScaleOutput>,
  Datum
> = {
  dataKey: string;
  data: Datum[];
  xAccessor: (d: Datum) => ScaleInput<ScaleConfigToD3Scale<XScaleConfig, AxisScaleOutput>>;
  yAccessor: (d: Datum) => ScaleInput<ScaleConfigToD3Scale<YScaleConfig, AxisScaleOutput>>;
};

export default function LineSeries<
  XScaleConfig extends ScaleConfig<AxisScaleOutput>,
  YScaleConfig extends ScaleConfig<AxisScaleOutput>,
  Datum
>({
  data,
  xAccessor,
  yAccessor,
  dataKey,
  ...lineProps
}: LineSeriesProps<XScaleConfig, YScaleConfig, Datum>) {
  const { xScale, yScale, colorScale, dataRegistry } = useContext<
    Partial<DataContextType<XScaleConfig, YScaleConfig, Datum>>
  >(DataContext);

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
