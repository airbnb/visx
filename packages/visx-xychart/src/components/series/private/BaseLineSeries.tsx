import React, { useContext, useCallback } from 'react';
import LinePath, { LinePathProps } from '@visx/shape/lib/shapes/LinePath';
import { AxisScale } from '@visx/axis';
import DataContext from '../../../context/DataContext';
import { SeriesProps } from '../../../types';
import withRegisteredData, { WithRegisteredDataProps } from '../../../enhancers/withRegisteredData';
import getScaledValueFactory from '../../../utils/getScaledValueFactory';
import useEventEmitter, { HandlerParams } from '../../../hooks/useEventEmitter';
import findNearestDatumX from '../../../utils/findNearestDatumX';
import TooltipContext from '../../../context/TooltipContext';
import findNearestDatumY from '../../../utils/findNearestDatumY';
import isValidNumber from '../../../typeguards/isValidNumber';

export type BaseLineSeriesProps<
  XScale extends AxisScale,
  YScale extends AxisScale,
  Datum extends object
> = SeriesProps<XScale, YScale, Datum> & {
  /** Rendered component which is passed path props by BaseLineSeries after processing. */
  PathComponent?: React.FC<Omit<React.SVGProps<SVGPathElement>, 'ref'>> | 'path';
  /** Sets the curve factory (from @visx/curve or d3-curve) for the line generator. Defaults to curveLinear. */
  curve?: LinePathProps<Datum>['curve'];
} & Omit<React.SVGProps<SVGPathElement>, 'x' | 'y' | 'x0' | 'x1' | 'y0' | 'y1' | 'ref'>;

function BaseLineSeries<XScale extends AxisScale, YScale extends AxisScale, Datum extends object>({
  curve,
  data,
  dataKey,
  xAccessor,
  xScale,
  yAccessor,
  yScale,
  PathComponent = 'path',
  ...lineProps
}: BaseLineSeriesProps<XScale, YScale, Datum> & WithRegisteredDataProps<XScale, YScale, Datum>) {
  const { colorScale, theme, width, height, horizontal } = useContext(DataContext);
  const { showTooltip, hideTooltip } = useContext(TooltipContext) ?? {};
  const getScaledX = useCallback(getScaledValueFactory(xScale, xAccessor), [xScale, xAccessor]);
  const getScaledY = useCallback(getScaledValueFactory(yScale, yAccessor), [yScale, yAccessor]);
  const isDefined = useCallback(
    (d: Datum) => isValidNumber(xScale(xAccessor(d))) && isValidNumber(yScale(yAccessor(d))),
    [xScale, xAccessor, yScale, yAccessor],
  );
  const color = colorScale?.(dataKey) ?? theme?.colors?.[0] ?? '#222';

  const handleMouseMove = useCallback(
    (params?: HandlerParams) => {
      const { svgPoint } = params || {};
      if (svgPoint && width && height && showTooltip) {
        const datum = (horizontal ? findNearestDatumY : findNearestDatumX)({
          point: svgPoint,
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
            key: dataKey,
            ...datum,
            svgPoint,
          });
        }
      }
    },
    [dataKey, data, xScale, yScale, xAccessor, yAccessor, width, height, showTooltip, horizontal],
  );
  useEventEmitter('mousemove', handleMouseMove);
  useEventEmitter('mouseout', hideTooltip);

  return (
    <LinePath x={getScaledX} y={getScaledY} defined={isDefined} curve={curve} {...lineProps}>
      {({ path }) => (
        <PathComponent
          stroke={color}
          strokeWidth={2}
          fill="transparent"
          {...lineProps}
          d={path(data) || ''}
        />
      )}
    </LinePath>
  );
}

export default withRegisteredData(BaseLineSeries);
