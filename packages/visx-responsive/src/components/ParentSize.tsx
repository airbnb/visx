import type { CSSProperties, ReactNode, HTMLAttributes } from 'react';
import type { ParentSizeState, UseParentSizeConfig } from '../hooks/useParentSize';
import useParentSize from '../hooks/useParentSize';

export type ParentSizeProvidedProps = ParentSizeState & {
  ref: HTMLDivElement | null;
  resize: (state: ParentSizeState) => void;
};

export type ParentSizeProps = {
  /** Optional `className` to add to the parent `div` wrapper used for size measurement. */
  className?: string;
  /**
   * @deprecated - use `style` prop as all other props are passed directly to the parent `div`.
   * @TODO remove in the next major version.
   * Optional `style` object to apply to the parent `div` wrapper used for size measurement.
   * */
  parentSizeStyles?: CSSProperties;
  /** Child render function `({ width, height, top, left, ref, resize }) => ReactNode`. */
  children: (args: ParentSizeProvidedProps) => ReactNode;
} & UseParentSizeConfig;

const defaultOuterStyles: CSSProperties = { width: '100%', height: '100%', position: 'relative' };

const measurementStyles: CSSProperties = {
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  overflow: 'hidden',
};

export default function ParentSize({
  className,
  children,
  debounceTime,
  ignoreDimensions,
  initialSize,
  parentSizeStyles,
  enableDebounceLeadingCall = true,
  resizeObserverPolyfill,
  style,
  ...restProps
}: ParentSizeProps & Omit<HTMLAttributes<HTMLDivElement>, keyof ParentSizeProps>) {
  const { parentRef, node, resize, ...dimensions } = useParentSize({
    initialSize,
    debounceTime,
    ignoreDimensions,
    enableDebounceLeadingCall,
    resizeObserverPolyfill,
  });

  const outerStyle: CSSProperties = parentSizeStyles
    ? { position: 'relative', ...parentSizeStyles }
    : { ...defaultOuterStyles, ...style };

  return (
    <div style={outerStyle} className={className} {...restProps}>
      <div style={measurementStyles} ref={parentRef}>
        {children({
          ...dimensions,
          ref: node,
          resize,
        })}
      </div>
    </div>
  );
}
