// @ts-ignore ts-migrate(1259) FIXME: Module '"/Users/sergii_rudenko/Projects/vx/node_mo... Remove this comment to see the full error message
import debounce from 'lodash/debounce';
// @ts-ignore ts-migrate(1259) FIXME: Module '"/Users/sergii_rudenko/Projects/vx/node_mo... Remove this comment to see the full error message
import React from 'react';
// @ts-ignore ts-migrate(1192) FIXME: Module '"/Users/sergii_rudenko/Projects/vx/node_mo... Remove this comment to see the full error message
import PropTypes from 'prop-types';

export default function withScreenSize(BaseComponent) {
  class WrappedComponent extends React.Component {
    constructor(props) {
      super(props);

      // @ts-ignore ts-migrate(2339) FIXME: Property 'state' does not exist on type 'WrappedCo... Remove this comment to see the full error message
      this.state = {
        screenWidth: null,
        screenHeight: null,
      };

      // @ts-ignore ts-migrate(2339) FIXME: Property 'handleResize' does not exist on type 'Wr... Remove this comment to see the full error message
      this.handleResize = debounce(this.resize.bind(this), props.windowResizeDebounceTime).bind(
        this,
      );
    }

    componentDidMount() {
      // @ts-ignore ts-migrate(2339) FIXME: Property 'handleResize' does not exist on type 'Wr... Remove this comment to see the full error message
      window.addEventListener('resize', this.handleResize, false);
      this.resize();
    }

    componentWillUnmount() {
      // @ts-ignore ts-migrate(2339) FIXME: Property 'handleResize' does not exist on type 'Wr... Remove this comment to see the full error message
      window.removeEventListener('resize', this.handleResize, false);
    }

    resize(/** event */) {
      // @ts-ignore ts-migrate(2339) FIXME: Property 'setState' does not exist on type 'Wrappe... Remove this comment to see the full error message
      this.setState((/** prevState, props */) => {
        return {
          screenWidth: window.innerWidth,
          screenHeight: window.innerHeight,
        };
      });
    }

    render() {
      // @ts-ignore ts-migrate(2339) FIXME: Property 'state' does not exist on type 'WrappedCo... Remove this comment to see the full error message
      const { screenWidth, screenHeight } = this.state;
      if (!screenWidth && !screenHeight) return null;
      return (
        // @ts-ignore ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <BaseComponent screenWidth={screenWidth} screenHeight={screenHeight} {...this.props} />
      );
    }
  }

  // @ts-ignore ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
  WrappedComponent.propTypes = {
    windowResizeDebounceTime: PropTypes.number,
  };

  // @ts-ignore ts-migrate(2339) FIXME: Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
  WrappedComponent.defaultProps = {
    windowResizeDebounceTime: 300,
  };

  return WrappedComponent;
}
