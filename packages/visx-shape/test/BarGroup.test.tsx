/** @jest-environment jsdom */
/**
 * LLM-GENERATED REFACTOR
 *
 * This file was migrated from Enzyme to RTL using generative AI.
 * To make the migration as clean as possible, the LLM was instructed to
 * use testing patterns similar to Enzyme.
 *
 * If you are making changes to this file, please consider refactoring
 * to more idiomatic RTL (and then removing this banner!).
 */
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { scaleBand, scaleLinear } from '@visx/scale';
import { BarGroup } from '../src';

jest.mock('@visx/group', () => ({
  Group: jest.fn(({ children, top, left, ...props }) => (
    <svg>
      <g 
        data-testid="visx-group" 
        transform={`translate(${left || 0}, ${top || 0})`}
        {...props}
      >
        {children}
      </g>
    </svg>
  )),
}));

jest.mock('../src/shapes/Bar', () => ({
  __esModule: true,
  default: function Bar(props) {
    return <rect data-testid="visx-bar" {...props} />;
  }
}));

const data = [
  {
    date: new Date(),
    'New York': '63.4',
    'San Francisco': '62.7',
    Austin: '72.2',
  },
  {
    date: new Date(),
    'New York': '58.0',
    'San Francisco': '59.9',
    Austin: '67.7',
  },
];

const defaultProps = {
  data,
  x0: () => 5,
  x0Scale: scaleBand({ domain: [5, 15], range: [0, 100] }),
  x1Scale: scaleBand({ domain: [0, 100], range: [0, 100] }),
  yScale: scaleLinear({ domain: [0, 100], range: [0, 100] }),
  color: () => 'skyblue',
  keys: ['New York', 'San Francisco', 'Austin'],
  height: 1,
};

describe('<BarGroup />', () => {
  const renderWithSvg = (ui: React.ReactElement) => {
    return render(<svg>{ui}</svg>);
  };

  test('it should be defined', () => {
    expect(BarGroup).toBeDefined();
  });

  test('it should have className .visx-bar-group', () => {
    const { container } = renderWithSvg(<BarGroup {...defaultProps} />);
    expect(container.querySelector('.visx-bar-group')).toBeInTheDocument();
  });

  test('it should set className prop', () => {
    const { container } = renderWithSvg(<BarGroup {...defaultProps} className="test" />);
    const element = container.querySelector('g.visx-bar-group');
    expect(element).toHaveClass('test');
    expect(element).toHaveClass('visx-bar-group');
  });

  test('it should set top & left props', () => {
    const { container } = renderWithSvg(<BarGroup {...defaultProps} top={2} left={3} />);
    const element = container.querySelector('g.visx-bar-group');
    expect(element).toHaveAttribute('transform', 'translate(3, 2)');
  });

  test('it should take a children as function prop', () => {
    const children = jest.fn(() => null);
    renderWithSvg(<BarGroup {...defaultProps}>{children}</BarGroup>);
    expect(children).toHaveBeenCalled();
  });

  test('it should call children function with [barGroups]', () => {
    const children = jest.fn(() => null);
    renderWithSvg(<BarGroup {...defaultProps}>{children}</BarGroup>);
    const args = children.mock.calls[0][0];
    expect(args.length).toBeGreaterThan(0);
  });

  test('it should create barGroup with shape { index, x0, bars }', () => {
    const children = jest.fn(() => null);
    renderWithSvg(<BarGroup {...defaultProps}>{children}</BarGroup>);
    const [barGroups] = children.mock.calls[0];
    const group = barGroups[0];

    expect(Object.keys(group)).toEqual(['index', 'x0', 'bars']);
    expect(group.index).toBe(0);
    expect(typeof group.index).toBe('number');
    expect(typeof group.x0).toBe('number');
    expect(group.bars).toHaveLength(defaultProps.keys.length);
    expect(Object.keys(group.bars[0])).toEqual([
      'index',
      'key',
      'value',
      'width',
      'x',
      'y',
      'color',
      'height',
    ]);
  });
});
// MIGRATION STATUS: {"eslint":"pending","jest":{"passed":7,"failed":0,"total":7,"skipped":0,"successRate":100},"tsc":"pending","enyzme":"converted"}
