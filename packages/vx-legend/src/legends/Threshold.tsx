import React from 'react';
import Legend, { LegendProps } from './Legend';
import { BaseInput, BaseOutput, ScaleThreshold, LabelFormatterFactory } from '../types';

const formatZero = (label: unknown) => (label === 0 ? '0' : label || '');

export type LegendThresholdProps<Datum extends BaseInput, Output extends BaseOutput> = {
  labelDelimiter?: string;
  labelLower?: string;
  labelUpper?: string;
  labelTransform?: LabelFormatterFactory<Datum, Output, ScaleThreshold<Datum, Output>>;
  scale: ScaleThreshold<Datum, Output>;
} & LegendProps<Datum, Output>;

/** Default transform implicitly assumes that Datum is of type number. */
function defaultTransform<Datum extends BaseInput, Output extends BaseOutput>({
  labelDelimiter,
  labelLower,
  labelUpper,
}: Pick<
  LegendThresholdProps<Datum, Output>,
  'labelDelimiter' | 'labelLower' | 'labelUpper'
>): LabelFormatterFactory<Datum, Output, ScaleThreshold<Datum, Output>> {
  return ({ scale, labelFormat }) => (d, i) => {
    let [x0, x1] = scale.invertExtent(scale.range()[i]);
    let delimiter = ` ${labelDelimiter} `;
    let value: number | Datum | undefined;

    if (typeof x1 === 'number' && x0 !== 0 && !x0 && (x1 === 0 || !!x1)) {
      // lower threshold
      value = x1 - 1;
      delimiter = labelLower || delimiter;
    } else if ((x0 === 0 || !!x0) && (x1 === 0 || !!x1)) {
      // threshold step
      value = x0;
    } else if (typeof x0 === 'number' && !x1 && (x0 === 0 || !!x0)) {
      // upper threshold
      value = x0 + (scale.domain()[1] as number); // if x0,x1 are numbers, so is the domain
      x1 = x0;
      x0 = undefined;
      delimiter = labelUpper || delimiter;
    }

    return {
      extent: [x0, x1],
      text: `${x0 == null ? '' : formatZero(labelFormat(x0 || d, i))}${delimiter}${
        x1 == null ? '' : formatZero(labelFormat(x1 || d, i))
      }`,
      value: scale((value as Datum) || d),
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
  const domain = inputDomain || (scale.domain() as Datum[]);

  const labelTransform =
    inputLabelTransform ||
    defaultTransform<Datum, Output>({
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
