import React from 'react';
import debounce from 'lodash/debounce';
import ResizeObserver from 'resize-observer-polyfill';

const CONTAINER_STYLES = { width: '100%', height: '100%' };

export type WithParentSizeProps = {
  debounceTime?: number;
  enableDebounceLeadingCall?: boolean;
};

type WithParentSizeState = {
  parentWidth?: number;
  parentHeight?: number;
  initialWidth?: number;
  initialHeight?: number;
};

export type WithParentSizeProvidedProps = WithParentSizeState;

export default function withParentSize<BaseComponentProps extends WithParentSizeProps = {}>(
  BaseComponent: React.ComponentType<BaseComponentProps & WithParentSizeProvidedProps>,
) {
  return class WrappedComponent extends React.Component<
    BaseComponentProps & WithParentSizeProvidedProps,
    WithParentSizeState
  > {
    static defaultProps = {
      debounceTime: 300,
      enableDebounceLeadingCall: true,
    };
    state = {
      parentWidth: undefined,
      parentHeight: undefined,
    };
    animationFrameID: number = 0;
    resizeObserver: ResizeObserver | undefined;
    container: HTMLDivElement | null = null;

    componentDidMount() {
      this.resizeObserver = new ResizeObserver((entries /** , observer */) => {
        entries.forEach((entry) => {
          const { width, height } = entry.contentRect;
          this.animationFrameID = window.requestAnimationFrame(() => {
            this.resize({
              width,
              height,
            });
          });
        });
      });
      if (this.container) this.resizeObserver.observe(this.container);
    }

    componentWillUnmount() {
      window.cancelAnimationFrame(this.animationFrameID);
      if (this.resizeObserver) this.resizeObserver.disconnect();
      this.resize.cancel();
    }

    setRef = (ref: HTMLDivElement) => {
      this.container = ref;
    };

    resize = debounce(
      ({ width, height }: { width: number; height: number }) => {
        this.setState({
          parentWidth: width,
          parentHeight: height,
        });
      },
      this.props.debounceTime,
      { leading: this.props.enableDebounceLeadingCall },
    );

    render() {
      const { initialWidth, initialHeight } = this.props;
      const { parentWidth = initialWidth, parentHeight = initialHeight } = this.state;
      return (
        <div style={CONTAINER_STYLES} ref={this.setRef}>
          {parentWidth != null && parentHeight != null && (
            <BaseComponent parentWidth={parentWidth} parentHeight={parentHeight} {...this.props} />
          )}
        </div>
      );
    }
  };
}
