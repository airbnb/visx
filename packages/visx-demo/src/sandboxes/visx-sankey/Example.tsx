import React, { useState } from 'react';
import { Sankey, sankeyCenter, sankeyRight, sankeyLeft, sankeyJustify } from '@visx/sankey';
import energy from './energy.json';

console.log({ energy });

const controlStyles = { fontSize: 10 };

export const background = '#84dccf';
export const color = '#392f5a';

type NodeDatum = { name: string };
type LinkDatum = {};

const nodeAlignments = {
  sankeyCenter,
  sankeyJustify,
  sankeyLeft,
  sankeyRight,
} as const;

const defaultMargin = { top: 10, left: 10, right: 10, bottom: 10 };

export type SankeyDemoProps = {
  width: number;
  height: number;
  showControls?: boolean;
  margin?: { top: number; right: number; bottom: number; left: number };
};

export default function SankeyDemo({
  width,
  height,
  showControls = true,
  margin = defaultMargin,
}: SankeyDemoProps) {
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  const [nodeAlignment, setTileMethod] = useState<keyof typeof nodeAlignments>('sankeyCenter');
  const [nodePadding, setNodePadding] = useState(10);
  const [nodeWidth, setNodeWidth] = useState(10);

  if (width < 10) return null;

  return (
    <div style={{}}>
      {showControls && (
        <div style={controlStyles}>
          <label>
            node alignment{' '}
            <select
              onClick={(e) => e.stopPropagation()}
              onChange={(e) => setTileMethod(e.target.value as keyof typeof nodeAlignments)}
              value={nodeAlignment}
            >
              {Object.keys(nodeAlignments).map((alignment) => (
                <option key={alignment} value={alignment}>
                  {alignment}
                </option>
              ))}
            </select>
          </label>{' '}
          <label>
            node padding{' '}
            <input
              type="number"
              value={nodePadding}
              onChange={(e) => setNodePadding(Number(e.target.value))}
            />
          </label>{' '}
          <label>
            node width{' '}
            <input
              type="number"
              value={nodeWidth}
              onChange={(e) => setNodeWidth(Number(e.target.value))}
            />
          </label>
        </div>
      )}
      <div
        style={{
          background,
          padding: `${margin.top}px ${margin.right}px ${margin.bottom}px ${margin.left}px`,
          borderRadius: 5,
        }}
      >
        <svg width={width} height={height}>
          <Sankey<NodeDatum, LinkDatum>
            root={energy}
            nodeWidth={nodeWidth}
            size={[xMax, yMax]}
            nodePadding={nodePadding}
            nodeAlign={nodeAlignments[nodeAlignment]}
            nodeProps={{
              fill: color,
            }}
            linkProps={{
              stroke: color,
            }}
          />
        </svg>
      </div>
    </div>
  );
}
