import React, { useContext, useCallback, useMemo } from 'react';
import { AxisScale } from '@visx/axis';
import Area from '@visx/shape/lib/shapes/Area';
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

export type BaseAreaSeriesProps<
  XScale extends AxisScale,
  YScale extends AxisScale,
  Datum extends object
> = SeriesProps<XScale, YScale, Datum> & {
  /** Whether area should be rendered horizontally instead of vertically. */
  horizontal?: boolean;
  /** Whether to render a Line on top of the Area shape (fill only). */
  renderLine?: boolean;
  /** Props to be passed to the Line, if rendered. */
  lineProps?: Omit<LinePathProps<Datum>, 'data' | 'x' | 'y' | 'children' | 'defined'>;
  /** Rendered component which is passed path props by BaseAreaSeries after processing. */
  PathComponent?: React.FC<Omit<React.SVGProps<SVGPathElement>, 'ref'>> | 'path';
} & Omit<React.SVGProps<SVGPathElement>, 'x' | 'y' | 'x0' | 'x1' | 'y0' | 'y1' | 'ref'>;

function BaseAreaSeries<XScale extends AxisScale, YScale extends AxisScale, Datum extends object>({
  data,
  dataKey,
  horizontal,
  xAccessor,
  xScale,
  yAccessor,
  yScale,
  renderLine = true,
  PathComponent = 'path',
  lineProps,
  ...areaProps
}: BaseAreaSeriesProps<XScale, YScale, Datum> & WithRegisteredDataProps<XScale, YScale, Datum>) {
  const { colorScale, theme, width, height } = useContext(DataContext);
  const { showTooltip, hideTooltip } = useContext(TooltipContext) ?? {};
  const getScaledX = useCallback(getScaledValueFactory(xScale, xAccessor), [xScale, xAccessor]);
  const getScaledY = useCallback(getScaledValueFactory(yScale, yAccessor), [yScale, yAccessor]);
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
      <Area data={data} {...xAccessors} {...yAccessors} {...areaProps}>
        {({ path }) => (
          <PathComponent stroke="transparent" fill={color} {...areaProps} d={path(data) || ''} />
        )}
      </Area>
      {renderLine && (
        <LinePath<Datum>
          data={data}
          x={getScaledX}
          y={getScaledY}
          stroke={color}
          strokeWidth={2}
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
