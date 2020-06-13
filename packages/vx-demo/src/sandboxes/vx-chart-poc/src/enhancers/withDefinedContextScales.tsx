import React, { useContext } from 'react';
import ChartContext from '../context/ChartContext';

/**
 * An HOC that renders the `BaseComponent` only if x and y scales are available in context.
 * This is useful for avoiding nasty syntax with undefined scales when using hooks.
 */
export default function withDefinedContextScales<BaseComponentProps>(
  BaseComponent: React.ComponentType<BaseComponentProps>,
) {
  const WrappedSeriesComponent: React.FunctionComponent<BaseComponentProps> = props => {
    const { xScale, yScale } = useContext(ChartContext);

    return xScale && yScale ? <BaseComponent {...props} /> : null;
  };

  return WrappedSeriesComponent;
}
