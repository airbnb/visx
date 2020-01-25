import React from 'react';
import Legend, { LegendProps } from './Legend';
import { StringNumberDate, ScaleThreshold, LabelFormatterFactory } from '../types';

const formatZero = (label: unknown) => (label === 0 ? '0' : label || '');

export type LegendThresholdProps<Datum extends StringNumberDate, Output> = LegendProps<
  Datum,
  Output,
  ScaleThreshold<Datum, Output>
> & {
  labelDelimiter?: string;
  labelLower?: string;
  labelUpper?: string;
  labelTransform?: LabelFormatterFactory<Datum, Output, ScaleThreshold<Datum, Output>>;
};

/** Default transform implicitly assumes that Datum is of type number. */
function defaultTransform<Datum extends StringNumberDate, Output>({
  labelDelimiter,
  labelLower,
  labelUpper,
}: Pick<
  LegendThresholdProps<Datum, Output>,
  'labelDelimiter' | 'labelLower' | 'labelUpper'
>): LabelFormatterFactory<Datum, Output, ScaleThreshold<Datum, Output>> {
  return ({ scale, labelFormat }) => {
    const scaleRange = scale.range();
    const scaleDomain = scale.domain();

    return (d, i) => {
      const [d0, d1]: [Datum | undefined, Datum | undefined] =
        scaleRange.length >= i ? scale.invertExtent(scaleRange[i]) : [undefined, undefined];

      let delimiter = ` ${labelDelimiter} `;
      let text = '';
      let value: number | Datum | undefined;

      if (d0 == null && typeof d1 === 'number') {
        // lower threshold e.g., [undefined, number]
        delimiter = labelLower || delimiter;
        value = d1 - 1;
        text = `${delimiter}${formatZero(labelFormat(d1, i))}`;
      } else if (d0 != null && d1 != null) {
        // threshold step
        value = d;
        text = `${formatZero(labelFormat(d0, i))}${delimiter}${formatZero(labelFormat(d1, i))}`;
      } else if (typeof d0 === 'number' && d1 == null) {
        // upper threshold e.g., [number, undefined]
        delimiter = labelUpper || delimiter;
        value = d0 + (scaleDomain[1] as number); // x0,x1 are from the domain, so the domain is numeric if d0 is
        text = `${delimiter}${formatZero(labelFormat(d0, i))}`;
      }

      return {
        extent: [d0, d1],
        value: scale((value as Datum) || d),
        text,
        datum: d,
        index: i,
      };
    };
  };
}

export default function LegendThreshold<Datum extends StringNumberDate, Output>({
  scale,
  domain: inputDomain,
  labelFormat = (d: Datum) => d,
  labelTransform: inputLabelTransform,
  labelDelimiter = 'to',
  labelLower = 'Less than ',
  labelUpper = 'More than ',
  ...restProps
}: LegendThresholdProps<Datum, Output>) {
  // d3 docs specify that for n values in a domain, there should be n+1 values in the range
  // https://github.com/d3/d3-scale#threshold_domain
  // therefore if a domain is not specified we transform the range into input values
  // because it should contain more elements
  const domain =
    inputDomain || (scale.range().map(output => scale.invertExtent(output)[0]) as Datum[]);

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
