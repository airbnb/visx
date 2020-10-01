import React, { useContext, useCallback } from 'react';
import LinePath from '@visx/shape/lib/shapes/LinePath';
import { AxisScale } from '@visx/axis';
import DataContext from '../../context/DataContext';
import { SeriesProps } from '../../types';
import withRegisteredData, { WithRegisteredDataProps } from '../../enhancers/withRegisteredData';
import getScaledValueFactory from '../../utils/getScaledValueFactory';

type LineSeriesProps<
  XScale extends AxisScale,
  YScale extends AxisScale,
  Datum extends object
> = SeriesProps<XScale, YScale, Datum>;

function LineSeries<XScale extends AxisScale, YScale extends AxisScale, Datum extends object>({
  data,
  dataKey,
  xAccessor,
  xScale,
  yAccessor,
  yScale,
  ...lineProps
}: LineSeriesProps<XScale, YScale, Datum> & WithRegisteredDataProps<XScale, YScale, Datum>) {
  const { colorScale, theme } = useContext(DataContext);
  const getScaledX = useCallback(getScaledValueFactory(xScale, xAccessor), [xScale, xAccessor]);
  const getScaledY = useCallback(getScaledValueFactory(yScale, yAccessor), [yScale, yAccessor]);
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

export default withRegisteredData(LineSeries);
