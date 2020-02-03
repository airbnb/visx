import React, { ReactElement } from 'react';

export type WithTooltipProvidedProps<TooltipData = {}> = {
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
type RenderTooltipContainer = (
  children: ReactElement,
  containerProps?: WithTooltipContainerProps,
) => ReactElement;

export default function withTooltip<BaseComponentProps = {}, TooltipData = {}>(
  BaseComponent: React.ComponentType<BaseComponentProps & WithTooltipProvidedProps<TooltipData>>,
  containerProps: WithTooltipContainerProps = {
    style: {
      position: 'relative',
      width: 'inherit',
      height: 'inherit',
    } as const,
  },
  renderContainer: RenderTooltipContainer = (children, props) => <div {...props}>{children}</div>,
) {
  return class WrappedComponent extends React.PureComponent<
    BaseComponentProps,
    WithTooltipState<TooltipData>
  > {
    state = {
      tooltipOpen: false,
      tooltipLeft: undefined,
      tooltipTop: undefined,
      tooltipData: undefined,
    };

    updateTooltip = ({
      tooltipOpen,
      tooltipLeft,
      tooltipTop,
      tooltipData,
    }: UpdateTooltipArgs<TooltipData>) => {
      this.setState(prevState => ({
        ...prevState,
        tooltipOpen,
        tooltipLeft,
        tooltipTop,
        tooltipData,
      }));
    };

    showTooltip = ({ tooltipLeft, tooltipTop, tooltipData }: ShowTooltipArgs<TooltipData>) => {
      this.updateTooltip({
        tooltipOpen: true,
        tooltipLeft,
        tooltipTop,
        tooltipData,
      });
    };

    hideTooltip = () => {
      this.updateTooltip({
        tooltipOpen: false,
        tooltipLeft: undefined,
        tooltipTop: undefined,
        tooltipData: undefined,
      });
    };

    render() {
      return renderContainer(
        <BaseComponent
          updateTooltip={this.updateTooltip}
          showTooltip={this.showTooltip}
          hideTooltip={this.hideTooltip}
          {...this.state}
          {...this.props}
        />,
        containerProps,
      );
    }
  };
}
