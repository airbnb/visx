import React, { useRef } from 'react';
import { WithSizeProps, WithSizeProvidedProps } from '../hooks/useSize';
import { useParentSize } from '../hooks/useParentSize';

const CONTAINER_STYLES = { width: '100%', height: '100%' };


export default function withParentSize<BaseComponentProps extends WithSizeProps = {}>(
  BaseComponent: React.ComponentType<BaseComponentProps & WithSizeProvidedProps>,
) {
  return (props: BaseComponentProps & WithSizeProvidedProps) => {
    const divRef = useRef(null);
    const [isParentSize, parentWidth, parentHeight] = useParentSize(props, divRef);
    return (
      <div style={CONTAINER_STYLES} ref={divRef}>
        {isParentSize && (
          <BaseComponent parentWidth={parentWidth} parentHeight={parentHeight} {...props} />
        )}
      </div>
    );
  };
}
