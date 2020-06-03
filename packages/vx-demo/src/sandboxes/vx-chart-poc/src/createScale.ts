import { scaleLinear, scaleTime, scaleUtc, scaleBand, scaleOrdinal } from '@vx/scale';
import { extent } from 'd3-array';
import { DataRegistry, ScaleConfig } from './types';

export const scaleTypeToScale = {
  time: scaleTime,
  timeUtc: scaleUtc,
  linear: scaleLinear,
  band: scaleBand,
  ordinal: scaleOrdinal,
};

interface CreateScaleConfig {
  config: ScaleConfig;
  range: [number, number];
  dataRegistry: DataRegistry;
  accessorKey: 'xAccessor' | 'yAccessor';
}

export default function createScale({
  config,
  range,
  accessorKey,
  dataRegistry,
}: CreateScaleConfig) {
  const { includeZero, type: scaleType, ...scaleConfig } = config;

  const scaleGenerator = scaleTypeToScale?.[config.type] ?? scaleLinear;

  if (scaleTypeToScale[config.type] == null) {
    console.warn(`Unknown scale type ${config.type}, defaulting to Linear scale`);
  }

  const allDataValues = Object.values(dataRegistry).reduce(
    (combined, curr) => [...combined, ...curr.data.map(d => curr[accessorKey](d))],
    [],
  );

  let domain;
  let min: number | null;
  let max: number | null;

  switch (scaleType) {
    case 'band':
    case 'ordinal':
      domain = allDataValues;
      break;
    case 'linear':
    case 'time':
    case 'timeUtc':
    default:
      [min, max] = extent(allDataValues, d => d);
      domain = [
        config.type === 'linear' && config.includeZero ? Math.min(0, min) : min,
        config.type === 'linear' && config.includeZero ? Math.max(0, max) : max,
      ];
  }

  return scaleGenerator({ domain, range, ...scaleConfig });
}
