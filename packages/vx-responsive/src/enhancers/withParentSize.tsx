// @ts-ignore ts-migrate(1259) FIXME: Module '"/Users/sergii_rudenko/Projects/vx/node_mo... Remove this comment to see the full error message
import React from 'react';
// @ts-ignore ts-migrate(1192) FIXME: Module '"/Users/sergii_rudenko/Projects/vx/node_mo... Remove this comment to see the full error message
import PropTypes from 'prop-types';
// @ts-ignore ts-migrate(1259) FIXME: Module '"/Users/sergii_rudenko/Projects/vx/node_mo... Remove this comment to see the full error message
import debounce from 'lodash/debounce';
import ResizeObserver from 'resize-observer-polyfill';

export default function withParentSize(BaseComponent) {
  class WrappedComponent extends React.Component {
    constructor(props) {
      super(props);

      // @ts-ignore ts-migrate(2339) FIXME: Property 'state' does not exist on type 'WrappedCo... Remove this comment to see the full error message
      this.state = {
        parentWidth: null,
        parentHeight: null,
      };

      // @ts-ignore ts-migrate(2339) FIXME: Property 'animationFrameID' does not exist on type... Remove this comment to see the full error message
      this.animationFrameID = null;
      // @ts-ignore ts-migrate(2339) FIXME: Property 'debouncedResize' does not exist on type ... Remove this comment to see the full error message
      this.debouncedResize = debounce(this.resize.bind(this), props.debounceTime).bind(this);
    }

    componentDidMount() {
      // @ts-ignore ts-migrate(2339) FIXME: Property 'ro' does not exist on type 'WrappedCompo... Remove this comment to see the full error message
      this.ro = new ResizeObserver((entries /** , observer */) => {
        entries.forEach(entry => {
          const { width, height } = entry.contentRect;
          // @ts-ignore ts-migrate(2339) FIXME: Property 'animationFrameID' does not exist on type... Remove this comment to see the full error message
          this.animationFrameID = window.requestAnimationFrame(() => {
            // @ts-ignore ts-migrate(2339) FIXME: Property 'debouncedResize' does not exist on type ... Remove this comment to see the full error message
            this.debouncedResize({
              width,
              height,
            });
          });
        });
      });
      // @ts-ignore ts-migrate(2339) FIXME: Property 'ro' does not exist on type 'WrappedCompo... Remove this comment to see the full error message
      this.ro.observe(this.container);
    }

    componentWillUnmount() {
      // @ts-ignore ts-migrate(2339) FIXME: Property 'animationFrameID' does not exist on type... Remove this comment to see the full error message
      window.cancelAnimationFrame(this.animationFrameID);
      // @ts-ignore ts-migrate(2339) FIXME: Property 'ro' does not exist on type 'WrappedCompo... Remove this comment to see the full error message
      this.ro.disconnect();
    }

    resize({ width, height }) {
      // @ts-ignore ts-migrate(2339) FIXME: Property 'setState' does not exist on type 'Wrappe... Remove this comment to see the full error message
      this.setState({
        parentWidth: width,
        parentHeight: height,
      });
    }

    render() {
      // @ts-ignore ts-migrate(2339) FIXME: Property 'state' does not exist on type 'WrappedCo... Remove this comment to see the full error message
      const { parentWidth, parentHeight } = this.state;
      return (
        // @ts-ignore ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div
          style={{ width: '100%', height: '100%' }}
          ref={ref => {
            // @ts-ignore ts-migrate(2339) FIXME: Property 'container' does not exist on type 'Wrapp... Remove this comment to see the full error message
            this.container = ref;
          }}
        >
          {parentWidth !== null && parentHeight !== null && (
            // @ts-ignore ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <BaseComponent parentWidth={parentWidth} parentHeight={parentHeight} {...this.props} />
          )}
        </div>
      );
    }
  }

  // @ts-ignore ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
  WrappedComponent.propTypes = {
    debounceTime: PropTypes.number,
  };

  // @ts-ignore ts-migrate(2339) FIXME: Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
  WrappedComponent.defaultProps = {
    debounceTime: 300,
  };

  return WrappedComponent;
}
