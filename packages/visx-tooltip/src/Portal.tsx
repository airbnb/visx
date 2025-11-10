import { PureComponent } from 'react';
import type { ReactNode } from 'react';
import ReactDOM from 'react-dom';

export type PortalProps = {
  /** Optional z-index to set on the Portal. */
  zIndex?: number | string;
  /** Content to render in the Portal. */
  children: NonNullable<ReactNode>;
};

/** Render within a portal using a declarative component API. */
export default class Portal extends PureComponent<PortalProps> {
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
      if (this.props.zIndex != null) this.node.style.zIndex = `${this.props.zIndex}`;
      document.body.append(this.node);
    }

    if (!this.node) {
      return null;
    }

    return ReactDOM.createPortal(this.props.children, this.node);
  }
}
