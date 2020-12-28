import React from 'react';
import { useScreenSize } from '../hooks/useScreenSize';
import { WithSizeProps, WithSizeProvidedProps } from '../types';

export default function withScreenSize<BaseComponentProps extends WithSizeProps = {}>(
  BaseComponent: React.ComponentType<BaseComponentProps>,
) {
  return (props: BaseComponentProps & WithSizeProvidedProps) => {
    const [screenWidth, screenHight] = useScreenSize(props);
    return <BaseComponent screenWidth={screenWidth} screenHeight={screenHight} {...props} />;
  };
}
