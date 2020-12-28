import React from 'react';
import useMeasure from 'react-use-measure';
import { ResizeObserver } from '@juggle/resize-observer';
import { WithSizeProps, WithSizeProvidedProps } from '../types';

const CONTAINER_STYLES = { width: '100%', height: '100%' };

export default function withParentSize<BaseComponentProps extends WithSizeProps = {}>(
  BaseComponent: React.ComponentType<BaseComponentProps & WithSizeProvidedProps>,
) {
  return (props: BaseComponentProps & WithSizeProvidedProps) => {
    const [ref, bounds] = useMeasure({ scroll: true, polyfill: ResizeObserver });
    return (
      <div style={CONTAINER_STYLES} ref={ref}>
        <BaseComponent parentWidth={bounds.width} parentHeight={bounds.height} {...props} />
      </div>
    );
  };
}
