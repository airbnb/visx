import React, { useMemo } from 'react';
import appleStock, { AppleStock } from '@vx/mock-data/lib/mocks/appleStock';
import { GridRows, GridColumns } from '@vx/grid';
import { scaleTime, scaleLinear } from '@vx/scale';
import { max, extent } from 'd3-array';

const stock = appleStock.slice(800);
export const background = '#000000';

export const accentColor = '#66d981';
export const accentColorDark = '#7d81f6';

// accessors
const getDate = (d: AppleStock) => new Date(d.date);
const getStockValue = (d: AppleStock) => d.close;

export type GridProps = {
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
};

export default function Example({
  width,
  height,
  margin = { top: 0, right: 0, bottom: 0, left: 0 },
}: GridProps) {
  // bounds
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  // scales
  const dateScale = useMemo(
    () =>
      scaleTime({
        range: [0, xMax],
        domain: extent(stock, getDate) as [Date, Date],
      }),
    [xMax]
  );
  const stockValueScale = useMemo(
    () =>
      scaleLinear({
        range: [yMax, 0],
        domain: [0, (max(stock, getStockValue) || 0) + yMax / 3],
        nice: true,
      }),
    [yMax]
  );

  // tooltip handler

  return (
    <div>
      <svg width={width} height={height}>
        <rect
          x={0}
          y={0}
          width={width}
          height={height}
          fill={background}
          rx={14}
        />
        <GridRows<any>
          scale={stockValueScale}
          width={xMax}
          strokeDasharray="3,3"
          pointerEvents="none"
          gridRowLineProps={(tick, index) => ({
            stroke: index % 2 ? accentColorDark : accentColor,
            strokeWidth: index % 2 ? 1 : 2,
          })}
        />
        <GridColumns<any>
          scale={dateScale}
          height={yMax}
          strokeDasharray="3,3"
          stroke={accentColor}
          pointerEvents="none"
          gridColumnLineProps={(tick, index) => ({
            stroke: index % 2 ? accentColorDark : accentColor,
          })}
        />
      </svg>
    </div>
  );
}
