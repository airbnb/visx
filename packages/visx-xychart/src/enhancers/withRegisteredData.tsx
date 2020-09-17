import React, { useContext, useEffect } from 'react';
import { AxisScale } from '@visx/axis';
import DataContext from '../context/DataContext';
import { SeriesProps } from '../types';

/**
 * An HOC that handles registering the Series's data and renders the
 * `BaseSeriesComponent` only if x and y scales are available in context. This is
 * useful for avoiding nasty syntax with undefined scales when using hooks.
 */
export default function withRegisteredData<
  BaseComponentProps extends SeriesProps<XScale, YScale, Datum>,
  XScale extends AxisScale,
  YScale extends AxisScale,
  Datum
>(BaseSeriesComponent: React.ComponentType<BaseComponentProps>) {
  function WrappedSeriesComponent(props: BaseComponentProps) {
    const { dataKey, data, xAccessor, yAccessor } = props;
    const { xScale, yScale, dataRegistry } = useContext(DataContext);

    useEffect(() => {
      if (dataRegistry) dataRegistry.registerData({ key: dataKey, data, xAccessor, yAccessor });
      return () => dataRegistry?.unregisterData(dataKey);
      // @TODO: make accessors defined inline *not* trigger effect
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
