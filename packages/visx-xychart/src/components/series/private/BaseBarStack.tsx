import React, { useContext, useCallback, useMemo, useEffect } from 'react';
import { SeriesPoint, stack as d3stack } from 'd3-shape';
import { PositionScale, StackPathConfig } from '@visx/shape/lib/types';
import { getFirstItem, getSecondItem } from '@visx/shape/lib/util/accessors';
import stackOffset from '@visx/shape/lib/util/stackOffset';
import stackOrder from '@visx/shape/lib/util/stackOrder';

import { extent } from 'd3-array';
import getBandwidth from '@visx/shape/lib/util/getBandwidth';
import { BaseBarSeriesProps } from './BaseBarSeries';
import DataContext from '../../../context/DataContext';
import { Bar, BarsProps, BarStackDatum, CombinedStackData, DataContextType } from '../../../types';
import TooltipContext from '../../../context/TooltipContext';
import useEventEmitter, { HandlerParams } from '../../../hooks/useEventEmitter';
import isValidNumber from '../../../typeguards/isValidNumber';
import isChildWithProps from '../../../typeguards/isChildWithProps';
import combineBarBarStackData, { getStackValue } from '../../../utils/combineBarStackData';
import getBarStackRegistryData from '../../../utils/getBarStackRegistryData';
import findNearestStackDatum from '../../../utils/findNearestStackDatum';

export type BaseBarStackProps<
  XScale extends PositionScale,
  YScale extends PositionScale,
  Datum extends object
> = {
  /** Whether to render the Stack horizontally instead of vertically. */
  horizontal?: boolean;
  /** `BarSeries` elements */
  children: JSX.Element | JSX.Element[];
  /** Rendered component which is passed BarsProps by BaseBarStack after processing. */
  BarsComponent: React.FC<BarsProps<XScale, YScale>>;
} & Pick<StackPathConfig<Datum, string>, 'offset' | 'order'>;

function BaseBarStack<
  XScale extends PositionScale,
  YScale extends PositionScale,
  Datum extends object
>({
  children,
  horizontal,
  order,
  offset,
  BarsComponent,
}: BaseBarStackProps<XScale, YScale, Datum>) {
  type StackBar = SeriesPoint<CombinedStackData<XScale, YScale>>;
  const {
    xScale,
    yScale,
    colorScale,
    dataRegistry,
    registerData,
    unregisterData,
    width,
    height,
  } = (useContext(DataContext) as unknown) as DataContextType<
    XScale,
    YScale,
    BarStackDatum<XScale, YScale>
  >;

  const barSeriesChildren = useMemo(
    () =>
      React.Children.toArray(children).filter(child =>
        isChildWithProps<BaseBarSeriesProps<XScale, YScale, Datum>>(child),
      ),
    [children],
  ) as React.ReactElement<BaseBarSeriesProps<XScale, YScale, Datum>>[];

  // extract data keys from child series
  const dataKeys: string[] = useMemo(
    () => barSeriesChildren.filter(child => child.props.dataKey).map(child => child.props.dataKey),
    [barSeriesChildren],
  );

  // group all child data by stack value (`x` for vertical, `y` for horizontal)
  // this format is needed by d3Stack
  const combinedData = useMemo(
    () => combineBarBarStackData<XScale, YScale, Datum>(barSeriesChildren, horizontal),
    [horizontal, barSeriesChildren],
  );

  // update the domain to account for the (directional) stacked value
  const comprehensiveDomain = useMemo(
    () =>
      extent(
        (extent(combinedData, d => d.positiveSum) as [number, number]).concat(
          extent(combinedData, d => d.negativeSum) as [number, number],
        ),
      ) as [number, number],
    [combinedData],
  );

  // stack data
  const stackedData = useMemo(() => {
    const hasSomeNegativeValues =
      comprehensiveDomain.length > 0 && comprehensiveDomain.some(num => num < 0);

    const stack = d3stack<CombinedStackData<XScale, YScale>, string>();
    stack.keys(dataKeys);
    if (order) stack.order(stackOrder(order));
    if (offset || hasSomeNegativeValues) stack.offset(stackOffset(offset || 'diverging'));

    return stack(combinedData);
  }, [combinedData, dataKeys, comprehensiveDomain, order, offset]);

  // register all child data using the stack-transformed values
  useEffect(() => {
    const dataToRegister = getBarStackRegistryData(stackedData, comprehensiveDomain, horizontal);
    registerData(dataToRegister);

    // unregister data on unmount
    return () => unregisterData(dataKeys);
  }, [
    dataKeys,
    comprehensiveDomain,
    horizontal,
    stackedData,
    registerData,
    unregisterData,
    barSeriesChildren,
  ]);

  // register mouse listeners
  const { showTooltip, hideTooltip } = useContext(TooltipContext) ?? {};

  const handleMouseMove = useCallback(
    (params: HandlerParams | undefined) => {
      const { svgPoint } = params || {};

      // invoke showTooltip for each key so all data is available in context,
      // and let Tooltip find the nearest point among them
      dataKeys.forEach(key => {
        const entry = dataRegistry.get(key);
        const childData = barSeriesChildren.find(child => child.props.dataKey === key)?.props.data;
        if (childData && svgPoint && width && height && showTooltip) {
          const datum = findNearestStackDatum(
            {
              point: svgPoint,
              data: entry.data,
              xScale,
              yScale,
              xAccessor: entry.xAccessor,
              yAccessor: entry.yAccessor,
              width,
              height,
            },
            childData,
            horizontal,
          );

          if (datum) {
            showTooltip({
              key,
              svgPoint,
              ...datum,
            });
          }
        }
      });
    },
    [
      barSeriesChildren,
      dataRegistry,
      dataKeys,
      horizontal,
      xScale,
      yScale,
      width,
      height,
      showTooltip,
    ],
  );
  useEventEmitter('mousemove', handleMouseMove);
  useEventEmitter('mouseout', hideTooltip);

  // if scales and data are not available in the registry, bail
  if (dataKeys.some(key => dataRegistry.get(key) == null) || !xScale || !yScale || !colorScale) {
    return null;
  }

  const barThickness = getBandwidth(horizontal ? yScale : xScale);
  const halfBarThickness = barThickness / 2;

  let getWidth: (bar: StackBar) => number | undefined;
  let getHeight: (bar: StackBar) => number | undefined;
  let getX: (bar: StackBar) => number | undefined;
  let getY: (bar: StackBar) => number | undefined;

  if (horizontal) {
    getWidth = bar => (xScale(getSecondItem(bar)) || 0) - (xScale(getFirstItem(bar)) || 0);
    getHeight = () => barThickness;
    getX = bar => xScale(getFirstItem(bar));
    getY = bar =>
      'bandwidth' in yScale
        ? yScale(getStackValue(bar.data))
        : Math.max((yScale(getStackValue(bar.data)) || 0) - halfBarThickness);
  } else {
    getWidth = () => barThickness;
    getHeight = bar => (yScale(getFirstItem(bar)) || 0) - (yScale(getSecondItem(bar)) || 0);
    getX = bar =>
      'bandwidth' in xScale
        ? xScale(getStackValue(bar.data))
        : Math.max((xScale(getStackValue(bar.data)) || 0) - halfBarThickness);
    getY = bar => yScale(getSecondItem(bar));
  }

  const bars = stackedData
    .flatMap((barStack, stackIndex) => {
      const entry = dataRegistry.get(barStack.key);
      if (!entry) return null;

      return barStack.map((bar, index) => {
        const barX = getX(bar);
        if (!isValidNumber(barX)) return null;
        const barY = getY(bar);
        if (!isValidNumber(barY)) return null;

        return {
          key: `${stackIndex}-${barStack.key}-${index}`,
          x: barX,
          y: barY,
          width: getWidth(bar),
          height: getHeight(bar),
          fill: colorScale(barStack.key),
        };
      });
    })
    .filter(bar => bar) as Bar[];

  return (
    <g className="visx-bar-stack">
      <BarsComponent bars={bars} horizontal={horizontal} xScale={xScale} yScale={yScale} />
    </g>
  );
}

export default BaseBarStack;
