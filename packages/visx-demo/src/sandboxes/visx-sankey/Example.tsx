import React, { useState } from 'react';
import type { SankeyNode } from '@visx/sankey';
import { Sankey, sankeyCenter, sankeyRight, sankeyLeft, sankeyJustify } from '@visx/sankey';
import { Group } from '@visx/group';
import { BarRounded, LinkHorizontal } from '@visx/shape';
import { useTooltip, TooltipWithBounds } from '@visx/tooltip';
import { localPoint } from '@visx/event';

import energy from './energy.json';

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
  const { tooltipData, tooltipLeft, tooltipTop, tooltipOpen, showTooltip, hideTooltip } =
    useTooltip();
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  const [nodeAlignment, setTileMethod] = useState<keyof typeof nodeAlignments>('sankeyCenter');
  const [nodePadding, setNodePadding] = useState(10);
  const [nodeWidth, setNodeWidth] = useState(10);

  if (width < 10) return null;

  return (
    <div>
      <style>{`
        .visx-sankey-link:hover {
          stroke-opacity: 0.7; 
        }
        .visx-sankey-node:hover {
          filter: brightness(1.3);
        }
        .visx-sankey-demo-container {
          background: ${background};
          padding: ${margin.top}px ${margin.right}px ${margin.bottom}px ${margin.left}px;
          border-radius: 5px;
          position: relative;
        }
        .visx-sankey-demo-controls {
          font-size: 12px;
        }
      `}</style>
      {showControls && (
        <div className="visx-sankey-demo-controls">
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
      <div className="visx-sankey-demo-container">
        <svg width={xMax} height={yMax}>
          <Sankey<NodeDatum, LinkDatum>
            root={energy}
            nodeWidth={nodeWidth}
            size={[xMax, yMax]}
            nodePadding={nodePadding}
            nodeAlign={nodeAlignments[nodeAlignment]}
          >
            {({ graph, createPath }) => (
              <>
                <Group>
                  {graph.links.map((link, i) => (
                    <LinkHorizontal
                      key={i}
                      className="visx-sankey-link"
                      data={link}
                      path={createPath}
                      fill="transparent"
                      stroke={color}
                      strokeWidth={link.width}
                      strokeOpacity={0.5}
                      onPointerMove={(event) => {
                        const coords = localPoint(
                          (event.target as SVGElement).ownerSVGElement,
                          event,
                        );
                        showTooltip({
                          tooltipData: `${
                            (link.source as SankeyNode<NodeDatum, LinkDatum>).name
                          } > ${(link.target as SankeyNode<NodeDatum, LinkDatum>).name} = ${
                            link.value
                          }`,
                          tooltipTop: (coords?.y ?? 0) + 10,
                          tooltipLeft: (coords?.x ?? 0) + 10,
                        });
                      }}
                      onMouseOut={hideTooltip}
                    />
                  ))}
                </Group>
                <Group>
                  {graph.nodes.map(({ y0, y1, x0, x1, name }, i) => (
                    <BarRounded
                      key={i}
                      className="visx-sankey-node"
                      width={x1 - x0}
                      height={y1 - y0}
                      x={x0}
                      y={y0}
                      radius={3}
                      all
                      fill={color}
                      onPointerMove={(event) => {
                        const coords = localPoint(
                          (event.target as SVGElement).ownerSVGElement,
                          event,
                        );
                        showTooltip({
                          tooltipData: name,
                          tooltipTop: (coords?.y ?? 0) + 10,
                          tooltipLeft: (coords?.x ?? 0) + 10,
                        });
                      }}
                      onMouseOut={hideTooltip}
                    />
                  ))}
                </Group>
              </>
            )}
          </Sankey>
        </svg>
        {tooltipOpen && (
          <TooltipWithBounds key={Math.random()} top={tooltipTop} left={tooltipLeft}>
            {tooltipData}
          </TooltipWithBounds>
        )}
      </div>
    </div>
  );
}
