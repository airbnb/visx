import React from 'react';
import ReactDOM from 'react-dom';

export type PortalProps = {
  /** Optional container for the Portal. */
  container?: HTMLDivElement;
  /** Optional z-index to set on the Portal (not applicable when a specific portal container is provided). */
  zIndex?: number | string;
  /** Content to render in the Portal. */
  children: NonNullable<React.ReactNode>;
};

/** Render within a portal using a declarative component API. */
export default class Portal extends React.PureComponent<PortalProps> {
  private node?: HTMLDivElement;

  componentWillUnmount() {
    if (this.node && document.body && !this.props.container) {
      document.body.removeChild(this.node);
      delete this.node;
    }
  }

  render() {
    if (!this.node && this.props.container) {
      this.node = this.props.container;
    }

    // SSR check
    if (!this.node && typeof document !== 'undefined') {
      this.node = document.createElement('div');
      if (this.props.zIndex != null) this.node.style.zIndex = `${this.props.zIndex}`;
      document.body.append(this.node);
    }

    if (!this.node) {
      return null;
    }

    return ReactDOM.createPortal(this.props.children, this.node);
  }
}
