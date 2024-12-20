import type { ReactElement, FunctionComponent } from 'react';
import React from 'react';

import type { UseTooltipParams } from '../hooks/useTooltip';
import useTooltip from '../hooks/useTooltip';

export type WithTooltipProvidedProps<TooltipData> = UseTooltipParams<TooltipData>;
type WithTooltipContainerProps = React.HTMLProps<HTMLDivElement>;
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
  const WrappedComponent: FunctionComponent<BaseComponentProps> = (props) => {
    const tooltipProps = useTooltip<TooltipData>();

    return renderContainer(<BaseComponent {...tooltipProps} {...props} />, containerProps);
  };

  return WrappedComponent;
}
