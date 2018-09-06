import React from 'react';
import debounce from 'lodash/debounce';
import ResizeObserver from 'resize-observer-polyfill';

export default function withParentSize(BaseComponent) {
  class WrappedComponent extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        parentWidth: null,
        parentHeight: null
      };

      this.animationFrameID = null;
      this.debouncedResize = debounce(this.resize.bind(this), props.debounceTime).bind(this);
    }

    componentDidMount() {
      this.ro = new ResizeObserver((entries, observer) => {
        entries.forEach(entry => {
          const { width, height } = entry.contentRect;
          this.animationFrameID = window.requestAnimationFrame(() => {
            this.debouncedResize({
              width,
              height
            });
          });
        });
      });
      this.ro.observe(this.container);
    }

    componentWillUnmount() {
      window.cancelAnimationFrame(this.animationFrameID);
      this.ro.disconnect();
    }

    resize({ width, height }) {
      this.setState({
        parentWidth: width,
        parentHeight: height
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
          {parentWidth !== null &&
            parentHeight !== null && (
              <BaseComponent
                parentWidth={parentWidth}
                parentHeight={parentHeight}
                {...this.props}
              />
            )}
        </div>
      );
    }
  }

  WrappedComponent.defaultProps = {
    debounceTime: 300
  };

  return WrappedComponent;
}
