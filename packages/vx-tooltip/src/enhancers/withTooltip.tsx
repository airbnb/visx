import React from 'react';

export type WithTooltipProvidedProps = {
  tooltipOpen?: boolean;
  tooltipLeft?: number;
  tooltipTop?: number;
  tooltipData?: object;
  updateTooltip?: (args: UpdateTooltipArgs) => void;
  showTooltip?: (args: ShowTooltipArgs) => void;
  hideTooltip?: () => void;
};
type WithTooltipState = Pick<
  WithTooltipProvidedProps,
  'tooltipOpen' | 'tooltipLeft' | 'tooltipTop' | 'tooltipData'
>;
type ShowTooltipArgs = Omit<WithTooltipState, 'tooltipOpen'>;
type UpdateTooltipArgs = WithTooltipState;
type WithTooltipContainerProps = { style: React.CSSProperties };

export default function withTooltip<Props extends object = {}>(
  BaseComponent: React.ComponentType<Props>,
  containerProps: WithTooltipContainerProps = {
    style: {
      position: 'relative',
      width: 'inherit',
      height: 'inherit',
    } as const,
  },
) {
  return class WrappedComponent extends React.PureComponent<Props, WithTooltipState> {
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
  };
}
