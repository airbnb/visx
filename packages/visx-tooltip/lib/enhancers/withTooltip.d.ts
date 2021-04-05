import React, { ReactElement } from 'react';
import { UseTooltipParams } from '../hooks/useTooltip';
export declare type WithTooltipProvidedProps<TooltipData> = UseTooltipParams<TooltipData>;
declare type WithTooltipContainerProps = React.HTMLProps<HTMLDivElement>;
declare type RenderTooltipContainer = (children: ReactElement, containerProps?: WithTooltipContainerProps) => ReactElement;
export default function withTooltip<BaseComponentProps = {}, TooltipData = {}>(BaseComponent: React.ComponentType<BaseComponentProps & WithTooltipProvidedProps<TooltipData>>, containerProps?: WithTooltipContainerProps, renderContainer?: RenderTooltipContainer): React.FunctionComponent<BaseComponentProps>;
export {};
//# sourceMappingURL=withTooltip.d.ts.map