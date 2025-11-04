import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import type { SankeyProps } from '../src/Sankey';
import Sankey from '../src/Sankey';

const nodes = [{ name: 'node 1' }, { name: 'node 2' }, { name: 'node 3' }];
const links = [
  { source: 0, target: 1, value: 10 },
  { source: 1, target: 2, value: 5 },
];
const root = { nodes, links };

const renderTest = (props: SankeyProps<(typeof nodes)[number], {}>) =>
  render(
    <svg>
      <Sankey {...props} />
    </svg>,
  );

describe('<Sankey />', () => {
  test('it should render', () => {
    const { container } = renderTest({ root });

    expect(container.querySelector('.visx-sankey')).toBeInTheDocument();
  });

  test('it should render children', () => {
    renderTest({
      root,
      children: ({ graph }) => (
        <>
          {graph.nodes.map((node, i) => (
            <text key={i}>{node.name}</text>
          ))}
        </>
      ),
    });

    expect(screen.getByText('node 2')).toBeInTheDocument();
  });

  test('it should render links with custom props', () => {
    const { container } = renderTest({
      root,
      linkProps: { stroke: 'red' },
      nodeProps: { fill: 'blue' },
    });

    expect(container.querySelector('.visx-sankey-links > path')).toHaveAttribute('stroke', 'red');
    expect(container.querySelector('.visx-sankey-nodes > rect')).toHaveAttribute('fill', 'blue');
  });

  test('it should render links with custom id accessors', () => {
    const { container } = renderTest({
      root: {
        nodes,
        links: [
          {
            source: 'node 1',
            target: 'node 2',
            value: 10,
          },
          {
            source: 'node 2',
            target: 'node 3',
            value: 5,
          },
        ],
      },
      nodeId: (node) => node.name,
    });

    expect(container.querySelectorAll('.visx-sankey-links > path')).toHaveLength(2);
  });
});
