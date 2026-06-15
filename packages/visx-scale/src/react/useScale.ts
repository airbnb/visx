/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-redeclare */
import { useMemo } from 'react';
import createScale from '../createScale';
import type { DefaultThresholdInput, D3Scale, PickD3Scale } from '../types/Scale';
import type { DefaultOutput, StringLike } from '../types/Base';
import type {
  PickScaleConfig,
  PickScaleConfigWithoutType,
  ScaleConfig,
} from '../types/ScaleConfig';

function useScale<Output = DefaultOutput>(
  config?: PickScaleConfig<'linear', Output> | PickScaleConfigWithoutType<'linear', Output>,
): PickD3Scale<'linear', Output>;

function useScale<Output = DefaultOutput>(
  config: PickScaleConfig<'log', Output>,
): PickD3Scale<'log', Output>;

function useScale<Output = DefaultOutput>(
  config: PickScaleConfig<'pow', Output>,
): PickD3Scale<'pow', Output>;

function useScale<Output = DefaultOutput>(
  config: PickScaleConfig<'sqrt', Output>,
): PickD3Scale<'sqrt', Output>;

function useScale<Output = DefaultOutput>(
  config: PickScaleConfig<'symlog', Output>,
): PickD3Scale<'symlog', Output>;

function useScale<Output = DefaultOutput>(
  config: PickScaleConfig<'time', Output>,
): PickD3Scale<'time', Output>;

function useScale<Output = DefaultOutput>(
  config: PickScaleConfig<'utc', Output>,
): PickD3Scale<'utc', Output>;

function useScale<Output = DefaultOutput>(
  config: PickScaleConfig<'quantile', Output>,
): PickD3Scale<'quantile', Output>;

function useScale<Output = DefaultOutput>(
  config: PickScaleConfig<'quantize', Output>,
): PickD3Scale<'quantize', Output>;

function useScale<
  Output = DefaultOutput,
  DiscreteInput extends StringLike = StringLike,
  ThresholdInput extends DefaultThresholdInput = DefaultThresholdInput,
>(
  config: PickScaleConfig<'threshold', Output, DiscreteInput, ThresholdInput>,
): PickD3Scale<'threshold', Output, DiscreteInput, ThresholdInput>;

function useScale<
  Output = DefaultOutput,
  DiscreteInput extends StringLike = StringLike,
  ThresholdInput extends DefaultThresholdInput = DefaultThresholdInput,
>(
  config: PickScaleConfig<'ordinal', Output, DiscreteInput>,
): PickD3Scale<'ordinal', Output, DiscreteInput>;

function useScale<
  Output = DefaultOutput,
  DiscreteInput extends StringLike = StringLike,
  ThresholdInput extends DefaultThresholdInput = DefaultThresholdInput,
>(
  config: PickScaleConfig<'point', Output, DiscreteInput>,
): PickD3Scale<'point', Output, DiscreteInput>;

function useScale<
  Output = DefaultOutput,
  DiscreteInput extends StringLike = StringLike,
  ThresholdInput extends DefaultThresholdInput = DefaultThresholdInput,
>(
  config: PickScaleConfig<'band', Output, DiscreteInput>,
): PickD3Scale<'band', Output, DiscreteInput>;

function useScale<Output = DefaultOutput>(
  config: PickScaleConfig<'radial', Output>,
): PickD3Scale<'radial', Output>;

function useScale<
  Output = DefaultOutput,
  DiscreteInput extends StringLike = StringLike,
  ThresholdInput extends DefaultThresholdInput = DefaultThresholdInput,
>(
  config: ScaleConfig<Output, DiscreteInput, ThresholdInput>,
): D3Scale<Output, DiscreteInput, ThresholdInput>;

function useScale(config?: unknown): unknown {
  return useMemo(() => createScale(config as ScaleConfig), [config]);
}

export default useScale;
