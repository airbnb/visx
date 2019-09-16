import React from 'react';
import Legend, { LegendProps } from '../legend/Legend';
import { QuantileScaleType } from '../types';
import { LabelFormatterFactory } from '../util/labelTransformFactory';
import { ScaleQuantile } from 'd3-scale';

export type LegendQuantileProps<Output> = {
  labelDelimiter?: string;
  scale: ScaleQuantile<Output>;
} & Omit<LegendProps<number, Output>, 'scale'>;

export default function LegendQuantile<Output extends string | number>({
  domain: inputDomain,
  scale,
  labelFormat = x => x,
  labelTransform: inputLabelTransform,
  labelDelimiter = '-',
  ...restProps
}: LegendQuantileProps<Output>) {
  const domain = inputDomain || scale.domain();
  const labelTransform =
    inputLabelTransform || labelFormatterFactoryFactory<Output>({ labelDelimiter });

  return (
    <Legend<number, Output>
      scale={scale}
      domain={domain}
      labelFormat={labelFormat}
      labelTransform={labelTransform}
      {...restProps}
    />
  );
}

function labelFormatterFactoryFactory<Output>({
  labelDelimiter,
}: Pick<LegendQuantileProps<Output>, 'labelDelimiter'>): LabelFormatterFactory<
  number,
  Output,
  QuantileScaleType<Output>
> {
  return ({ scale, labelFormat }) => {
    return (d: Output, i) => {
      const [x0, x1] = scale.invertExtent(d);
      return {
        extent: [x0, x1],
        text: `${labelFormat(x0, i)} ${labelDelimiter} ${labelFormat(x1, i)}`,
        value: scale(x0),
        datum: d,
        index: i,
      };
    };
  };
}
