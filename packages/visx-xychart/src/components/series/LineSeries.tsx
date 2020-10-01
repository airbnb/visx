import React, { useContext, useCallback } from 'react';
import LinePath from '@visx/shape/lib/shapes/LinePath';
import { AxisScale } from '@visx/axis';
import DataContext from '../../context/DataContext';
import { SeriesProps } from '../../types';
import withRegisteredData, { WithRegisteredDataProps } from '../../enhancers/withRegisteredData';
import getScaledValueFactory from '../../utils/getScaledValueFactory';
import useEventEmitter, { HandlerParams } from '../../hooks/useEventEmitter';
import findNearestDatumXY from '../../utils/findNearestDatumXY';
import TooltipContext from '../../context/TooltipContext';

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
  const { colorScale, theme, width, height } = useContext(DataContext);
  const { showTooltip, hideTooltip } = useContext(TooltipContext) ?? {};
  const getScaledX = useCallback(getScaledValueFactory(xScale, xAccessor), [xScale, xAccessor]);
  const getScaledY = useCallback(getScaledValueFactory(yScale, yAccessor), [yScale, yAccessor]);
  const color = colorScale?.(dataKey) ?? theme?.colors?.[0] ?? '#222';

  const handleMouseMove = useCallback(
    (params: HandlerParams | undefined) => {
      const { event, svgCoords } = params || {};
      if (event && svgCoords && width && height && showTooltip) {
        const datum = findNearestDatumXY({
          event,
          svgCoords,
          key: dataKey,
          data,
          xScale,
          yScale,
          xAccessor,
          yAccessor,
          width,
          height,
        });
        if (datum) {
          showTooltip({
            tooltipData: datum.datum,
            tooltipLeft: svgCoords.x,
            tooltipTop: svgCoords.y,
          });
        }
      }
    },
    [dataKey, data, xScale, yScale, xAccessor, yAccessor, width, height, showTooltip],
  );
  useEventEmitter('mousemove', handleMouseMove);
  useEventEmitter('mouseout', hideTooltip);

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
