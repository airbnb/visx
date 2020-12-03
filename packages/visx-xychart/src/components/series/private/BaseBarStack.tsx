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
import {
  Bar,
  BarsProps,
  BarStackDatum,
  CombinedStackData,
  DataContextType,
  PointerEventParams,
  SeriesProps,
  TooltipContextType,
} from '../../../types';
import isValidNumber from '../../../typeguards/isValidNumber';
import isChildWithProps from '../../../typeguards/isChildWithProps';
import combineBarBarStackData, { getStackValue } from '../../../utils/combineBarStackData';
import getBarStackRegistryData from '../../../utils/getBarStackRegistryData';
import usePointerEventEmitters from '../../../hooks/usePointerEventEmitters';
import { BARSTACK_EVENT_SOURCE, XYCHART_EVENT_SOURCE } from '../../../constants';
import usePointerEventHandlers from '../../../hooks/usePointerEventHandlers';
import TooltipContext from '../../../context/TooltipContext';

export type BaseBarStackProps<
  XScale extends PositionScale,
  YScale extends PositionScale,
  Datum extends object
> = {
  /** `BarSeries` elements */
  children: JSX.Element | JSX.Element[];
  /** Rendered component which is passed BarsProps by BaseBarStack after processing. */
  BarsComponent: React.FC<BarsProps<XScale, YScale>>;
} & Pick<StackPathConfig<Datum, string>, 'offset' | 'order'> &
  Pick<
    SeriesProps<XScale, YScale, Datum>,
    'onPointerMove' | 'onPointerOut' | 'onPointerUp' | 'pointerEvents'
  >;

function BaseBarStack<
  XScale extends PositionScale,
  YScale extends PositionScale,
  Datum extends object
>({
  children,
  order,
  offset,
  BarsComponent,
  onPointerMove: onPointerMoveProps,
  onPointerOut: onPointerOutProps,
  onPointerUp: onPointerUpProps,
  pointerEvents = true,
}: BaseBarStackProps<XScale, YScale, Datum>) {
  type StackBar = SeriesPoint<CombinedStackData<XScale, YScale>>;
  const {
    colorScale,
    dataRegistry,
    horizontal,
    registerData,
    unregisterData,
    xScale,
    yScale,
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

  const { showTooltip, hideTooltip } = (useContext(TooltipContext) ?? {}) as TooltipContextType<
    Datum
  >;
  const onPointerMove = useCallback(
    (p: PointerEventParams<Datum>) => {
      showTooltip(p);
      if (onPointerMoveProps) onPointerMoveProps(p);
    },
    [showTooltip, onPointerMoveProps],
  );
  const onPointerOut = useCallback(
    (event: React.PointerEvent) => {
      hideTooltip();
      if (onPointerOutProps) onPointerOutProps(event);
    },
    [hideTooltip, onPointerOutProps],
  );
  const ownEventSourceKey = `${BARSTACK_EVENT_SOURCE}-${dataKeys.join('-')}`;
  const pointerEventEmitters = usePointerEventEmitters({
    source: ownEventSourceKey,
    onPointerMove: !!onPointerMoveProps && pointerEvents,
    onPointerOut: !!onPointerOutProps && pointerEvents,
    onPointerUp: !!onPointerUpProps && pointerEvents,
  });
  usePointerEventHandlers({
    dataKey: dataKeys,
    onPointerMove: pointerEvents ? onPointerMove : undefined,
    onPointerOut: pointerEvents ? onPointerOut : undefined,
    onPointerUp: pointerEvents ? onPointerUpProps : undefined,
    sources: [XYCHART_EVENT_SOURCE, ownEventSourceKey],
  });

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
    getWidth = bar => (xScale(getSecondItem(bar)) ?? NaN) - (xScale(getFirstItem(bar)) ?? NaN);
    getHeight = () => barThickness;
    getX = bar => xScale(getFirstItem(bar));
    getY = bar =>
      'bandwidth' in yScale
        ? yScale(getStackValue(bar.data))
        : Math.max((yScale(getStackValue(bar.data)) ?? NaN) - halfBarThickness);
  } else {
    getWidth = () => barThickness;
    getHeight = bar => (yScale(getFirstItem(bar)) ?? NaN) - (yScale(getSecondItem(bar)) ?? NaN);
    getX = bar =>
      'bandwidth' in xScale
        ? xScale(getStackValue(bar.data))
        : Math.max((xScale(getStackValue(bar.data)) ?? NaN) - halfBarThickness);
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
        const barWidth = getWidth(bar);
        if (!isValidNumber(barWidth)) return null;
        const barHeight = getHeight(bar);
        if (!isValidNumber(barHeight)) return null;

        return {
          key: `${stackIndex}-${barStack.key}-${index}`,
          x: barX,
          y: barY,
          width: barWidth,
          height: barHeight,
          fill: colorScale(barStack.key),
        };
      });
    })
    .filter(bar => bar) as Bar[];

  return (
    <g className="visx-bar-stack">
      <BarsComponent
        bars={bars}
        horizontal={horizontal}
        xScale={xScale}
        yScale={yScale}
        {...pointerEventEmitters}
      />
    </g>
  );
}

export default BaseBarStack;
