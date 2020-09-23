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
 * `BaseSeriesComponent` only if x and y scales are available in context. This is
 * useful for avoiding nasty syntax with undefined scales when using hooks.
 */
export default function withRegisteredData<
  BaseComponentProps extends SeriesProps<XScale, YScale, Datum>,
  XScale extends AxisScale,
  YScale extends AxisScale,
  Datum extends object
>(
  BaseSeriesComponent: React.ComponentType<
    BaseComponentProps & WithRegisteredDataProps<XScale, YScale, Datum>
  >,
) {
  function WrappedSeriesComponent(props: BaseComponentProps) {
    const { dataKey, data, xAccessor, yAccessor } = props;
    const { xScale, yScale, dataRegistry } = useContext(DataContext) as DataContextType<
      XScale,
      YScale,
      Datum
    >;

    useEffect(() => {
      if (dataRegistry) dataRegistry.registerData({ key: dataKey, data, xAccessor, yAccessor });
      return () => dataRegistry.unregisterData(dataKey);
      // @TODO: make accessors defined inline for a component *not* trigger effect
    }, [dataRegistry, dataKey, data, xAccessor, yAccessor]);

    const registryEntry = dataRegistry?.get(dataKey);

    // if scales or data are not available in context, render nothing
    if (!xScale || !yScale || !registryEntry) return null;

    // otherwise pass props + over-write data
    return (
      <BaseSeriesComponent
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
