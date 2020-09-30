import React, { useContext, useEffect } from 'react';
import { AxisScale } from '@visx/axis';
import DataContext from '../context/DataContext';
import { DataContextType, SeriesProps } from '../types';

export type WithRegisteredDataProps<
  XScale extends AxisScale,
  YScale extends AxisScale,
  Datum extends object
> = Pick<DataContextType<XScale, YScale, Datum>, 'xScale' | 'yScale'>;

/**
 * An HOC that handles registering the Series's data and renders the
 * `BaseSeriesComponent`
 * - only if x and y scales are available in context, and
 * - overrides `props.data/xAccessor/yAccessor` with the values from context.
 * This is useful for avoiding nasty syntax with undefined scales when using
 * hooks, and ensures that data + scales are always matched in the case of
 * prop changes, etc.
 */
export default function withRegisteredData<
  BaseComponentProps extends SeriesProps<AxisScale, AxisScale, object>
>(BaseSeriesComponent: React.ComponentType<BaseComponentProps>) {
  function WrappedSeriesComponent<X extends AxisScale, Y extends AxisScale, D extends object>(
    props: BP,
  ) {
    const { dataKey, data, xAccessor, yAccessor } = props;
    const { xScale, yScale, dataRegistry } = useContext(DataContext) as DataContextType<X, Y, D>;

    useEffect(() => {
      if (dataRegistry) dataRegistry.registerData({ key: dataKey, data, xAccessor, yAccessor });
      return () => dataRegistry?.unregisterData(dataKey);
    }, [dataRegistry, dataKey, data, xAccessor, yAccessor]);

    const registryEntry = dataRegistry?.get(dataKey);

    // if scales or data are not available in context, render nothing
    if (!xScale || !yScale || !registryEntry) return null;

    const BaseComponent = (BaseSeriesComponent as unknown) as React.ComponentType<
      SeriesProps<X, Y, D> & WithRegisteredDataProps<X, Y, D>
    >;

    // otherwise pass props + over-write data/accessors
    return (
      <BaseComponent
        {...props}
        xScale={xScale}
        yScale={yScale}
        data={registryEntry.data}
        xAccessor={registryEntry.xAccessor}
        yAccessor={registryEntry.yAccessor}
      />
    );
  }

  return WrappedSeriesComponent;
}
