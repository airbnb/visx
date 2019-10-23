import React from 'react';
import Legend, { LegendProps } from '../legend/Legend';
import { BaseInput, BaseOutput, ScaleThreshold, LabelFormatterFactory } from '../types';

const formatZero = (label: unknown) => (label === 0 ? '0' : label || '');

export type LegendThresholdProps<Datum extends BaseInput, Output extends BaseOutput> = {
  labelDelimiter?: string;
  labelLower?: string;
  labelUpper?: string;
  scale: ScaleThreshold<Datum, Output>;
  labelTransform: LabelFormatterFactory<Datum, Output, ScaleThreshold<Datum, Output>>;
} & LegendProps<Datum, Output>;

/** Default transform implicitly assumes that Datum is of type number. */
function defaultTransform<Output extends BaseOutput>({
  labelDelimiter,
  labelLower,
  labelUpper,
}: Pick<
  LegendThresholdProps<number, Output>,
  'labelDelimiter' | 'labelLower' | 'labelUpper'
>): LabelFormatterFactory<number, Output, ScaleThreshold<number, Output>> {
  return ({ scale, labelFormat }) => (d, i) => {
    let [x0, x1] = scale.invertExtent(scale(d));
    let delimiter = ` ${labelDelimiter} `;
    let value;

    if (x0 !== 0 && !x0 && (x1 === 0 || !!x1)) {
      // lower threshold
      value = x1 - 1;
      delimiter = labelLower || delimiter;
    } else if ((x0 === 0 || !!x0) && (x1 === 0 || !!x1)) {
      // threshold step
      value = x0;
    } else if (!x1 && (x0 === 0 || !!x0)) {
      // upper threshold
      value = x0 + scale.domain()[1];
      x1 = x0;
      x0 = undefined;
      delimiter = labelUpper || delimiter;
    }

    return {
      extent: [x0, x1],
      text: `${formatZero(labelFormat(x0 || d, i))}${delimiter}${formatZero(
        labelFormat(x1 || d, i),
      )}`,
      value: scale(value || d),
      datum: d,
      index: i,
    };
  };
}

export default function LegendThreshold<Datum extends BaseInput, Output extends BaseOutput>({
  scale,
  domain: inputDomain,
  labelFormat = (d: Datum) => d,
  labelTransform: inputLabelTransform,
  labelDelimiter = 'to',
  labelLower = 'Less than ',
  labelUpper = 'More than ',
  ...restProps
}: LegendThresholdProps<Datum, Output>) {
  const domain = inputDomain || (scale.domain() as Datum[]); // this was .range?

  const labelTransform =
    inputLabelTransform ||
    defaultTransform<Output>({
      labelDelimiter,
      labelLower,
      labelUpper,
    });

  return (
    <Legend<Datum, Output, ScaleThreshold<Datum, Output>>
      scale={scale}
      domain={domain}
      labelFormat={labelFormat}
      labelTransform={labelTransform}
      {...restProps}
    />
  );
}
