import { vi } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Pie } from '../src';
import { addMock, removeMock } from './svgMock';
import type { PieArcDatum, ProvidedProps } from '../src/shapes/Pie';

interface Datum {
  date: string;
  'Google Chrome': string;
  'Internet Explorer': string;
  Firefox: string;
  Safari: string;
  'Microsoft Edge': string;
  Opera: string;
  Mozilla: string;
  'Other/Unknown': string;
  color: string;
}

const browserUsage: Datum[] = [
  {
    date: '2015 Jun 15',
    'Google Chrome': '48.09',
    'Internet Explorer': '24.14',
    Firefox: '18.82',
    Safari: '7.46',
    'Microsoft Edge': '0.03',
    Opera: '1.32',
    Mozilla: '0.12',
    'Other/Unknown': '0.01',
    color: 'blue',
  },
  {
    date: '2015 Jun 16',
    'Google Chrome': '48',
    'Internet Explorer': '24.19',
    Firefox: '18.96',
    Safari: '7.36',
    'Microsoft Edge': '0.03',
    Opera: '1.32',
    Mozilla: '0.12',
    'Other/Unknown': '0.01',
    color: 'red',
  },
];

describe('<Pie />', () => {
  beforeAll(() => {
    // eslint-disable-next-line
    vi.spyOn(console, 'error').mockImplementation(() => { });
    addMock();
  });

  afterAll(() => {
    vi.restoreAllMocks();
    removeMock();
  });

  test('it should be defined', () => {
    expect(Pie).toBeDefined();
  });

  test('it should not break on sort callbacks', () => {
    expect(() =>
      render(
        <svg>
          <Pie data={browserUsage} pieSort={() => 0} pieSortValues={() => 0} />
        </svg>,
      ),
    ).not.toThrow();
  });

  test('it should accept null sort callbacks', () => {
    expect.assertions(3);

    const { container } = render(
      <svg>
        <Pie data={browserUsage} pieSort={null} pieSortValues={null} />
      </svg>,
    );
    expect(container).toBeInTheDocument();

    const A = 1;
    const B = 20;
    // eslint-disable-next-line
    const childrenFn = vi.fn(({ }) => null);

    render(
      <svg>
        <Pie data={[A, B]} pieSortValues={null}>
          {childrenFn}
        </Pie>
      </svg>,
    );

    const args = childrenFn.mock.calls[0][0] as ProvidedProps<Datum>;
    expect(args.arcs[0]).toMatchObject({ value: A, index: 0 });
    expect(args.arcs[1]).toMatchObject({ value: B, index: 1 });
  });

  test('it should render pie chart with correct structure', () => {
    const { container } = render(
      <svg>
        <Pie data={browserUsage} />
      </svg>,
    );
    const group = container.querySelector('.visx-pie-arcs-group');
    expect(group).toBeInTheDocument();
    const paths = container.querySelectorAll('path');
    expect(paths).toHaveLength(browserUsage.length);
  });

  test('it should handle children render prop correctly', () => {
    // eslint-disable-next-line
    const childrenFn = vi.fn(({ }) => null);
    render(
      <svg>
        <Pie data={browserUsage}>{childrenFn}</Pie>
      </svg>,
    );

    expect(childrenFn).toHaveBeenCalled();
    const args = childrenFn.mock.calls[0][0];
    expect(args).toHaveProperty('path');
    expect(args).toHaveProperty('arcs');
    expect(args).toHaveProperty('pie');
  });

  test('it should accept a custom fill function', () => {
    const { container } = render(
      <svg>
        <Pie data={browserUsage} fill={(datum: PieArcDatum<Datum>) => datum.data.color} />
      </svg>,
    );

    const paths = container.querySelectorAll('path');
    expect(paths[0]).toHaveAttribute('fill', 'blue');
    expect(paths[1]).toHaveAttribute('fill', 'red');
  });

  test('it should accept a constant string fill value', () => {
    const { container } = render(
      <svg>
        <Pie data={browserUsage} fill="purple" />
      </svg>,
    );

    const paths = container.querySelectorAll('path');
    expect(paths[0]).toHaveAttribute('fill', 'purple');
    expect(paths[1]).toHaveAttribute('fill', 'purple');
  });
});
