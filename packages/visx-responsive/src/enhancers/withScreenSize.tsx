import React from 'react';
import { WithSizeProps, WithSizeProvidedProps } from '../hooks/useSize';
import { useScreenSize } from '../hooks/useScreenSize';

export { WithSizeProvidedProps } from '../hooks/useSize';

export default function withScreenSize<BaseComponentProps extends WithSizeProps = {}>(
  BaseComponent: React.ComponentType<BaseComponentProps>,
) {
  return (props: BaseComponentProps & WithSizeProvidedProps) => {
    const [isScreenSize, screenWidth, screenHeight] = useScreenSize(props);
    return isScreenSize ? null : (
      <BaseComponent screenWidth={screenWidth} screenHeight={screenHeight} {...props} />
    );
  };
}
