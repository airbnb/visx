import { forwardRef } from 'react';
import type { ReactNode, CSSProperties, HTMLAttributes } from 'react';
import cx from 'classnames';

export type TooltipProps = {
  /** Tooltip content. */
  children?: ReactNode;
  /** Optional className to apply to the Tooltip in addition to `visx-tooltip`. */
  className?: string;
  /** The `left` position of the Tooltip. */
  left?: number;
  /** Offset the `left` position of the Tooltip by this margin. */
  offsetLeft?: number;
  /** Offset the `top` position of the Tooltip by this margin. */
  offsetTop?: number;
  /** Styles to apply, unless `unstyled=true`. */
  style?: CSSProperties;
  /** The `top` position of the Tooltip. */
  top?: number;
  /**
   * Applies position: 'absolute' for tooltips to correctly position themselves
   * when `unstyled=true`. In a future major release this will be the default behavior.
   */
  applyPositionStyle?: boolean;
  /**
   * Whether to omit applying any style, except `left` / `top`.
   * In most cases if this is `true` a developer must do one of the following
   * for positioning to work correctly:
   * - set `applyPositionStyle=true`
   * - create a CSS selector like: `.visx-tooltip { position: 'absolute' }`
   */
  unstyled?: boolean;
};

export const defaultStyles: CSSProperties = {
  position: 'absolute',
  backgroundColor: 'white',
  color: '#666666',
  padding: '0.3rem 0.5rem',
  borderRadius: '3px',
  fontSize: '14px',
  boxShadow: '0 1px 2px rgba(33,33,33,0.2)',
  lineHeight: '1em',
  pointerEvents: 'none',
};

const Tooltip = forwardRef<HTMLDivElement, TooltipProps & HTMLAttributes<HTMLDivElement>>(
  (
    {
      className,
      top,
      left,
      offsetLeft = 10,
      offsetTop = 10,
      style = defaultStyles,
      children,
      unstyled = false,
      applyPositionStyle = false,
      ...restProps
    },
    ref,
  ) => (
    <div
      ref={ref}
      className={cx('visx-tooltip', className)}
      style={{
        top: top == null || offsetTop == null ? top : top + offsetTop,
        left: left == null || offsetLeft == null ? left : left + offsetLeft,
        ...(applyPositionStyle && { position: 'absolute' }),
        ...(!unstyled && style),
      }}
      {...restProps}
    >
      {children}
    </div>
  ),
);

Tooltip.displayName = 'Tooltip';
export default Tooltip;
