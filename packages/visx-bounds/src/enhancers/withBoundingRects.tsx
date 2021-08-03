/* eslint react/no-did-mount-set-state: 0, react/no-find-dom-node: 0 */
import React from 'react';
import ReactDOM from 'react-dom';

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

export type WithBoundingRectsProps = {
  getRects?: () => { rect: rectShape; parentRect: rectShape };
  rect?: rectShape;
  parentRect?: rectShape;
};

export default function withBoundingRects<Props extends object = {}>(
  BaseComponent: React.ComponentType<Props>,
) {
  return class WrappedComponent extends React.PureComponent<Props> {
    static displayName = `withBoundingRects(${BaseComponent.displayName || ''})`;
    node: HTMLElement | undefined | null;
    constructor(props: Props) {
      super(props);
      this.state = {
        rect: undefined,
        parentRect: undefined,
      };
      this.getRects = this.getRects.bind(this);
    }

    componentDidMount() {
      this.node = ReactDOM.findDOMNode(this) as HTMLElement;
      this.setState(() => this.getRects());
    }

    getRects() {
      if (!this.node) return this.state;

      const { node } = this;
      const parentNode = node.parentNode as HTMLElement | null;

      const rect = node.getBoundingClientRect ? node.getBoundingClientRect() : emptyRect;

      const parentRect = parentNode?.getBoundingClientRect
        ? parentNode.getBoundingClientRect()
        : emptyRect;

      return { rect, parentRect };
    }

    render() {
      return <BaseComponent getRects={this.getRects} {...this.state} {...this.props} />;
    }
  };
}
