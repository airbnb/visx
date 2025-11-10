import type { PickD3Scale, ScaleInput } from '@visx/scale';
import type { LegendProps } from './Legend';
import Legend from './Legend';
import type { LabelFormatterFactory } from '../types';
import identity from '../util/identity';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyThresholdScale = PickD3Scale<'threshold', any, any, any>;

const formatZero = (label: unknown) => (label === 0 ? '0' : label || '');

type TransformProps = {
  /** The delimiter string to use between threshold values (e.g., '-' renders as '0 - 10'). */
  labelDelimiter?: string;
  /** The prefix to use for the lower threshold label (e.g., '<' renders as '< 10'). */
  labelLower?: string;
  /** The prefix to use for the upper threshold label (e.g., '>' renders as '> 100'). */
  labelUpper?: string;
};

export type LegendThresholdProps<Scale extends AnyThresholdScale> = LegendProps<Scale> &
  TransformProps & {
    labelTransform?: LabelFormatterFactory<Scale>;
  };

/** Default transform implicitly assumes that Datum is of type number. */
function defaultTransform<Scale extends AnyThresholdScale>({
  labelDelimiter,
  labelLower,
  labelUpper,
}: TransformProps): LabelFormatterFactory<Scale> {
  return ({ scale, labelFormat }) => {
    const scaleRange = scale.range();

    type Datum = ScaleInput<Scale>;

    return (d, i) => {
      const [d0, d1] =
        scaleRange.length >= i ? scale.invertExtent(scaleRange[i]) : [undefined, undefined];

      let delimiter = ` ${labelDelimiter} `;
      let text = '';
      let value: number | Datum | undefined;

      if (d0 == null && typeof d1 === 'number') {
        // lower threshold e.g., [undefined, number]
        delimiter = labelLower || delimiter;
        value = d1 - Math.abs(2 * d1 - 1); // guarantees a value smaller than the lower threshold
        text = `${delimiter}${formatZero(labelFormat(d1, i))}`;
      } else if (d0 != null && d1 != null) {
        // threshold step
        value = d;
        text = `${formatZero(labelFormat(d0, i))}${delimiter}${formatZero(labelFormat(d1, i))}`;
      } else if (typeof d0 === 'number' && d1 == null) {
        // upper threshold e.g., [number, undefined]
        delimiter = labelUpper || delimiter;
        value = d0 + Math.abs(2 * d0 + 1); // // guarantees a value larger than the upper threshold
        text = `${delimiter}${formatZero(labelFormat(d0, i))}`;
      }

      return {
        extent: [d0, d1],
        value: scale(value),
        text,
        datum: d,
        index: i,
      };
    };
  };
}

/**
 * A Threshold legend component for threshold scales.
 * Threshold scales map continuous input values to discrete output values based on threshold boundaries.
 * This component displays the threshold ranges with customizable delimiters and labels.
 */
export default function Threshold<Scale extends AnyThresholdScale>({
  scale,
  domain: inputDomain,
  labelFormat = identity,
  labelTransform: inputLabelTransform,
  labelDelimiter = 'to',
  labelLower = 'Less than ',
  labelUpper = 'More than ',
  ...restProps
}: LegendThresholdProps<Scale>) {
  // d3 docs specify that for n values in a domain, there should be n+1 values in the range
  // https://github.com/d3/d3-scale#threshold_domain
  // therefore if a domain is not specified we transform the range into input values
  // because it should contain more elements

  const domain =
    inputDomain || scale.range().map((output) => scale.invertExtent(output)[0] as Range);

  const labelTransform =
    inputLabelTransform ||
    defaultTransform<Scale>({
      labelDelimiter,
      labelLower,
      labelUpper,
    });

  return (
    <Legend<Scale>
      scale={scale}
      domain={domain}
      labelFormat={labelFormat}
      labelTransform={labelTransform}
      {...restProps}
    />
  );
}
