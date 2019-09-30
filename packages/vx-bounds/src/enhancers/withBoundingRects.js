/* eslint react/no-did-mount-set-state: 0, react/no-find-dom-node: 0 */
import React from 'react';
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

const rectShape = PropTypes.shape({
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

export default function withBoundingRects(BaseComponent) {
  class WrappedComponent extends React.PureComponent {
    constructor(props) {
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

  WrappedComponent.propTypes = BaseComponent.propTypes;
  WrappedComponent.defaultProps = BaseComponent.defaultProps;
  WrappedComponent.displayName = `withBoundingRects(${BaseComponent.displayName || ''})`;

  return WrappedComponent;
}
