/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useState } from 'react';
import { Group } from '@vx/group';
import { hierarchy, Tree } from '@vx/hierarchy';
import { HierarchyPointLink } from '@vx/hierarchy/lib/types';
import { LinearGradient } from '@vx/gradient';
import { pointRadial } from 'd3-shape';

import {
  LinkHorizontal,
  LinkVertical,
  LinkRadial,
  LinkHorizontalStep,
  LinkVerticalStep,
  LinkRadialStep,
  LinkHorizontalCurve,
  LinkVerticalCurve,
  LinkRadialCurve,
  LinkHorizontalLine,
  LinkVerticalLine,
  LinkRadialLine,
} from '@vx/shape';
import { SharedLinkProps } from '@vx/shape/lib/types';
import { ShowProvidedProps } from '../../types';

interface TreeNode {
  name: string;
  isExpanded?: boolean;
  children?: TreeNode[];
}

const data: TreeNode = {
  name: 'T',
  children: [
    {
      name: 'A',
      children: [
        { name: 'A1' },
        { name: 'A2' },
        { name: 'A3' },
        {
          name: 'C',
          children: [
            {
              name: 'C1',
            },
            {
              name: 'D',
              children: [
                {
                  name: 'D1',
                },
                {
                  name: 'D2',
                },
                {
                  name: 'D3',
                },
              ],
            },
          ],
        },
      ],
    },
    { name: 'Z' },
    {
      name: 'B',
      children: [{ name: 'B1' }, { name: 'B2' }, { name: 'B3' }],
    },
  ],
};

type LinkComponentProps = SharedLinkProps<HierarchyPointLink<TreeNode>> & { percent: number };

export default function LinkTypes({
  width: totalWidth,
  height: totalHeight,
  margin = {
    top: 30,
    left: 30,
    right: 30,
    bottom: 30,
  },
}: ShowProvidedProps) {
  const [layout, setLayout] = useState<string>('cartesian');
  const [orientation, setOrientation] = useState<string>('horizontal');
  const [linkType, setLinkType] = useState<string>('diagonal');
  const [stepPercent, setStepPercent] = useState<number>(0.5);
  const forceUpdate = useForceUpdate();

  if (totalWidth < 10) return null;

  const innerWidth = totalWidth - margin.left - margin.right;
  const innerHeight = totalHeight - margin.top - margin.bottom;

  let origin: { x: number; y: number };
  let sizeWidth: number;
  let sizeHeight: number;

  if (layout === 'polar') {
    origin = {
      x: innerWidth / 2,
      y: innerHeight / 2,
    };
    sizeWidth = 2 * Math.PI;
    sizeHeight = Math.min(innerWidth, innerHeight) / 2;
  } else {
    origin = { x: 0, y: 0 };
    if (orientation === 'vertical') {
      sizeWidth = innerWidth;
      sizeHeight = innerHeight;
    } else {
      sizeWidth = innerHeight;
      sizeHeight = innerWidth;
    }
  }

  return (
    <div>
      <div style={{ color: 'rgba(38, 150, 136, 1.000)', fontSize: 10 }}>
        <label>layout:</label>
        <select
          onClick={e => e.stopPropagation()}
          onChange={e => setLayout(e.target.value)}
          value={layout}
        >
          <option value="cartesian">cartesian</option>
          <option value="polar">polar</option>
        </select>

        <label>orientation:</label>
        <select
          onClick={e => e.stopPropagation()}
          onChange={e => setOrientation(e.target.value)}
          value={orientation}
          disabled={layout === 'polar'}
        >
          <option value="vertical">vertical</option>
          <option value="horizontal">horizontal</option>
        </select>

        <label>link:</label>
        <select
          onClick={e => e.stopPropagation()}
          onChange={e => setLinkType(e.target.value)}
          value={linkType}
        >
          <option value="diagonal">diagonal</option>
          <option value="step">step</option>
          <option value="curve">curve</option>
          <option value="line">line</option>
        </select>

        <label>step:</label>
        <input
          onClick={e => e.stopPropagation()}
          type="range"
          min={0}
          max={1}
          step={0.1}
          onChange={e => setStepPercent(Number(e.target.value))}
          value={stepPercent}
          disabled={linkType !== 'step' || layout === 'polar'}
        />
      </div>

      <svg width={totalWidth} height={totalHeight}>
        <LinearGradient id="lg" from="#fd9b93" to="#fe6e9e" />
        <rect width={totalWidth} height={totalHeight} rx={14} fill="#272b4d" />
        <Group top={margin.top} left={margin.left}>
          <Tree
            root={hierarchy(data, d => (d.isExpanded ? null : d.children))}
            size={[sizeWidth, sizeHeight]}
            separation={(a, b) => (a.parent === b.parent ? 1 : 0.5) / a.depth}
          >
            {tree => (
              <Group top={origin.y} left={origin.x}>
                {tree.links().map((link, i) => {
                  let LinkComponent: React.ComponentType<LinkComponentProps>;

                  if (layout === 'polar') {
                    if (linkType === 'step') {
                      LinkComponent = LinkRadialStep;
                    } else if (linkType === 'curve') {
                      LinkComponent = LinkRadialCurve;
                    } else if (linkType === 'line') {
                      LinkComponent = LinkRadialLine;
                    } else {
                      LinkComponent = LinkRadial;
                    }
                  } else if (orientation === 'vertical') {
                    if (linkType === 'step') {
                      LinkComponent = LinkVerticalStep;
                    } else if (linkType === 'curve') {
                      LinkComponent = LinkVerticalCurve;
                    } else if (linkType === 'line') {
                      LinkComponent = LinkVerticalLine;
                    } else {
                      LinkComponent = LinkVertical;
                    }
                  } else if (linkType === 'step') {
                    LinkComponent = LinkHorizontalStep;
                  } else if (linkType === 'curve') {
                    LinkComponent = LinkHorizontalCurve;
                  } else if (linkType === 'line') {
                    LinkComponent = LinkHorizontalLine;
                  } else {
                    LinkComponent = LinkHorizontal;
                  }

                  return (
                    <LinkComponent
                      data={link}
                      percent={Number(stepPercent)}
                      stroke="#374469"
                      strokeWidth="1"
                      fill="none"
                      key={i}
                      onClick={d => () => {
                        console.log(d);
                      }}
                    />
                  );
                })}

                {tree.descendants().map((node, key) => {
                  const width = 40;
                  const height = 20;

                  let top: number;
                  let left: number;
                  if (layout === 'polar') {
                    const [radialX, radialY] = pointRadial(node.x, node.y);
                    top = radialY;
                    left = radialX;
                  } else if (orientation === 'vertical') {
                    top = node.y;
                    left = node.x;
                  } else {
                    top = node.x;
                    left = node.y;
                  }

                  return (
                    <Group top={top} left={left} key={key}>
                      {node.depth === 0 && (
                        <circle
                          r={12}
                          fill="url('#lg')"
                          onClick={() => {
                            node.data.isExpanded = !node.data.isExpanded;
                            console.log(node);
                            forceUpdate();
                          }}
                        />
                      )}
                      {node.depth !== 0 && (
                        <rect
                          height={height}
                          width={width}
                          y={-height / 2}
                          x={-width / 2}
                          fill="#272b4d"
                          stroke={node.data.children ? '#03c0dc' : '#26deb0'}
                          strokeWidth={1}
                          strokeDasharray={node.data.children ? '0' : '2,2'}
                          strokeOpacity={node.data.children ? 1 : 0.6}
                          rx={node.data.children ? 0 : 10}
                          onClick={() => {
                            node.data.isExpanded = !node.data.isExpanded;
                            console.log(node);
                            forceUpdate();
                          }}
                        />
                      )}
                      <text
                        dy=".33em"
                        fontSize={9}
                        fontFamily="Arial"
                        textAnchor="middle"
                        style={{ pointerEvents: 'none' }}
                        fill={node.depth === 0 ? '#71248e' : node.children ? 'white' : '#26deb0'}
                      >
                        {node.data.name}
                      </text>
                    </Group>
                  );
                })}
              </Group>
            )}
          </Tree>
        </Group>
      </svg>
    </div>
  );
}

function useForceUpdate() {
  const [, setValue] = useState<number>(0);
  return () => setValue(value => value + 1); // update state to force render
}
