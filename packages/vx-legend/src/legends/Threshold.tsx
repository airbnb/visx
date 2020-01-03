import React from 'react';
import Legend, { LegendProps } from './Legend';
import { StringNumberDate, ScaleThreshold, LabelFormatterFactory } from '../types';

const formatZero = (label: unknown) => (label === 0 ? '0' : label || '');

export type LegendThresholdProps<Datum extends StringNumberDate, Output> = LegendProps<
  Datum,
  Output,
  // @ts-ignore @TODO fix `Type 'ScaleThreshold<Datum, Output>' does not satisfy the constraint 'ScaleType<Datum, Output>'.ts(2344)`
  ScaleThreshold<Datum, Output>
> & {
  labelDelimiter?: string;
  labelLower?: string;
  labelUpper?: string;
  // @ts-ignore @TODO fix `Type 'ScaleThreshold<Datum, Output>' does not satisfy the constraint 'ScaleType<Datum, Output>'.ts(2344)`
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
  // @ts-ignore @TODO fix `Type 'ScaleThreshold<Datum, Output>' does not satisfy the constraint 'ScaleType<Datum, Output>'.ts(2344)`
>): LabelFormatterFactory<Datum, Output, ScaleThreshold<Datum, Output>> {
  return ({ scale, labelFormat }) => {
    const scaleRange = scale.range();
    const scaleDomain = scale.domain();

    return (d, i) => {
      // d3 docs specify that for n values in a domain, there should be n+1 values in the range
      // https://github.com/d3/d3-scale#threshold_domain
      // d comes from the domain, therefore there should always be a matching range value in a valid scale
      const [x0, x1]: [Datum | undefined, Datum | undefined] =
        scaleRange.length >= i ? scale.invertExtent(scale.range()[i]) : [undefined, undefined];

      let delimiter = ` ${labelDelimiter} `;
      let value: number | Datum | undefined;

      if (x0 == null && typeof x1 === 'number') {
        // lower threshold e.g., [undefined, number]
        value = x1 - 1;
        delimiter = labelLower || delimiter;
      } else if (x0 != null && x1 != null) {
        // threshold step
        value = x0;
      } else if (typeof x0 === 'number' && x1 == null) {
        // upper threshold e.g., [number, undefined]
        value = x0 + (scaleDomain[1] as number); // x0,x1 are from the domain, so if the domain is numeric if x0 is
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
  const domain = inputDomain || (scale.domain() as Datum[]);
  const labelTransform =
    inputLabelTransform ||
    defaultTransform<Datum, Output>({
      labelDelimiter,
      labelLower,
      labelUpper,
    });

  return (
    // @ts-ignore @TODO fix `Type 'ScaleThreshold<Datum, Output>' does not satisfy the constraint 'ScaleType<Datum, Output>'.ts(2344)`
    <Legend<Datum, Output, ScaleThreshold<Datum, Output>>
      scale={scale}
      domain={domain}
      labelFormat={labelFormat}
      labelTransform={labelTransform}
      {...restProps}
    />
  );
}
