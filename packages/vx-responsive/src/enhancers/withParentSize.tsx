import React from 'react';
import debounce from 'lodash/debounce';
import ResizeObserver from 'resize-observer-polyfill';

export type WithParentSizeProps = {
  debounceTime?: number;
};

type WithParentSizeState = {
  parentWidth: number | null;
  parentHeight: number | null;
};

export default function withParentSize<Props extends WithParentSizeProps = {}>(
  BaseComponent: React.ComponentType<Props>,
) {
  return class WrappedComponent extends React.Component<Props, WithParentSizeState> {
    static defaultProps = {
      debounceTime: 300,
    };
    animationFrameID: number | null;
    resizeObserver: ResizeObserver | undefined;
    container: HTMLDivElement | null = null;
    debouncedResize: ({ width, height }: { width: number; height: number }) => void;

    constructor(props: Props) {
      super(props);
      this.state = {
        parentWidth: null,
        parentHeight: null,
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
    }

    resize = ({ width, height }: { width: number; height: number }) => {
      this.setState({
        parentWidth: width,
        parentHeight: height,
      });
    };

    render() {
      const { parentWidth, parentHeight } = this.state;
      return (
        <div
          style={{ width: '100%', height: '100%' }}
          ref={ref => {
            this.container = ref;
          }}
        >
          {parentWidth !== null && parentHeight !== null && (
            <BaseComponent parentWidth={parentWidth} parentHeight={parentHeight} {...this.props} />
          )}
        </div>
      );
    }
  };
}
export { WithParentSizeState as WithParentSizeProvidedProps };
