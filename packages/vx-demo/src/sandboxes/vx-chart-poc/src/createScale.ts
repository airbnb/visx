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

export default function createScale({
  config,
  range,
  accessorKey,
  dataRegistry,
}: {
  config: ScaleConfig;
  range: [number, number];
  dataRegistry: DataRegistry;
  accessorKey: 'xAccessor' | 'yAccessor';
}) {
  const { includeZero, type: scaleType, ...scaleConfig } = config;

  if (scaleTypeToScale[config.type] == null) {
    console.warn(`Unknown scale type ${config.type}, defaulting to Linear scale`);
  }

  const scaleGenerator = scaleTypeToScale?.[config.type] ?? scaleLinear;

  const allValues = Object.values(dataRegistry).reduce(
    (combined, curr) => [...combined, ...curr.data.map(d => curr[accessorKey](d))],
    [],
  );

  let domain;
  let min: number | null;
  let max: number | null;
  switch (scaleType) {
    case 'band':
    case 'ordinal':
      domain = allValues;
      break;
    case 'linear':
    case 'time':
    case 'timeUtc':
    default:
      [min, max] = extent(allValues, d => d);
      domain = [
        config.type === 'linear' && config.includeZero ? Math.min(0, min) : min,
        config.type === 'linear' && config.includeZero ? Math.max(0, max) : max,
      ];
  }

  return scaleGenerator({ domain, range, ...scaleConfig });
}
