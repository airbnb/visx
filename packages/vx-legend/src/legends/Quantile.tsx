import React from 'react';

import Legend, { LegendProps } from './Legend';
import { LabelFormatterFactory, ScaleQuantile } from '../types';

export type LegendQuantileProps<Output> = {
  labelDelimiter?: string;
  labelTransform?: LabelFormatterFactory<number, Output, ScaleQuantile<number, Output>>;
  scale: ScaleQuantile<number, Output>;
} & Omit<LegendProps<number, Output, ScaleQuantile<number, Output>>, 'scale' | 'labelTransform'>;

function labelFormatterFactoryFactory<Output>({
  labelDelimiter,
}: Pick<LegendQuantileProps<Output>, 'labelDelimiter'>): LabelFormatterFactory<
  number,
  Output,
  ScaleQuantile<number, Output>
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
export default function Quantile<Output>({
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
    <Legend<number, Output, ScaleQuantile<number, Output>>
      scale={scale}
      domain={domain}
      labelFormat={labelFormat}
      labelTransform={labelTransform}
      {...restProps}
    />
  );
}
