import React from 'react';
import debounce from 'lodash/debounce';
import ResizeObserver from 'resize-observer-polyfill';

const CONTAINER_STYLES = { width: '100%', height: '100%' };

export type WithParentSizeProps = {
  debounceTime?: number;
};

type WithParentSizeState = {
  parentWidth?: number;
  parentHeight?: number;
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
    };
    animationFrameID: number | null;
    resizeObserver: ResizeObserver | undefined;
    container: HTMLDivElement | null = null;
    debouncedResize: ({ width, height }: { width: number; height: number }) => void;

    constructor(props: BaseComponentProps & WithParentSizeProvidedProps) {
      super(props);
      this.state = {
        parentWidth: undefined,
        parentHeight: undefined,
      };
      this.animationFrameID = null;
      this.debouncedResize = debounce(this.resize, props.debounceTime);
    }

    componentDidMount() {
      this.resizeObserver = new ResizeObserver((entries /** , observer */) => {
        entries.forEach(entry => {
          const { width, height } = entry.contentRect;
          this.animationFrameID = window.requestAnimationFrame(() => {
            this.debouncedResize({
              width,
              height,
            });
          });
        });
      });
      if (this.container) this.resizeObserver.observe(this.container);
    }

    componentWillUnmount() {
      if (this.animationFrameID) window.cancelAnimationFrame(this.animationFrameID);
      if (this.resizeObserver) this.resizeObserver.disconnect();
      this.debouncedResize.cancel();
    }

    setRef = (ref: HTMLDivElement) => {
      this.container = ref;
    };

    resize = ({ width, height }: { width: number; height: number }) => {
      this.setState({
        parentWidth: width,
        parentHeight: height,
      });
    };

    render() {
      const { parentWidth, parentHeight } = this.state;
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
