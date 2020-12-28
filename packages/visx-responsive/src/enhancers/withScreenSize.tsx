import React from 'react';
import { useScreenSize, WithSizeProps, WithSizeProvidedProps } from '../hooks/useScreenSize';

export { WithSizeProvidedProps } from '../hooks/useScreenSize';

export default function withScreenSize<BaseComponentProps extends WithSizeProps = {}>(
  BaseComponent: React.ComponentType<BaseComponentProps>,
) {
  return (props: BaseComponentProps & WithSizeProvidedProps) => {
    const [screenWidth, screenHight] = useScreenSize(props);
    return <BaseComponent screenWidth={screenWidth} screenHeight={screenHight} {...props} />;
  };
}
