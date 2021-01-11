import React, { useContext, useEffect, useMemo } from 'react';
import { SeriesPoint, stack as d3stack } from 'd3-shape';
import stackOffset from '@visx/shape/lib/util/stackOffset';
import stackOrder from '@visx/shape/lib/util/stackOrder';
import { StackPathConfig } from '@visx/shape';
import { extent } from 'd3-array';
import { AxisScale } from '@visx/axis';
import DataContext from '../context/DataContext';
import { CombinedStackData, DataContextType, SeriesProps } from '../types';
import getBarStackRegistryData from '../utils/getBarStackRegistryData';
import combineBarStackData from '../utils/combineBarStackData';
import isChildWithProps from '../typeguards/isChildWithProps';

type UseStackedData<Datum extends object> = {
  children: JSX.Element | JSX.Element[];
} & Pick<StackPathConfig<Datum, string>, 'offset' | 'order'>;

export default function useStackedData<
  XScale extends AxisScale,
  YScale extends AxisScale,
  Datum extends object,
  ChildrenProps extends SeriesProps<XScale, YScale, Datum>
>({ children, order, offset }: UseStackedData<Datum>) {
  type StackDatum = SeriesPoint<CombinedStackData<XScale, YScale>>;

  const { horizontal, registerData, unregisterData } = (useContext(
    DataContext,
  ) as unknown) as DataContextType<XScale, YScale, StackDatum>;

  // find series children
  const seriesChildren = useMemo(
    () => React.Children.toArray(children).filter(child => isChildWithProps<ChildrenProps>(child)),
    [children],
  ) as React.ReactElement<ChildrenProps>[];

  // extract data keys from child series
  const dataKeys: string[] = useMemo(
    () => seriesChildren.filter(child => child.props.dataKey).map(child => child.props.dataKey),
    [seriesChildren],
  );

  // group all child data by stack value (`x` for vertical, `y` for horizontal)
  // this format is needed by d3Stack
  const combinedData = useMemo(
    () => combineBarStackData<XScale, YScale, Datum>(seriesChildren, horizontal),
    [horizontal, seriesChildren],
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
    seriesChildren,
  ]);

  return { seriesChildren, dataKeys, stackedData };
}
