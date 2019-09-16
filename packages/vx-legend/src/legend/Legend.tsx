import React from 'react';
import cx from 'classnames';
import LegendItem from './LegendItem';
import LegendLabel from './LegendLabel';
import LegendShape from './LegendShape';
import valueOrIdentity from '../util/valueOrIdentity';
import labelTransformFactory from '../util/labelTransformFactory';
import {
  ScaleType,
  FormattedLabel,
  LabelFormatter,
  LabelFormatterFactory,
  LegendShape as LegendShapeType,
} from '../types';

export type LegendProps<Datum extends string | number | Date, Output> = {
  /** Optional render function override. */
  children?: (labels: FormattedLabel<Datum, Output>[]) => any;
  /** Classname to be applied to legend container. */
  className?: string;
  /** Styles to be applied to the legend container. */
  style?: React.CSSProperties;
  /** Legend domain. */
  domain?: Datum[];
  /** Width of the legend shape. */
  shapeWidth?: string | number;
  /** Height of the legend shape. */
  shapeHeight?: string | number;
  /** Margin of the legend shape. */
  shapeMargin?: React.CSSProperties['margin'];
  /** Flex-box alignment of legend item labels. */
  labelAlign?: React.CSSProperties['justifyContent'];
  /** @TODO handle object type? */
  scale: ScaleType<Datum, Output>;
  /** Flex-box flex of legend item labels. */
  labelFlex?: React.CSSProperties['flex'];
  /** Margin of legend item labels. */
  labelMargin?: React.CSSProperties['margin'];
  /** Margin of legend items. */
  itemMargin?: React.CSSProperties['margin'];
  /** Flex direction of the legend itself. */
  direction: React.CSSProperties['flexDirection'];
  /** Flex direction of legend items. */
  itemDirection: React.CSSProperties['flexDirection'];
  /** Legend item fill accessor function. */
  fill?: (label: FormattedLabel<Datum, Output>) => React.CSSProperties['background'];
  /** Legend item size accessor function. */
  size?: (label: FormattedLabel<Datum, Output>) => string | number | undefined;
  /** Legend shape string preset or Element or Component. */
  shape?: LegendShapeType;
  /** Styles applied to legend shapes. */
  shapeStyle?: (label: FormattedLabel<Datum, Output>) => React.CSSProperties;
  /** Given a legend item and its index, returns an item label. */
  labelFormat?: LabelFormatter<Datum>;
  /** Given the legend scale and labelFormatter, returns a label with datum, index, value, and label. */
  labelTransform?: LabelFormatterFactory<Datum, Output>;
};

const defaultStyle = {
  display: 'flex',
};

export default function Legend<Datum, Output>({
  className,
  style = defaultStyle,
  scale,
  shape,
  domain: inputDomain,
  fill = valueOrIdentity,
  size = valueOrIdentity,
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
  children,
  ...restProps
}: LegendProps<Datum, Output>) {
  const domain = inputDomain || (scale.domain() as Datum[]);
  const labelFormatter = labelTransform({ scale, labelFormat });
  const labels = domain.map(labelFormatter);
  if (children) return children(labels);

  return (
    <div
      className={cx('vx-legend', className)}
      style={{
        ...style,
        flexDirection: direction,
      }}
    >
      {labels.map((label, i) => {
        const { text } = label;
        return (
          <LegendItem
            key={`legend-${text}-${i}`}
            margin={itemMargin}
            flexDirection={itemDirection}
            {...restProps}
          >
            <LegendShape
              shape={shape}
              height={shapeHeight}
              width={shapeWidth}
              margin={shapeMargin}
              label={label}
              fill={fill}
              size={size}
              shapeStyle={shapeStyle}
            />
            <LegendLabel label={text} flex={labelFlex} margin={labelMargin} align={labelAlign} />
          </LegendItem>
        );
      })}
    </div>
  );
}
