import { scaleLinear, scaleTime, scaleUtc, scaleBand, scaleOrdinal } from '@vx/scale';
import { extent } from 'd3-array';
import { ScaleConfig, StringLike, NumberLike, ScaleOutput } from './types';

interface CreateScaleConfig<ScaleInput> {
  data: ScaleInput[];
  range: [number, number];
  scaleConfig: ScaleConfig<ScaleInput>;
}

export default function createScale<ScaleInput>({
  data,
  range: defaultRange,
  scaleConfig,
}: CreateScaleConfig<ScaleInput>) {
  const { includeZero, type: scaleType, ...restConfig } = scaleConfig;

  // use blocks so types are happy
  if (scaleType === 'band') {
    const range = (restConfig.range as [ScaleOutput, ScaleOutput]) || defaultRange;
    return scaleBand<StringLike>({
      domain: data,
      ...restConfig,
      range,
    });
  }
  if (scaleType === 'ordinal') {
    const range = (restConfig.range as [ScaleOutput, ScaleOutput]) || defaultRange;
    return scaleOrdinal<StringLike, ScaleOutput>({
      domain: data,
      ...restConfig,
      range,
    });
  }
  if (scaleType === 'linear') {
    const [min, max] = extent((data as unknown[]) as number[], d => d);
    const domain: number[] = ((restConfig.domain as unknown[]) as number[]) || [
      scaleType === 'linear' && includeZero ? Math.min(0, min) : min,
      scaleType === 'linear' && includeZero ? Math.max(0, max) : max,
    ];
    const range = (restConfig.range as ScaleOutput[]) || defaultRange;
    return scaleLinear<ScaleOutput>({
      ...restConfig,
      domain,
      range,
    });
  }

  const range = (restConfig.range as ScaleOutput[]) || defaultRange;
  const domain =
    ((restConfig.domain as unknown[]) as NumberLike[]) ||
    extent((data as unknown[]) as NumberLike[], d => d);

  return (scaleType === 'time' ? scaleTime : scaleUtc)<ScaleOutput>({
    ...restConfig,
    domain,
    range,
  });
}
