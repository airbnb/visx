import React from 'react';
import debounce from 'lodash/debounce';

export default function withScreenSize(BaseComponent) {
  class WrappedComponent extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        screenWidth: null,
        screenHeight: null
      };

      this.handleResize = debounce(this.resize.bind(this), props.windowResizeDebounceTime).bind(
        this
      );
    }

    componentDidMount() {
      window.addEventListener('resize', this.handleResize, false);
      this.resize();
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.handleResize, false);
    }

    resize(event) {
      this.setState((prevState, props) => {
        return {
          screenWidth: window.innerWidth,
          screenHeight: window.innerHeight
        };
      });
    }

    render() {
      const { screenWidth, screenHeight } = this.state;
      if (!screenWidth && !screenHeight) return null;
      return (
        <BaseComponent screenWidth={screenWidth} screenHeight={screenHeight} {...this.props} />
      );
    }
  }

  WrappedComponent.defaultProps = {
    windowResizeDebounceTime: 300
  };

  return WrappedComponent;
}
