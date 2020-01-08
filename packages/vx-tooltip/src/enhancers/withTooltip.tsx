import React from 'react';

export type WithTooltipProvidedProps<TooltipData> = {
  tooltipOpen: boolean;
  tooltipLeft?: number;
  tooltipTop?: number;
  tooltipData?: TooltipData;
  updateTooltip: (args: UpdateTooltipArgs<TooltipData>) => void;
  showTooltip: (args: ShowTooltipArgs<TooltipData>) => void;
  hideTooltip: () => void;
};

type WithTooltipState<TooltipData> = Pick<
  WithTooltipProvidedProps<TooltipData>,
  'tooltipOpen' | 'tooltipLeft' | 'tooltipTop' | 'tooltipData'
>;
type ShowTooltipArgs<TooltipData> = Omit<WithTooltipState<TooltipData>, 'tooltipOpen'>;
type UpdateTooltipArgs<TooltipData> = WithTooltipState<TooltipData>;
type WithTooltipContainerProps = { style: React.CSSProperties };

export default function withTooltip<
  Props extends WithTooltipProvidedProps<TooltipData>,
  TooltipData
>(
  BaseComponent: React.ComponentType<Props>,
  containerProps: WithTooltipContainerProps = {
    style: {
      position: 'relative',
      width: 'inherit',
      height: 'inherit',
    } as const,
  },
) {
  return class WrappedComponent extends React.PureComponent<Props, WithTooltipState<TooltipData>> {
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
    updateTooltip({
      tooltipOpen,
      tooltipLeft,
      tooltipTop,
      tooltipData,
    }: UpdateTooltipArgs<TooltipData>) {
      this.setState(prevState => ({
        ...prevState,
        tooltipOpen,
        tooltipLeft,
        tooltipTop,
        tooltipData,
      }));
    }
    showTooltip({ tooltipLeft, tooltipTop, tooltipData }: ShowTooltipArgs<TooltipData>) {
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
