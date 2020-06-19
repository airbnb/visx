import debounce from 'lodash/debounce';
import React from 'react';

export type WithScreenSizeProps = {
  windowResizeDebounceTime?: number;
  enableDebounceLeadingCall?: boolean;
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
      enableDebounceLeadingCall: true,
    };

    state = {
      screenWidth: undefined,
      screenHeight: undefined,
    };

    componentDidMount() {
      window.addEventListener('resize', this.resize, false);
      this.resize();
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.resize, false);
      this.resize.cancel();
    }

    resize = debounce(
      () => {
        this.setState((/** prevState, props */) => {
          return {
            screenWidth: window.innerWidth,
            screenHeight: window.innerHeight,
          };
        });
      },
      this.props.windowResizeDebounceTime,
      { leading: this.props.enableDebounceLeadingCall },
    );

    render() {
      const { screenWidth, screenHeight } = this.state;
      return screenWidth == null || screenHeight == null ? null : (
        <BaseComponent screenWidth={screenWidth} screenHeight={screenHeight} {...this.props} />
      );
    }
  };
}
