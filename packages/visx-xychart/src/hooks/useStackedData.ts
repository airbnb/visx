import { useContext, useEffect, useMemo } from 'react';
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
import getChildrenAndGrandchildrenWithProps from '../utils/getChildrenAndGrandchildrenWithProps';

type UseStackedData<Datum extends object> = {
  children: JSX.Element | JSX.Element[];
} & Pick<StackPathConfig<Datum, string>, 'offset' | 'order'>;

export default function useStackedData<
  XScale extends AxisScale,
  YScale extends AxisScale,
  Datum extends object,
  ChildrenProps extends SeriesProps<XScale, YScale, Datum>,
>({ children, order, offset }: UseStackedData<Datum>) {
  type StackDatum = SeriesPoint<CombinedStackData<XScale, YScale>>;

  const { horizontal, registerData, unregisterData } = useContext(
    DataContext,
  ) as unknown as DataContextType<XScale, YScale, StackDatum>;

  // find series children
  // @TODO: memoization doesn't work well if at all for this
  const seriesChildren = useMemo(
    () => getChildrenAndGrandchildrenWithProps<ChildrenProps>(children),
    [children],
  );

  // extract data keys from child series
  const dataKeys: string[] = useMemo(
    () => seriesChildren.filter((child) => child.props.dataKey).map((child) => child.props.dataKey),
    [seriesChildren],
  );

  // group all child data by stack value { [x | y]: { [dataKey]: value } }
  // this format is needed by d3Stack
  const combinedData = useMemo(
    () => combineBarStackData<XScale, YScale, Datum>(seriesChildren, horizontal),
    [horizontal, seriesChildren],
  );

  // stack data
  const stackedData = useMemo(() => {
    // automatically set offset to diverging if it's undefined and negative values are present
    const hasSomeNegativeValues = offset ? null : combinedData.some((d) => d.negativeSum < 0);

    const stack = d3stack<CombinedStackData<XScale, YScale>, string>();
    stack.keys(dataKeys);
    if (order) stack.order(stackOrder(order));
    if (offset || hasSomeNegativeValues) stack.offset(stackOffset(offset || 'diverging'));

    return stack(combinedData);
  }, [combinedData, dataKeys, order, offset]);

  // update the domain to account for the (directional) stacked value
  const comprehensiveDomain = useMemo(
    () =>
      extent(
        stackedData.reduce((allDatum: number[], stack) => {
          stack.forEach(([min, max]) => {
            allDatum.push(min);
            allDatum.push(max);
          });
          return allDatum;
        }, []),
      ) as [number, number],
    [stackedData],
  );

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
