import React, { useContext, useCallback, useMemo } from 'react';
import BaseLegend, { LegendProps as BaseLegendProps } from '@vx/legend/lib/legends/Legend';
import Rect from '@vx/legend/lib/shapes/Rect';
import Circle from '@vx/legend/lib/shapes/Circle';
import Line from '@vx/legend/lib/shapes/Line';

import ChartContext from '../context/ChartContext';

// convenience exports to support easy renderShape overrides
export const RectShape = Rect;
export const LineShape = Line;
export const CircleShape = Circle;

export type LegendProps = { horizontalAlign?: boolean } & Partial<BaseLegendProps<string, string>>;

export default function Legend({
  alignLeft = true,
  direction = 'row',
  shape: Shape,
  style,
  ...props
}: LegendProps) {
  const { theme, margin, colorScale, dataRegistry } = useContext(ChartContext);
  const legendLabelProps = useMemo(() => ({ style: { ...theme.labelStyles } }), [theme]);
  const legendStyles = useMemo(
    () => ({
      display: 'flex',
      background: theme?.baseColor ?? 'white',
      color: theme?.labelStyles?.fill,
      paddingLeft: margin.left,
      paddingRight: margin.right,
      [direction === 'row' || direction === 'row-reverse'
        ? 'justifyContent'
        : 'alignItems']: alignLeft ? 'flex-start' : 'flex-end',
      style,
    }),
    [theme, margin, alignLeft, direction, style],
  );
  const renderShape = useCallback(
    shapeProps => {
      if (Shape && typeof Shape !== 'string') return <Shape {...shapeProps} />;

      const legendShape = Shape || dataRegistry?.[shapeProps.item]?.legendShape;
      switch (legendShape) {
        case 'circle':
          return <CircleShape {...shapeProps} />;
        case 'line':
          return <LineShape {...shapeProps} />;
        case 'dashed-line':
          return (
            <LineShape {...shapeProps} style={{ strokeDasharray: '5,3', ...shapeProps.style }} />
          );
        case 'rect':
        default:
          return <RectShape {...shapeProps} />;
      }
    },
    [dataRegistry, Shape],
  );

  return props.scale || colorScale ? (
    <BaseLegend
      style={legendStyles}
      itemMargin={alignLeft ? '0 8px 0 0' : '0 0 0 8px'}
      shapeMargin="0 4px 0 0"
      direction={direction}
      legendLabelProps={legendLabelProps}
      scale={colorScale}
      shape={renderShape}
      {...props}
    />
  ) : null;
}
