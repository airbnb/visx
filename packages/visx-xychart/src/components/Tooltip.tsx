import React, { useCallback, useContext } from 'react';
import { useTooltipInPortal, defaultStyles } from '@visx/tooltip';
import { TooltipProps as BaseTooltipProps } from '@visx/tooltip/lib/tooltips/Tooltip';
import { PickD3Scale } from '@visx/scale';
import { UseTooltipPortalOptions } from '@visx/tooltip/lib/hooks/useTooltipInPortal';

import TooltipContext from '../context/TooltipContext';
import DataContext from '../context/DataContext';
import { TooltipContextType } from '../types';

const CROSSHAIR_STYLE: React.CSSProperties = {
  position: 'absolute',
  pointerEvents: 'none',
  fontSize: 0,
  lineHeight: 0,
};

export type RenderTooltipParams<Datum extends object> = TooltipContextType<Datum> & {
  colorScale?: PickD3Scale<'ordinal', string, string>;
};

export type TooltipProps<Datum extends object> = {
  /**
   * When TooltipContext.tooltipOpen=true, this function is invoked and if the
   * return value is non-null, its content is rendered inside the tooltip container.
   * Content will be rendered in an HTML parent.
   */
  renderTooltip: (params: RenderTooltipParams<Datum>) => React.ReactNode;
  /** Whether to show a vertical line at tooltip position. */
  showVerticalCrosshair?: boolean;
  /** Whether to show a horizontal line at tooltip position. */
  showHorizontalCrosshair?: boolean;
  /** Whether to show a circle at the tooltip position. */
  showPoint?: boolean;
  /** Optional styles for the vertical crosshair, if visible. */
  verticalCrosshairStyle?: React.SVGProps<SVGLineElement>;
  /** Optional styles for the vertical crosshair, if visible. */
  horizontalCrosshairStyle?: React.SVGProps<SVGLineElement>;
  /** Optional styles for the point, if visible. */
  pointStyle?: React.SVGProps<SVGCircleElement>;
  /**
   * Tooltip depends on ResizeObserver, which may be pollyfilled globally
   * or injected into this component.
   */
  resizeObserverPolyfill?: UseTooltipPortalOptions['polyfill'];
} & Omit<BaseTooltipProps, 'left' | 'top' | 'children'> &
  Pick<UseTooltipPortalOptions, 'debounce' | 'detectBounds' | 'scroll'>;

const INVISIBLE_STYLES: React.CSSProperties = {
  position: 'absolute',
  left: 0,
  top: 0,
  opacity: 0,
  width: 0,
  height: 0,
  pointerEvents: 'none',
};

export default function Tooltip<Datum extends object>({
  debounce,
  detectBounds,
  renderTooltip,
  resizeObserverPolyfill,
  scroll = true,
  showHorizontalCrosshair = true,
  showPoint = true,
  showVerticalCrosshair = true,
  verticalCrosshairStyle,
  horizontalCrosshairStyle,
  pointStyle,
  ...tooltipProps
}: TooltipProps<Datum>) {
  const { colorScale, theme, innerHeight, innerWidth, margin } = useContext(DataContext) || {};
  const tooltipContext = useContext(TooltipContext);
  const { containerRef, TooltipInPortal } = useTooltipInPortal({
    debounce,
    detectBounds,
    polyfill: resizeObserverPolyfill,
    scroll,
  });

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

  const pointRadius = Number(pointStyle?.radius ?? 4);

  return (
    // Tooltip can be rendered as a child of SVG or HTML since its output is rendered in a Portal.
    // So use svg element to find container ref because it's a valid child of SVG and HTML parents.
    <>
      <svg ref={setContainerRef} style={INVISIBLE_STYLES} />
      {tooltipContext?.tooltipOpen && tooltipContent != null && (
        <>
          {showVerticalCrosshair && (
            <TooltipInPortal
              className="visx-crosshair visx-crosshair--horizontal"
              left={tooltipContext?.tooltipLeft}
              top={margin?.top}
              offsetLeft={0}
              offsetTop={0}
              detectBounds={false}
              style={CROSSHAIR_STYLE}
            >
              <svg width="1" height={innerHeight}>
                <line
                  x1={0}
                  x2={0}
                  y1={0}
                  y2={innerHeight}
                  strokeWidth={1.5}
                  stroke={theme?.gridStyles?.stroke ?? theme?.htmlLabelStyles?.color ?? '#222'}
                  {...verticalCrosshairStyle}
                />
              </svg>
            </TooltipInPortal>
          )}
          {showHorizontalCrosshair && (
            <TooltipInPortal
              className="visx-crosshair visx-crosshair--horizontal"
              left={margin?.left}
              top={tooltipContext?.tooltipTop}
              offsetLeft={0}
              offsetTop={0}
              detectBounds={false}
              style={CROSSHAIR_STYLE}
            >
              <svg width={innerWidth} height={1}>
                <line
                  x1={0}
                  x2={innerWidth}
                  y1={0}
                  y2={0}
                  strokeWidth={1.5}
                  stroke={theme?.gridStyles?.stroke ?? theme?.htmlLabelStyles?.color ?? '#222'}
                  {...horizontalCrosshairStyle}
                />
              </svg>
            </TooltipInPortal>
          )}
          {showPoint && (
            <TooltipInPortal
              className="visx-crosshair visx-crosshair--horizontal"
              left={(tooltipContext?.tooltipLeft ?? 0) - pointRadius}
              top={(tooltipContext?.tooltipTop ?? 0) - pointRadius}
              offsetLeft={0}
              offsetTop={0}
              detectBounds={false}
              style={CROSSHAIR_STYLE}
            >
              <svg width={pointRadius * 2} height={pointRadius * 2}>
                <circle
                  cx={pointRadius}
                  cy={pointRadius}
                  r={pointRadius}
                  fill={theme?.gridStyles?.stroke ?? theme?.htmlLabelStyles?.color ?? '#222'}
                  {...pointStyle}
                />
              </svg>
            </TooltipInPortal>
          )}
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
        </>
      )}
    </>
  );
}
