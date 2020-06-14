import React from 'react';
import ReactDOM from 'react-dom';

export type PortalProps = {
  /** Content to render in the portal. */
  children: NonNullable<React.ReactNode>;
};

/** Render within a portal using a declarative component API. */
export default class Portal extends React.PureComponent<PortalProps> {
  private node?: HTMLDivElement;

  componentWillUnmount() {
    if (this.node && document.body) {
      document.body.removeChild(this.node);
      delete this.node;
    }
  }

  render() {
    // SSR check
    if (!this.node && typeof document !== 'undefined') {
      this.node = document.createElement('div');
      document.body.append(this.node);
    }

    if (!this.node) {
      return null;
    }

    return ReactDOM.createPortal(this.props.children, this.node);
  }
}
