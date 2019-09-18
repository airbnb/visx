import React from 'react';

type Props = {
  tooltipOpen?: boolean;
  tooltipLeft?: number;
  tooltipTop?: number;
  tooltipData?: Object;
  updateTooltip?: (args: UpdateTooltipArgs) => void;
  showTooltip?: (args: ShowTooltipArgs) => void;
  hideTooltip?: () => void;
};

type ShowTooltipArgs = {
  tooltipLeft?: Props['tooltipLeft'];
  tooltipTop?: Props['tooltipTop'];
  tooltipData?: Props['tooltipData'];
};

type UpdateTooltipArgs = {
  tooltipOpen?: Props['tooltipOpen'];
  tooltipLeft?: Props['tooltipLeft'];
  tooltipTop?: Props['tooltipTop'];
  tooltipData?: Props['tooltipData'];
};

export default function withTooltip(
  BaseComponent: React.ComponentType<Props>,
  containerProps = {
    style: {
      position: 'relative' as const,
      width: 'inherit' as const,
      height: 'inherit' as const,
    },
  },
) {
  class WrappedComponent extends React.PureComponent {
    constructor(props: Props) {
      super(props);
      this.state = {
        tooltipOpen: false,
        tooltipLeft: undefined,
        tooltipTop: undefined,
        tooltipData: undefined,
      };
      this.updateTooltip = this.updateTooltip.bind(this);
      this.showTooltip = this.showTooltip.bind(this);
      this.hideTooltip = this.hideTooltip.bind(this);
    }

    updateTooltip({ tooltipOpen, tooltipLeft, tooltipTop, tooltipData }: UpdateTooltipArgs) {
      this.setState(prevState => ({
        ...prevState,
        tooltipOpen,
        tooltipLeft,
        tooltipTop,
        tooltipData,
      }));
    }
    showTooltip({ tooltipLeft, tooltipTop, tooltipData }: ShowTooltipArgs) {
      this.updateTooltip({
        tooltipOpen: true,
        tooltipLeft,
        tooltipTop,
        tooltipData,
      });
    }
    hideTooltip() {
      this.updateTooltip({
        tooltipOpen: false,
        tooltipLeft: undefined,
        tooltipTop: undefined,
        tooltipData: undefined,
      });
    }
    render() {
      return (
        <div {...containerProps}>
          <BaseComponent
            updateTooltip={this.updateTooltip}
            showTooltip={this.showTooltip}
            hideTooltip={this.hideTooltip}
            {...this.state}
            {...this.props}
          />
        </div>
      );
    }
  }
  return WrappedComponent;
}
