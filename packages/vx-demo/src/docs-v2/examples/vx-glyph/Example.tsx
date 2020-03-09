/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import { Group } from '@vx/group';
import {
  Glyph as CustomGlyph,
  GlyphCircle,
  GlyphCross,
  GlyphDiamond,
  GlyphSquare,
  GlyphStar,
  GlyphTriangle,
  GlyphWye,
} from '@vx/glyph';
import { LinePath } from '@vx/shape';
import genDateValue, { DateValue } from '@vx/mock-data/lib/generators/genDateValue';
import { scaleTime, scaleLinear } from '@vx/scale';
import { curveMonotoneX, curveBasis } from '@vx/curve';

const defaultMargin = { top: 10, right: 10, bottom: 10, left: 10 };

// colors
const primary = '#8921e0';
const secondary = '#00f2ff';
const contrast = '#ffffff';

// Glyphs to render
const Glyphs = [
  GlyphCircle,
  GlyphCross,
  GlyphDiamond,
  GlyphStar,
  GlyphTriangle,
  GlyphSquare,
  GlyphWye,
  ({ left, top }: { left: number; top: number }) => (
    <CustomGlyph left={left} top={top}>
      <circle r={12} fill={secondary} />
      <text fontSize={16} textAnchor="middle" dy="0.5em">
        {'💜'}
      </text>
    </CustomGlyph>
  ),
];

const data: DateValue[] = genDateValue(Glyphs.length * 2);

// accessors
const date = (d: DateValue) => d.date.valueOf();
const value = (d: DateValue) => d.value;

// scales
const xScale = scaleTime<number>({
  domain: [Math.min(...data.map(date)), Math.max(...data.map(date))],
});
const yScale = scaleLinear<number>({
  domain: [0, Math.max(...data.map(value))],
});

// positions
const getX = (d: DateValue) => xScale(date(d));
const getY = (d: DateValue) => yScale(value(d));

type Props = {
  width: number;
  height: number;
  margin?: typeof defaultMargin;
};

export default function Example({ width, height, margin = defaultMargin }: Props) {
  if (width < 10) return null;

  // bounds
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // update scale range to match bounds
  xScale.range([0, innerWidth]);
  yScale.range([innerHeight, 0]);

  return (
    <svg width={width} height={height}>
      <rect x={0} y={0} width={width} height={height} fill={secondary} rx={14} />
      <Group left={margin.left} top={margin.top}>
        <LinePath
          data={data}
          x={getX}
          y={getY}
          stroke={primary}
          strokeWidth={2}
          strokeDasharray="2,2"
          curve={curveBasis}
        />
        <LinePath
          data={data}
          x={getX}
          y={getY}
          stroke={primary}
          strokeWidth={2}
          curve={curveMonotoneX}
        />
        {data.map((d, i) => {
          const CurrGlyph = Glyphs[i % Glyphs.length];
          const left = getX(d);
          const top = getY(d);
          return (
            <g key={`line-glyph-${i}`}>
              <CurrGlyph left={left} top={top} size={110} stroke={secondary} strokeWidth={10} />
              <CurrGlyph
                left={left}
                top={top}
                size={110}
                fill={i % 2 === 0 ? primary : contrast}
                stroke={i % 2 === 0 ? contrast : primary}
                strokeWidth={2}
              />
            </g>
          );
        })}
      </Group>
    </svg>
  );
}
