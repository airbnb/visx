import React from 'react';

import Legend, { LegendProps } from './Legend';
import { LabelFormatterFactory, ScaleQuantile, BaseOutput } from '../types';

export type LegendQuantileProps<Output extends BaseOutput> = {
  labelDelimiter?: string;
  labelTransform?: LabelFormatterFactory<number, Output, ScaleQuantile<Output>>;
  scale: ScaleQuantile<Output>;
} & Omit<LegendProps<number, Output>, 'scale' | 'labelTransform'>;

function labelFormatterFactoryFactory<Output extends BaseOutput>({
  labelDelimiter,
}: Pick<LegendQuantileProps<Output>, 'labelDelimiter'>): LabelFormatterFactory<
  number,
  Output,
  ScaleQuantile<Output>
> {
  return ({ scale, labelFormat }) => (datum: number, index: number) => {
    const [x0, x1] = scale.invertExtent(scale(datum));
    return {
      extent: [x0, x1],
      text: `${labelFormat(x0, index)} ${labelDelimiter} ${labelFormat(x1, index)}`,
      value: scale(x0),
      datum,
      index,
    };
  };
}

/** A Quantile scale takes a number input and returns an Output. */
export default function LegendQuantile<Output extends BaseOutput>({
  domain: inputDomain,
  scale,
  labelFormat = x => x,
  labelTransform: inputLabelTransform,
  labelDelimiter = '-',
  ...restProps
}: LegendQuantileProps<Output>) {
  // transform range into input values because it may contain more elements
  const domain = inputDomain || scale.range().map(output => scale.invertExtent(output)[0]);
  const labelTransform =
    inputLabelTransform || labelFormatterFactoryFactory<Output>({ labelDelimiter });

  return (
    <Legend<number, Output, ScaleQuantile<Output>>
      scale={scale}
      domain={domain}
      labelFormat={labelFormat}
      labelTransform={labelTransform}
      {...restProps}
    />
  );
}
