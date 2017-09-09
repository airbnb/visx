import React from 'react';
import { Transform } from '@vx/transform';

export default function withZoom(BaseComponent) {
  class WrappedComponent extends React.Component {
    constructor(props) {
      super(props);

      this.state = { zoomTransform: new Transform() };
    }

    updateZoomTransform(zoomTransform) {
      this.setState({ zoomTransform });
    }

    render() {
      const { zoomTransform } = this.state;
      return <BaseComponent zoomTransform={zoomTransform} {...this.props} />;
    }
  }
  WrappedComponent.displayName = 'withZoom()';
  return WrappedComponent;
}
