import { PickScaleConfigWithoutType, ScaleConfigWithoutType } from './types/ScaleConfig';
import { DefaultThresholdInput, D3Scale, PickD3Scale } from './types/Scale';
import { StringLike, DefaultOutput } from './types/Base';
import scaleOperator, { ALL_OPERATORS } from './operators/scaleOperator';

const applyAllOperators = scaleOperator(...ALL_OPERATORS);

// Overload function signature for more strict typing, e.g.,
// If the scale is a ScaleLinear, the config is a linear config.

function updateScale<
  Output = DefaultOutput,
  DiscreteInput extends StringLike = StringLike,
  ThresholdInput extends DefaultThresholdInput = DefaultThresholdInput,
>(
  scale: PickD3Scale<'linear', Output>,
  config: PickScaleConfigWithoutType<'linear', Output>,
): PickD3Scale<'linear', Output>;

function updateScale<
  Output = DefaultOutput,
  DiscreteInput extends StringLike = StringLike,
  ThresholdInput extends DefaultThresholdInput = DefaultThresholdInput,
>(
  scale: PickD3Scale<'log', Output>,
  config: PickScaleConfigWithoutType<'log', Output>,
): PickD3Scale<'log', Output>;

function updateScale<
  Output = DefaultOutput,
  DiscreteInput extends StringLike = StringLike,
  ThresholdInput extends DefaultThresholdInput = DefaultThresholdInput,
>(
  scale: PickD3Scale<'pow', Output>,
  config: PickScaleConfigWithoutType<'pow', Output>,
): PickD3Scale<'pow', Output>;

function updateScale<
  Output = DefaultOutput,
  DiscreteInput extends StringLike = StringLike,
  ThresholdInput extends DefaultThresholdInput = DefaultThresholdInput,
>(
  scale: PickD3Scale<'sqrt', Output>,
  config: PickScaleConfigWithoutType<'sqrt', Output>,
): PickD3Scale<'sqrt', Output>;

function updateScale<
  Output = DefaultOutput,
  DiscreteInput extends StringLike = StringLike,
  ThresholdInput extends DefaultThresholdInput = DefaultThresholdInput,
>(
  scale: PickD3Scale<'symlog', Output>,
  config: PickScaleConfigWithoutType<'symlog', Output>,
): PickD3Scale<'symlog', Output>;

function updateScale<
  Output = DefaultOutput,
  DiscreteInput extends StringLike = StringLike,
  ThresholdInput extends DefaultThresholdInput = DefaultThresholdInput,
>(
  scale: PickD3Scale<'time', Output>,
  config: PickScaleConfigWithoutType<'time', Output>,
): PickD3Scale<'time', Output>;

function updateScale<
  Output = DefaultOutput,
  DiscreteInput extends StringLike = StringLike,
  ThresholdInput extends DefaultThresholdInput = DefaultThresholdInput,
>(
  scale: PickD3Scale<'utc', Output>,
  config: PickScaleConfigWithoutType<'utc', Output>,
): PickD3Scale<'utc', Output>;

function updateScale<
  Output = DefaultOutput,
  DiscreteInput extends StringLike = StringLike,
  ThresholdInput extends DefaultThresholdInput = DefaultThresholdInput,
>(
  scale: PickD3Scale<'quantile', Output>,
  config: PickScaleConfigWithoutType<'quantile', Output>,
): PickD3Scale<'quantile', Output>;

function updateScale<
  Output = DefaultOutput,
  DiscreteInput extends StringLike = StringLike,
  ThresholdInput extends DefaultThresholdInput = DefaultThresholdInput,
>(
  scale: PickD3Scale<'quantize', Output>,
  config: PickScaleConfigWithoutType<'quantize', Output>,
): PickD3Scale<'quantize', Output>;

function updateScale<
  Output = DefaultOutput,
  DiscreteInput extends StringLike = StringLike,
  ThresholdInput extends DefaultThresholdInput = DefaultThresholdInput,
>(
  scale: PickD3Scale<'threshold', Output, StringLike, ThresholdInput>,
  config: PickScaleConfigWithoutType<'threshold', Output, StringLike, ThresholdInput>,
): PickD3Scale<'threshold', Output, StringLike, ThresholdInput>;

function updateScale<
  Output = DefaultOutput,
  DiscreteInput extends StringLike = StringLike,
  ThresholdInput extends DefaultThresholdInput = DefaultThresholdInput,
>(
  scale: PickD3Scale<'ordinal', Output, DiscreteInput>,
  config: PickScaleConfigWithoutType<'ordinal', Output, DiscreteInput>,
): PickD3Scale<'ordinal', Output, DiscreteInput>;

function updateScale<
  Output = DefaultOutput,
  DiscreteInput extends StringLike = StringLike,
  ThresholdInput extends DefaultThresholdInput = DefaultThresholdInput,
>(
  scale: PickD3Scale<'point', Output, DiscreteInput>,
  config: PickScaleConfigWithoutType<'point', Output, DiscreteInput>,
): PickD3Scale<'point', Output, DiscreteInput>;

function updateScale<
  Output = DefaultOutput,
  DiscreteInput extends StringLike = StringLike,
  ThresholdInput extends DefaultThresholdInput = DefaultThresholdInput,
>(
  scale: PickD3Scale<'band', Output, DiscreteInput>,
  config: PickScaleConfigWithoutType<'band', Output, DiscreteInput>,
): PickD3Scale<'band', Output, DiscreteInput>;

function updateScale<
  Output = DefaultOutput,
  DiscreteInput extends StringLike = StringLike,
  ThresholdInput extends DefaultThresholdInput = DefaultThresholdInput,
  Scale extends D3Scale<Output, DiscreteInput, ThresholdInput> = D3Scale<
    Output,
    DiscreteInput,
    ThresholdInput
  >,
>(scale: Scale, config?: undefined): Scale;

// Actual implementation

function updateScale<
  Output,
  DiscreteInput extends StringLike,
  ThresholdInput extends DefaultThresholdInput,
>(
  scale: D3Scale<Output, DiscreteInput, ThresholdInput>,
  config?: ScaleConfigWithoutType<Output, DiscreteInput, ThresholdInput>,
) {
  return applyAllOperators(scale.copy(), config);
}

export default updateScale;
