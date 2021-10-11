import React from 'react';
import cx from 'classnames';
import { AnyD3Scale, ScaleInput } from '@visx/scale';
import LegendItem from './LegendItem';
import LegendLabel, { LegendLabelProps } from './LegendLabel';
import LegendShape from './LegendShape';
import valueOrIdentity, { valueOrIdentityString } from '../../util/valueOrIdentity';
import labelTransformFactory from '../../util/labelTransformFactory';
import {
  FlexDirection,
  FormattedLabel,
  LabelFormatter,
  LabelFormatterFactory,
  LegendShape as LegendShapeType,
} from '../../types';

export type LegendProps<Scale extends AnyD3Scale> = {
  /** Optional render function override. */
  children?: (labels: FormattedLabel<ScaleInput<Scale>, ReturnType<Scale>>[]) => React.ReactNode;
  /** Classname to be applied to legend container. */
  className?: string;
  /** Styles to be applied to the legend container. */
  style?: React.CSSProperties;
  /** Legend domain. */
  domain?: ScaleInput<Scale>[];
  /** Width of the legend shape. */
  shapeWidth?: string | number;
  /** Height of the legend shape. */
  shapeHeight?: string | number;
  /** Margin of the legend shape. */
  shapeMargin?: string | number;
  /** Flex-box alignment of legend item labels. */
  labelAlign?: string;
  /** `@visx/scale` or `d3-scale` object used to generate the legend items. */
  scale: Scale;
  /** Flex-box flex of legend item labels. */
  labelFlex?: string | number;
  /** Margin of legend item labels. */
  labelMargin?: string | number;
  /** Margin of legend items. */
  itemMargin?: string | number;
  /** Flex direction of the legend itself. */
  direction?: FlexDirection;
  /** Flex direction of legend items. */
  itemDirection?: FlexDirection;
  /** Legend item fill accessor function. */
  fill?: (label: FormattedLabel<ScaleInput<Scale>, ReturnType<Scale>>) => string | undefined;
  /** Legend item size accessor function. */
  size?: (
    label: FormattedLabel<ScaleInput<Scale>, ReturnType<Scale>>,
  ) => string | number | undefined;
  /** Legend shape string preset or Element or Component. */
  shape?: LegendShapeType<ScaleInput<Scale>, ReturnType<Scale>>;
  /** Styles applied to legend shapes. */
  shapeStyle?: (label: FormattedLabel<ScaleInput<Scale>, ReturnType<Scale>>) => React.CSSProperties;
  /** Given a legend item and its index, returns an item label. */
  labelFormat?: LabelFormatter<ScaleInput<Scale>>;
  /** Given the legend scale and labelFormatter, returns a label with datum, index, value, and label. */
  labelTransform?: LabelFormatterFactory<Scale>;
  /** Additional props to be set on LegendLabel. */
  legendLabelProps?: Partial<LegendLabelProps>;
};

const defaultStyle = {
  display: 'flex',
};

export default function Legend<Scale extends AnyD3Scale>({
  className,
  style = defaultStyle,
  scale,
  shape,
  domain: inputDomain,
  fill = valueOrIdentityString,
  size = valueOrIdentityString,
  labelFormat = valueOrIdentity,
  labelTransform = labelTransformFactory,
  shapeWidth = 15,
  shapeHeight = 15,
  shapeMargin = '2px 4px 2px 0',
  shapeStyle,
  labelAlign = 'left',
  labelFlex = '1',
  labelMargin = '0 4px',
  itemMargin = '0',
  direction = 'column',
  itemDirection = 'row',
  legendLabelProps,
  children,
  ...legendItemProps
}: LegendProps<Scale>) {
  // `Scale extends ScaleType` constraint is tricky
  //  could consider removing `scale` altogether in the future and making `domain: Datum[]` required
  // @ts-ignore doesn't like `.domain()`
  const domain = inputDomain || (('domain' in scale ? scale.domain() : []) as Datum[]);
  const labelFormatter = labelTransform({ scale, labelFormat });
  const labels = domain.map(labelFormatter);
  if (children) return <>{children(labels)}</>;

  return (
    <div
      className={cx('visx-legend', className)}
      style={{
        ...style,
        flexDirection: direction,
      }}
    >
      {labels.map((label, i) => (
        <LegendItem
          key={`legend-${label.text}-${i}`}
          margin={itemMargin}
          flexDirection={itemDirection}
          {...legendItemProps}
        >
          <LegendShape
            shape={shape}
            height={shapeHeight}
            width={shapeWidth}
            margin={shapeMargin}
            item={domain[i]}
            itemIndex={i}
            label={label}
            fill={fill}
            size={size}
            shapeStyle={shapeStyle}
          />
          <LegendLabel
            label={label.text}
            flex={labelFlex}
            margin={labelMargin}
            align={labelAlign}
            {...legendLabelProps}
          />
        </LegendItem>
      ))}
    </div>
  );
}
