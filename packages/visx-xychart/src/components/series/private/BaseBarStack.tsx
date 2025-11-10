import { useContext, useCallback } from 'react';
import type { ReactElement, FC } from 'react';
import type { SeriesPoint } from '@visx/vendor/d3-shape';
import type { PositionScale, StackPathConfig } from '@visx/shape';
import { getFirstItem, getSecondItem, getBandwidth } from '@visx/shape';

import type { BaseBarSeriesProps } from './BaseBarSeries';
import DataContext from '../../../context/DataContext';
import type {
  Bar,
  BarsProps,
  BarStackDatum,
  CombinedStackData,
  DataContextType,
  NearestDatumArgs,
  NearestDatumReturnType,
  SeriesProps,
} from '../../../types';
import isValidNumber from '../../../typeguards/isValidNumber';
import { getStackValue } from '../../../utils/combineBarStackData';
import { BARSTACK_EVENT_SOURCE, XYCHART_EVENT_SOURCE } from '../../../constants';
import useSeriesEvents from '../../../hooks/useSeriesEvents';
import findNearestStackDatum from '../../../utils/findNearestStackDatum';
import useStackedData from '../../../hooks/useStackedData';

type BarStackChildProps<
  XScale extends PositionScale,
  YScale extends PositionScale,
  Datum extends object,
> = Omit<BaseBarSeriesProps<XScale, YScale, Datum>, 'BarsComponent'>;

export type BaseBarStackProps<
  XScale extends PositionScale,
  YScale extends PositionScale,
  Datum extends object,
> = {
  /** `BarSeries` elements, note we can't strictly enforce this with TS yet. */
  children:
    | ReactElement<BarStackChildProps<XScale, YScale, Datum>>
    | ReactElement<BarStackChildProps<XScale, YScale, Datum>>[];
  /** Rendered component which is passed BarsProps by BaseBarStack after processing. */
  BarsComponent: FC<BarsProps<XScale, YScale>>;
} & Pick<StackPathConfig<Datum, string>, 'offset' | 'order'> &
  Pick<
    SeriesProps<XScale, YScale, Datum>,
    | 'onPointerMove'
    | 'onPointerOut'
    | 'onPointerUp'
    | 'onPointerDown'
    | 'onBlur'
    | 'onFocus'
    | 'enableEvents'
  >;

function BaseBarStack<
  XScale extends PositionScale,
  YScale extends PositionScale,
  Datum extends object,
>({
  children,
  order,
  offset,
  BarsComponent,
  onBlur,
  onFocus,
  onPointerMove,
  onPointerOut,
  onPointerUp,
  onPointerDown,
  enableEvents = true,
}: BaseBarStackProps<XScale, YScale, Datum>) {
  type StackBar = SeriesPoint<CombinedStackData<XScale, YScale>>;

  const { colorScale, dataRegistry, horizontal, xScale, yScale } = useContext(
    DataContext,
  ) as unknown as DataContextType<XScale, YScale, BarStackDatum<XScale, YScale>>;

  const { seriesChildren, dataKeys, stackedData } = useStackedData<
    XScale,
    YScale,
    Datum,
    BaseBarSeriesProps<XScale, YScale, Datum>
  >({
    children,
    order,
    offset,
  });

  // custom logic to find the nearest AreaStackDatum (context) and return the original Datum (props)
  const findNearestDatum = useCallback(
    (
      params: NearestDatumArgs<XScale, YScale, BarStackDatum<XScale, YScale>>,
    ): NearestDatumReturnType<Datum> => {
      const childData = seriesChildren.find((child) => child.props.dataKey === params.dataKey)
        ?.props?.data;
      return childData ? findNearestStackDatum(params, childData, horizontal) : null;
    },
    [seriesChildren, horizontal],
  );

  const ownEventSourceKey = `${BARSTACK_EVENT_SOURCE}-${dataKeys.join('-')}`;
  const eventEmitters = useSeriesEvents<XScale, YScale, Datum>({
    dataKey: dataKeys,
    enableEvents,
    // @ts-expect-error Datum input + return type are expected to be the same type but they differ for BarStack (registry data is StackedDatum, return type is user Datum)
    findNearestDatum,
    onBlur,
    onFocus,
    onPointerMove,
    onPointerOut,
    onPointerUp,
    onPointerDown,
    source: ownEventSourceKey,
    allowedSources: [XYCHART_EVENT_SOURCE, ownEventSourceKey],
  });

  const registryEntries = dataKeys.map((key) => dataRegistry.get(key));

  // if scales and data are not available in the registry, bail
  if (registryEntries.some((entry) => entry == null) || !xScale || !yScale || !colorScale) {
    return null;
  }

  const barThickness = getBandwidth(horizontal ? yScale : xScale);
  const halfBarThickness = barThickness / 2;

  let getWidth: (bar: StackBar) => number | undefined;
  let getHeight: (bar: StackBar) => number | undefined;
  let getX: (bar: StackBar) => number | undefined;
  let getY: (bar: StackBar) => number | undefined;

  if (horizontal) {
    getWidth = (bar) => (xScale(getSecondItem(bar)) ?? NaN) - (xScale(getFirstItem(bar)) ?? NaN);
    getHeight = () => barThickness;
    getX = (bar) => xScale(getFirstItem(bar));
    getY = (bar) =>
      'bandwidth' in yScale
        ? yScale(getStackValue(bar.data))
        : Math.max((yScale(getStackValue(bar.data)) ?? NaN) - halfBarThickness);
  } else {
    getWidth = () => barThickness;
    getHeight = (bar) => (yScale(getFirstItem(bar)) ?? NaN) - (yScale(getSecondItem(bar)) ?? NaN);
    getX = (bar) =>
      'bandwidth' in xScale
        ? xScale(getStackValue(bar.data))
        : Math.max((xScale(getStackValue(bar.data)) ?? NaN) - halfBarThickness);
    getY = (bar) => yScale(getSecondItem(bar));
  }

  const barSeries = stackedData
    .map((barStack, stackIndex) => {
      const entry = dataRegistry.get(barStack.key);
      if (!entry) return null;

      // get props from child BarSeries, if available
      const childBarSeries: ReactElement<BaseBarSeriesProps<XScale, YScale, Datum>> | undefined =
        seriesChildren.find((child) => child.props.dataKey === barStack.key);
      const { colorAccessor, radius, radiusAll, radiusBottom, radiusLeft, radiusRight, radiusTop } =
        childBarSeries?.props || {};

      return {
        key: barStack.key,
        radius,
        radiusAll,
        radiusBottom,
        radiusLeft,
        radiusRight,
        radiusTop,
        bars: barStack
          .map((bar, index) => {
            const barX = getX(bar);
            if (!isValidNumber(barX)) return null;
            const barY = getY(bar);
            if (!isValidNumber(barY)) return null;
            const barWidth = getWidth(bar);
            if (!isValidNumber(barWidth)) return null;
            const barHeight = getHeight(bar);
            if (!isValidNumber(barHeight)) return null;

            const barSeriesDatum = colorAccessor ? childBarSeries?.props?.data[index] : null;

            return {
              key: `${stackIndex}-${barStack.key}-${index}`,
              x: barX,
              y: barY,
              width: barWidth,
              height: barHeight,
              fill:
                barSeriesDatum && colorAccessor
                  ? colorAccessor(barSeriesDatum, index)
                  : colorScale(barStack.key),
            };
          })
          .filter((bar) => bar) as Bar[],
      };
    })
    .filter((series) => series);

  return (
    <g className="visx-bar-stack">
      {barSeries.map(
        (series) =>
          series && (
            <BarsComponent
              horizontal={horizontal}
              xScale={xScale}
              yScale={yScale}
              {...series}
              {...eventEmitters}
              key={series.key}
            />
          ),
      )}
    </g>
  );
}

export default BaseBarStack;
