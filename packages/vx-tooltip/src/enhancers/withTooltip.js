import React from 'react';
import { compose, withState, withHandlers } from 'recompose';
// export default compose(
//   withState('tooltip', 'updateTooltip', {
//     tooltipOpen: false,
//     tooltipTop: undefined,
//     tooltipLeft: undefined
//   }),
//   withHandlers({
//     showTooltip: ({ updateTooltip }) => event => {
//       updateTooltip(prevState => ({
//         ...prevState,
//         tooltipOpen: true
//       }));
//     },
//     hideTooltip: ({ updateTooltip }) => event => {
//       updateTooltip(prevState => ({
//         ...prevState,
//         tooltipOpen: false
//       }));
//     }
//   })
// );

export default function withTooltip(BaseComponent) {
  return class WrappedComponent extends React.PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        tooltipOpen: false,
        tooltipLeft: undefined,
        tooltipTop: undefined,
        tooltipData: undefined
      };
      this.updateTooltip = this.updateTooltip.bind(this);
    }
    updateTooltip({ tooltipOpen, tooltipLeft, tooltipTop, tooltipData }) {
      this.setState(prevState => ({
        ...prevState,
        tooltipOpen,
        tooltipLeft,
        tooltipTop,
        tooltipData
      }));
    }
    render() {
      return (
        <div style={{ position: 'relative' }}>
          <BaseComponent
            updateTooltip={this.updateTooltip}
            {...this.props}
            {...this.state}
          />
          {this.state.tooltipOpen &&
            <div
              className="vx-tooltip-portal"
              style={{
                position: 'absolute',
                top: this.state.tooltipTop,
                left: this.state.tooltipLeft,
                backgroundColor: 'white',
                color: '#666666',
                padding: '.3rem .5rem',
                borderRadius: '3px',
                fontSize: '14px',
                boxShadow: '0 1px 2px rgba(33,33,33,0.2)',
                lineHeight: '1em',
                pointerEvents: 'none'
              }}
            >
              {`${this.state.tooltipData}`}
            </div>}
        </div>
      );
    }
  };
}
