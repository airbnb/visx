import React from 'react';
import LinkTypes from '../components/tiles/linkTypes';
import Show from '../components/Show.tsx';

export default () => {
  return (
    <Show
      events
      title="Link Types"
      component={LinkTypes}
      margin={{
        top: 40,
        left: 40,
        right: 40,
        bottom: 40,
      }}
    >
      {`import React from 'react';
import { Group } from '@vx/group';
import { Tree } from '@vx/hierarchy';
import { LinearGradient } from '@vx/gradient';
import { hierarchy } from 'd3-hierarchy';
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
  LinkRadialLine
} from '@vx/shape';

const data = {
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
              name: 'C1'
            },
            {
              name: 'D',
              children: [
                {
                  name: 'D1'
                },
                {
                  name: 'D2'
                },
                {
                  name: 'D3'
                }
              ]
            }
          ]
        }
      ]
    },
    { name: 'Z' },
    {
      name: 'B',
      children: [{ name: 'B1' }, { name: 'B2' }, { name: 'B3' }]
    }
  ]
};

export default class extends React.Component {
  state = {
    layout: 'cartesian',
    orientation: 'horizontal',
    linkType: 'diagonal',
    stepPercent: 0.5
  };

  render() {
    const {
      width,
      height,
      margin = {
        top: 30,
        left: 30,
        right: 30,
        bottom: 30
      }
    } = this.props;
    
    const { layout, orientation, linkType, stepPercent } = this.state;

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    let origin;
    let sizeWidth;
    let sizeHeight;

    if (layout === 'polar') {
      origin = {
        x: innerWidth / 2,
        y: innerHeight / 2
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
            onChange={e => this.setState({ layout: e.target.value })}
            value={layout}
          >
            <option value="cartesian">cartesian</option>
            <option value="polar">polar</option>
          </select>

          <label>orientation:</label>
          <select
            onClick={e => e.stopPropagation()}
            onChange={e => this.setState({ orientation: e.target.value })}
            value={orientation}
            disabled={layout === 'polar'}
          >
            <option value="vertical">vertical</option>
            <option value="horizontal">horizontal</option>
          </select>

          <label>link:</label>
          <select
            onClick={e => e.stopPropagation()}
            onChange={e => this.setState({ linkType: e.target.value })}
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
            onChange={e => this.setState({ stepPercent: e.target.value })}
            value={stepPercent}
            disabled={linkType !== 'step' || layout === 'polar'}
          />
        </div>

        <svg width={width} height={height}>
          <LinearGradient id="lg" from="#fd9b93" to="#fe6e9e" />
          <rect width={width} height={height} rx={14} fill="#272b4d" />
          <Group top={margin.top} left={margin.left}>
            <Tree
              root={hierarchy(data, d => (d.isExpanded ? null : d.children))}
              size={[sizeWidth, sizeHeight]}
              separation={(a, b) => (a.parent == b.parent ? 1 : 0.5) / a.depth}
            >
              {data => (
                <Group top={origin.y} left={origin.x}>
                  {data.links().map((link, i) => {
                    let LinkComponent;

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
                    } else {
                      if (orientation === 'vertical') {
                        if (linkType === 'step') {
                          LinkComponent = LinkVerticalStep;
                        } else if (linkType === 'curve') {
                          LinkComponent = LinkVerticalCurve;
                        } else if (linkType === 'line') {
                          LinkComponent = LinkVerticalLine;
                        } else {
                          LinkComponent = LinkVertical;
                        }
                      } else {
                        if (linkType === 'step') {
                          LinkComponent = LinkHorizontalStep;
                        } else if (linkType === 'curve') {
                          LinkComponent = LinkHorizontalCurve;
                        } else if (linkType === 'line') {
                          LinkComponent = LinkHorizontalLine;
                        } else {
                          LinkComponent = LinkHorizontal;
                        }
                      }
                    }

                    return (
                      <LinkComponent
                        data={link}
                        percent={+stepPercent}
                        stroke="#374469"
                        strokeWidth="1"
                        fill="none"
                        key={i}
                        onClick={data => event => {
                          console.log(data);
                        }}
                      />
                    );
                  })}

                  {data.descendants().map((node, key) => {
                    const width = 40;
                    const height = 20;

                    let top;
                    let left;
                    if (layout === 'polar') {
                      const [radialX, radialY] = pointRadial(node.x, node.y);
                      top = radialY;
                      left = radialX;
                    } else {
                      if (orientation === 'vertical') {
                        top = node.y;
                        left = node.x;
                      } else {
                        top = node.x;
                        left = node.y;
                      }
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
                              this.forceUpdate();
                            }}
                          />
                        )}
                        {node.depth !== 0 && (
                          <rect
                            height={height}
                            width={width}
                            y={-height / 2}
                            x={-width / 2}
                            fill={'#272b4d'}
                            stroke={node.data.children ? '#03c0dc' : '#26deb0'}
                            strokeWidth={1}
                            strokeDasharray={!node.data.children ? '2,2' : '0'}
                            strokeOpacity={!node.data.children ? 0.6 : 1}
                            rx={!node.data.children ? 10 : 0}
                            onClick={() => {
                              node.data.isExpanded = !node.data.isExpanded;
                              console.log(node);
                              this.forceUpdate();
                            }}
                          />
                        )}
                        <text
                          dy={'.33em'}
                          fontSize={9}
                          fontFamily="Arial"
                          textAnchor={'middle'}
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
}`}
    </Show>
  );
};
