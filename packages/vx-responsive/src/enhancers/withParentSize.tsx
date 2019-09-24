import React from 'react';
import debounce from 'lodash/debounce';
import ResizeObserver from 'resize-observer-polyfill';

type WithParentSizeProps = {
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
    ro: ResizeObserver | undefined;
    container: HTMLDivElement | null = null;
    debouncedResize: ({ width, height }: { width: number; height: number }) => void;

    constructor(props: Props) {
      super(props);
      this.state = {
        parentWidth: null,
        parentHeight: null,
      };

      this.animationFrameID = null;
      this.debouncedResize = debounce(this.resize.bind(this), props.debounceTime).bind(this);
    }

    componentDidMount() {
      this.ro = new ResizeObserver((entries /** , observer */) => {
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
      this.container && this.ro.observe(this.container);
    }

    componentWillUnmount() {
      this.animationFrameID && window.cancelAnimationFrame(this.animationFrameID);
      this.ro && this.ro.disconnect();
    }

    resize({ width, height }: { width: number; height: number }) {
      this.setState({
        parentWidth: width,
        parentHeight: height,
      });
    }

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
