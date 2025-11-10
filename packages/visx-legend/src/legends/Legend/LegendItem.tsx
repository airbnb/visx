import type { ReactNode, HTMLProps } from 'react';
import type { FlexDirection } from '../../types';

export type LegendItemProps = {
  /** Flex direction for the legend item layout. Determines if the shape and label are arranged horizontally or vertically. */
  flexDirection?: FlexDirection;
  /** CSS align-items property for vertical alignment of the legend item contents. */
  alignItems?: string;
  /** Margin around the legend item. */
  margin?: string | number;
  /** Child elements to render inside the legend item (typically LegendShape and LegendLabel). */
  children?: ReactNode;
  /** CSS display property for the legend item. */
  display?: string;
};

export default function LegendItem({
  flexDirection = 'row',
  alignItems = 'center',
  margin = '0',
  display = 'flex',
  children,
  ...restProps
}: LegendItemProps & Omit<HTMLProps<HTMLDivElement>, keyof LegendItemProps>) {
  return (
    <div
      className="visx-legend-item"
      style={{
        display,
        alignItems,
        flexDirection,
        margin,
      }}
      {...restProps}
    >
      {children}
    </div>
  );
}
