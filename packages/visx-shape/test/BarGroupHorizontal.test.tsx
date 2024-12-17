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
import { BarGroupHorizontal } from '../src';

interface Datum {
  date: Date;
  'New York': string;
  'San Francisco': string;
  Austin: string;
}

const data: Datum[] = [
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
  y0: () => 5,
  y0Scale: scaleBand({ domain: [0, 100], range: [0, 100] }),
  y1Scale: scaleBand({ domain: [0, 100], range: [0, 100] }),
  xScale: scaleLinear({ domain: [0, 100], range: [0, 100] }),
  color: () => 'violet',
  keys: ['New York', 'San Francisco', 'Austin'],
  width: 1,
};

describe('<BarGroupHorizontal />', () => {
  // Suppress expected console warnings about lowercase SVG elements
  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test('it should be defined', () => {
    expect(BarGroupHorizontal).toBeDefined();
  });

  test('it should have className .visx-bar-group-horizontal', () => {
    const { container } = render(<BarGroupHorizontal {...defaultProps} />);
    const element = container.querySelector('.visx-bar-group-horizontal');
    expect(element).toBeInTheDocument();
  });

  test('it should set className prop', () => {
    const { container } = render(<BarGroupHorizontal {...defaultProps} className="test" />);
    const element = container.querySelector('.visx-bar-group-horizontal.test');
    expect(element).toBeInTheDocument();
  });

  test('it should set top & left props', () => {
    const { container } = render(<BarGroupHorizontal {...defaultProps} top={2} left={3} />);
    const group = container.querySelector('g');
    expect(group).toHaveAttribute('transform', 'translate(3, 2)');
  });

  test('it should take a children as function prop', () => {
    const children = jest.fn(() => null);
    render(<BarGroupHorizontal {...defaultProps}>{children}</BarGroupHorizontal>);
    expect(children).toHaveBeenCalled();
  });

  test('it should call children function with [barGroups]', () => {
    const children = jest.fn(() => null);
    render(<BarGroupHorizontal {...defaultProps}>{children}</BarGroupHorizontal>);
    const args = children.mock.calls[0][0];
    expect(args.length > 0).toBe(true);
  });

  test('it should create barGroup with shape { index, x0, bars }', () => {
    const children = jest.fn(() => null);
    render(<BarGroupHorizontal {...defaultProps}>{children}</BarGroupHorizontal>);
    const args = children.mock.calls[0][0];
    const barGroups = args;
    const group = barGroups[0];
    
    expect(Object.keys(group)).toEqual(['index', 'y0', 'bars']);
    expect(group.index).toBe(0);
    expect(typeof group.index).toBe('number');
    expect(typeof group.y0).toBe('number');
    expect(group.bars).toHaveLength(defaultProps.keys.length);
    expect(Object.keys(group.bars[0])).toEqual([
      'index',
      'key',
      'value',
      'height',
      'x',
      'y',
      'color',
      'width',
    ]);
  });
});
// MIGRATION STATUS: {"eslint":"pending","jest":{"passed":7,"failed":0,"total":7,"skipped":0,"successRate":100},"tsc":"pending","enyzme":"converted"}
