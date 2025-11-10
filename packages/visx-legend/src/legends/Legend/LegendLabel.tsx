import type { ReactNode, HTMLProps } from 'react';

export type LegendLabelOwnProps = {
  /** Horizontal alignment of the label text. Maps to CSS justify-content property. */
  align?: string;
  /** The label content to display. Can be a string or any React node. */
  label?: ReactNode;
  /** CSS flex property controlling how the label grows/shrinks in the legend item. */
  flex?: string | number;
  /** Margin around the label. */
  margin?: string | number;
  /** Child elements to render. If provided, overrides the label prop. */
  children?: ReactNode;
};

export type LegendLabelProps = LegendLabelOwnProps &
  Omit<HTMLProps<HTMLDivElement>, keyof LegendLabelOwnProps>;

export default function LegendLabel({
  flex = '1',
  label,
  margin = '5px 0',
  align = 'left',
  children,
  ...restProps
}: LegendLabelProps) {
  return (
    <div
      className="visx-legend-label"
      style={{
        justifyContent: align,
        display: 'flex',
        flex,
        margin,
      }}
      {...restProps}
    >
      {children || label}
    </div>
  );
}
