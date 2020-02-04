import debounce from 'lodash/debounce';
import React from 'react';

export type WithScreenSizeProps = {
  windowResizeDebounceTime?: number;
};

type WithScreenSizeState = {
  screenWidth?: number;
  screenHeight?: number;
};

export type WithScreenSizeProvidedProps = WithScreenSizeState;

export default function withScreenSize<BaseComponentProps extends WithScreenSizeProps = {}>(
  BaseComponent: React.ComponentType<BaseComponentProps>,
) {
  return class WrappedComponent extends React.Component<
    BaseComponentProps & WithScreenSizeProvidedProps,
    WithScreenSizeState
  > {
    static defaultProps = {
      windowResizeDebounceTime: 300,
    };

    handleResize: () => void;

    constructor(props: BaseComponentProps & WithScreenSizeProvidedProps) {
      super(props);
      this.state = {
        screenWidth: undefined,
        screenHeight: undefined,
      };
      this.handleResize = debounce(this.resize, props.windowResizeDebounceTime);
    }

    componentDidMount() {
      window.addEventListener('resize', this.handleResize, false);
      this.resize();
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.handleResize, false);
    }

    resize = (/** event */) => {
      this.setState((/** prevState, props */) => {
        return {
          screenWidth: window.innerWidth,
          screenHeight: window.innerHeight,
        };
      });
    };

    render() {
      const { screenWidth, screenHeight } = this.state;
      if (screenWidth == null || screenHeight == null) return null;
      return (
        <BaseComponent screenWidth={screenWidth} screenHeight={screenHeight} {...this.props} />
      );
    }
  };
}
