/* eslint react/no-did-mount-set-state: 0, react/no-find-dom-node: 0 */
import React from 'react';
// @ts-ignore ts-migrate(7016) FIXME: Try `npm install @types/react-dom` if it exists or... Remove this comment to see the full error message
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const emptyRect = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  width: 0,
  height: 0,
};

type rectShape = {
  top: number;
  right: number;
  bottom: number;
  left: number;
  width: number;
  height: number;
};

const rectShape: PropTypes.Requireable<rectShape> = PropTypes.shape({
  top: PropTypes.number.isRequired,
  right: PropTypes.number.isRequired,
  bottom: PropTypes.number.isRequired,
  left: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
});

export const withBoundingRectsProps = {
  getRects: PropTypes.func,
  rect: rectShape,
  parentRect: rectShape,
};

// @ts-ignore ts-migrate(2304) FIXME: Cannot find name '$TSFixMe'.
export default function withBoundingRects(BaseComponent: $TSFixMe) {
  class WrappedComponent extends React.PureComponent {
    // @ts-ignore ts-migrate(2304) FIXME: Cannot find name '$TSFixMe'.
    node: $TSFixMe;
    // @ts-ignore ts-migrate(2304) FIXME: Cannot find name '$TSFixMe'.
    constructor(props: $TSFixMe) {
      super(props);
      this.state = {
        rect: undefined,
        parentRect: undefined,
      };
      this.getRects = this.getRects.bind(this);
    }

    componentDidMount() {
      this.node = ReactDOM.findDOMNode(this);
      this.setState(() => this.getRects());
    }

    getRects() {
      if (!this.node) return this.state;

      const { node } = this;
      const { parentNode } = node;

      const rect = node.getBoundingClientRect ? node.getBoundingClientRect() : emptyRect;

      const parentRect =
        parentNode && parentNode.getBoundingClientRect
          ? parentNode.getBoundingClientRect()
          : emptyRect;

      return { rect, parentRect };
    }

    render() {
      return <BaseComponent getRects={this.getRects} {...this.state} {...this.props} />;
    }
  }

  // @ts-ignore ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
  WrappedComponent.propTypes = BaseComponent.propTypes;
  // @ts-ignore ts-migrate(2339) FIXME: Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
  WrappedComponent.defaultProps = BaseComponent.defaultProps;
  // @ts-ignore ts-migrate(2339) FIXME: Property 'displayName' does not exist on type 'typ... Remove this comment to see the full error message
  WrappedComponent.displayName = `withBoundingRects(${BaseComponent.displayName || ''})`;

  return WrappedComponent;
}
