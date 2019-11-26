import debounce from 'lodash/debounce';
import React from 'react';

export type WithScreenSizeProps = {
  windowResizeDebounceTime?: number;
};

type WithScreenSizeState = {
  screenWidth: number | null;
  screenHeight: number | null;
};

export type WithScreenSizeProvidedProps = WithScreenSizeState;

export default function withScreenSize<Props extends WithScreenSizeProps = {}>(
  BaseComponent: React.ComponentType<Props>,
) {
  return class WrappedComponent extends React.Component<Props, WithScreenSizeState> {
    static defaultProps = {
      windowResizeDebounceTime: 300,
    };
    handleResize: () => void;

    constructor(props: Props) {
      super(props);
      this.state = {
        screenWidth: null,
        screenHeight: null,
      };
      this.handleResize = debounce(this.resize, props.windowResizeDebounceTime);
    }

    componentDidMount() {
      window.addEventListener('resize', this.handleResize, false);
      this.resize();
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.handleResize, false);
      this.resize.cancel();
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
      if (!screenWidth && !screenHeight) return null;
      return (
        <BaseComponent screenWidth={screenWidth} screenHeight={screenHeight} {...this.props} />
      );
    }
  };
}
