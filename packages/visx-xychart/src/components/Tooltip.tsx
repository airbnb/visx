import React, { useCallback, useContext } from 'react';
import { useTooltipInPortal, defaultStyles } from '@visx/tooltip';
import { TooltipProps as BaseTooltipProps } from '@visx/tooltip/lib/tooltips/Tooltip';
import { PickD3Scale } from '@visx/scale';

import TooltipContext from '../context/TooltipContext';
import DataContext from '../context/DataContext';
import { TooltipContextType } from '../types';

export type RenderTooltipParams = TooltipContextType & {
  colorScale?: PickD3Scale<'ordinal', string, string>;
};

export type TooltipProps = {
  /**
   * When TooltipContext.tooltipOpen=true, this function is invoked and if the
   * return value is non-null, its content is rendered inside the tooltip container.
   * Content will be rendered in an HTML parent.
   */
  renderTooltip: (params: RenderTooltipParams) => React.ReactNode;
} & Omit<BaseTooltipProps, 'left' | 'top' | 'children'>;

const INVISIBLE_STYLES: React.CSSProperties = {
  position: 'absolute',
  left: 0,
  top: 0,
  opacity: 0,
  width: 0,
  height: 0,
  pointerEvents: 'none',
};

export default function Tooltip({ renderTooltip, ...tooltipProps }: TooltipProps) {
  const { colorScale, theme } = useContext(DataContext) || {};
  const tooltipContext = useContext(TooltipContext);
  const { containerRef, TooltipInPortal } = useTooltipInPortal();

  // To correctly position itself in a Portal, the tooltip must know its container bounds
  // this is done by rendering an invisible node which can be used to find its parents element
  const setContainerRef = useCallback(
    (ownRef: HTMLElement | SVGElement | null) => {
      containerRef(ownRef?.parentElement ?? null);
    },
    [containerRef],
  );

  const tooltipContent = tooltipContext?.tooltipOpen
    ? renderTooltip({ ...tooltipContext, colorScale })
    : null;

  return (
    // Tooltip can be rendered as a child of SVG or HTML since its output is rendered in a Portal.
    // So use svg element to find container ref because it's a valid child of SVG and HTML parents.
    <>
      <svg ref={setContainerRef} style={INVISIBLE_STYLES} />
      {tooltipContext?.tooltipOpen && tooltipContent != null && (
        <TooltipInPortal
          left={tooltipContext?.tooltipLeft}
          top={tooltipContext?.tooltipTop}
          style={{
            ...defaultStyles,
            background: theme?.backgroundColor ?? 'white',
            boxShadow: `0 1px 2px ${
              theme?.htmlLabelStyles?.color ? `${theme?.htmlLabelStyles?.color}55` : '#22222255'
            }`,

            ...theme?.htmlLabelStyles,
          }}
          {...tooltipProps}
        >
          {tooltipContent}
        </TooltipInPortal>
      )}
    </>
  );
}
