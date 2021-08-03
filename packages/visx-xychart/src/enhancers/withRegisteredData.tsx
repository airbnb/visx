import React, { useContext, useEffect } from 'react';
import { AxisScale } from '@visx/axis';
import DataContext from '../context/DataContext';
import { DataContextType, SeriesProps } from '../types';

export type WithRegisteredDataProps<
  XScale extends AxisScale,
  YScale extends AxisScale,
  Datum extends object,
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
  BaseComponentProps extends SeriesProps<XScale, YScale, Datum>,
  XScale extends AxisScale,
  YScale extends AxisScale,
  Datum extends object,
>(BaseSeriesComponent: React.ComponentType<BaseComponentProps>) {
  function WrappedComponent<
    XScale extends AxisScale,
    YScale extends AxisScale,
    Datum extends object,
  >(
    // WrappedComponent props include SeriesProps with appropriate generics
    // and any props in BaseComponentProps that are not in WithRegisteredDataProps
    props: SeriesProps<XScale, YScale, Datum> &
      Omit<
        BaseComponentProps,
        | keyof SeriesProps<XScale, YScale, Datum>
        | keyof WithRegisteredDataProps<XScale, YScale, Datum>
      >,
  ) {
    const { dataKey, data, xAccessor, yAccessor } = props;
    const { xScale, yScale, dataRegistry } = useContext(DataContext) as unknown as DataContextType<
      XScale,
      YScale,
      Datum
    >;

    useEffect(() => {
      if (dataRegistry) dataRegistry.registerData({ key: dataKey, data, xAccessor, yAccessor });
      return () => dataRegistry?.unregisterData(dataKey);
    }, [dataRegistry, dataKey, data, xAccessor, yAccessor]);

    const registryEntry = dataRegistry?.get(dataKey);

    // if scales or data are not available in context, render nothing
    if (!xScale || !yScale || !registryEntry) return null;

    // TODO coercion might be avoidable with variadic tuples in TS 4
    const BaseComponent = BaseSeriesComponent as unknown as React.ComponentType<
      SeriesProps<XScale, YScale, Datum> & WithRegisteredDataProps<XScale, YScale, Datum>
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

  return WrappedComponent;
}
