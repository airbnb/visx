import React, { useContext, useCallback, useMemo } from 'react';
import { AxisScale } from '@visx/axis';
import Area, { AreaProps } from '@visx/shape/lib/shapes/Area';
import LinePath, { LinePathProps } from '@visx/shape/lib/shapes/LinePath';
import DataContext from '../../../context/DataContext';
import { SeriesProps } from '../../../types';
import withRegisteredData, { WithRegisteredDataProps } from '../../../enhancers/withRegisteredData';
import getScaledValueFactory from '../../../utils/getScaledValueFactory';
import useEventEmitter, { HandlerParams } from '../../../hooks/useEventEmitter';
import findNearestDatumX from '../../../utils/findNearestDatumX';
import TooltipContext from '../../../context/TooltipContext';
import findNearestDatumY from '../../../utils/findNearestDatumY';
import getScaleBaseline from '../../../utils/getScaleBaseline';
import isValidNumber from '../../../typeguards/isValidNumber';

export type BaseAreaSeriesProps<
  XScale extends AxisScale,
  YScale extends AxisScale,
  Datum extends object
> = SeriesProps<XScale, YScale, Datum> & {
  /** Whether to render a Line along value of the Area shape (area is fill only). */
  renderLine?: boolean;
  /** Sets the curve factory (from @visx/curve or d3-curve) for the line generator. Defaults to curveLinear. */
  curve?: AreaProps<Datum>['curve'];
  /** Props to be passed to the Line, if rendered. */
  lineProps?: Omit<LinePathProps<Datum>, 'data' | 'x' | 'y' | 'children' | 'defined'>;
  /** Rendered component which is passed path props by BaseAreaSeries after processing. */
  PathComponent?: React.FC<Omit<React.SVGProps<SVGPathElement>, 'ref'>> | 'path';
} & Omit<React.SVGProps<SVGPathElement>, 'x' | 'y' | 'x0' | 'x1' | 'y0' | 'y1' | 'ref'>;

function BaseAreaSeries<XScale extends AxisScale, YScale extends AxisScale, Datum extends object>({
  curve,
  data,
  dataKey,
  xAccessor,
  xScale,
  yAccessor,
  yScale,
  renderLine = true,
  PathComponent = 'path',
  lineProps,
  ...areaProps
}: BaseAreaSeriesProps<XScale, YScale, Datum> & WithRegisteredDataProps<XScale, YScale, Datum>) {
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

  const numericScaleBaseline = useMemo(() => getScaleBaseline(horizontal ? xScale : yScale), [
    horizontal,
    xScale,
    yScale,
  ]);

  const xAccessors = horizontal
    ? {
        x0: numericScaleBaseline,
        x1: getScaledX,
      }
    : { x: getScaledX };

  const yAccessors = horizontal
    ? {
        y: getScaledY,
      }
    : { y0: numericScaleBaseline, y1: getScaledY };

  return (
    <>
      <Area {...xAccessors} {...yAccessors} {...areaProps} curve={curve} defined={isDefined}>
        {({ path }) => (
          <PathComponent stroke="transparent" fill={color} {...areaProps} d={path(data) || ''} />
        )}
      </Area>
      {renderLine && (
        <LinePath<Datum>
          x={getScaledX}
          y={getScaledY}
          defined={isDefined}
          curve={curve}
          {...lineProps}
        >
          {({ path }) => (
            <PathComponent
              fill="transparent"
              stroke={color}
              strokeWidth={2}
              {...lineProps}
              d={path(data) || ''}
            />
          )}
        </LinePath>
      )}
    </>
  );
}

export default withRegisteredData(BaseAreaSeries);
