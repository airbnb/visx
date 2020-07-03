import React, { FunctionComponent, useContext } from 'react';
import ChartContext from '../context/ChartContext';
import { SeriesProps, LegendShape, FindNearestDatum } from '../types';
import useDataRegistry from '../hooks/useDataRegistry';

/**
 * An HOC that handles registering the Series's data and renders the
 * `BaseSeriesComponent` only if x and y scales are available in context. This is
 * useful for avoiding nasty syntax with undefined scales when using hooks.
 */
export default function withRegisteredData<
  Datum,
  XScaleInput,
  YScaleInput,
  BaseComponentProps extends SeriesProps<Datum, XScaleInput, YScaleInput>
>(
  BaseSeriesComponent: React.ComponentType<BaseComponentProps>,
  {
    findNearestDatum,
    legendShape,
  }: {
    findNearestDatum?: (
      props: BaseComponentProps,
    ) => FindNearestDatum<Datum, XScaleInput, YScaleInput>;
    legendShape?: (props: BaseComponentProps) => LegendShape;
  },
) {
  const WrappedSeriesComponent: FunctionComponent<BaseComponentProps> = props => {
    const { dataKey, data, xAccessor, yAccessor, mouseEvents } = props;
    const { xScale, yScale, dataRegistry } = useContext(ChartContext);

    useDataRegistry({
      key: dataKey,
      data,
      xAccessor,
      yAccessor,
      mouseEvents,
      legendShape: legendShape?.(props),
      findNearestDatum: findNearestDatum?.(props),
    });

    return xScale && yScale && dataRegistry?.[dataKey]?.data === data ? (
      <BaseSeriesComponent {...props} />
    ) : null;
  };

  return WrappedSeriesComponent;
}
