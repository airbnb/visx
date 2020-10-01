import React, { useCallback, useContext } from 'react';
import { useTooltipInPortal, defaultStyles } from '@visx/tooltip';
import { PickD3Scale } from '@visx/scale';

import TooltipContext from '../context/TooltipContext';
import DataContext from '../context/DataContext';
import { TooltipContextType } from '../types';

export type RenderTooltipParams = TooltipContextType & {
  colorScale?: PickD3Scale<'ordinal', string, string>;
};

export type TooltipProps = {
  /** Required */
  renderTooltip: (params: RenderTooltipParams) => React.ReactNode;
  svgContainer?: boolean;
};

const INVISIBLE_STYLES: React.CSSProperties = {
  position: 'absolute',
  left: 0,
  top: 0,
  opacity: 0,
  width: 0,
  height: 0,
  pointerEvents: 'none',
};

export default function Tooltip({ renderTooltip, svgContainer }: TooltipProps) {
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

  const ParentSpyTag = svgContainer ? 'g' : 'div';

  return (
    <>
      <ParentSpyTag style={INVISIBLE_STYLES} ref={setContainerRef} />
      {tooltipContext?.tooltipOpen && (
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
        >
          {renderTooltip({ ...tooltipContext, colorScale })}
        </TooltipInPortal>
      )}
    </>
  );
}
