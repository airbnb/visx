import React from 'react';
import { shallow } from 'enzyme';

import { Pie } from '../src';
import { PieArcDatum, PieProps } from '../src/shapes/Pie';

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

const PieWrapper = (restProps = {}) => shallow(<Pie data={browserUsage} {...restProps} />);
const PieChildren = ({ children, ...restProps }: Partial<PieProps<Datum>>) =>
  shallow(
    <Pie data={browserUsage} {...restProps}>
      {children}
    </Pie>,
  );

describe('<Pie />', () => {
  test('it should be defined', () => {
    expect(Pie).toBeDefined();
  });

  test('it should not break on sort callbacks', () => {
    expect(() => {
      PieWrapper({ pieSort: () => 0, pieSortValues: () => 0 });
    }).not.toThrow();
  });

  test('it should accept null sort callbacks', () => {
    expect.assertions(3);

    expect(() => {
      PieWrapper({ pieSort: null, pieSortValues: null });
    }).not.toThrow();

    // Should sort the arcs the same order as the input data
    // The default pieSortValues sorts data by descending values
    const A = 1;
    const B = 20;
    shallow(
      <Pie data={[A, B]} pieSortValues={null}>
        {({ arcs }) => {
          expect(arcs[0]).toMatchObject({ value: A, index: 0 });
          expect(arcs[1]).toMatchObject({ value: B, index: 1 });

          return null;
        }}
      </Pie>,
    );
  });

  test('it should break on invalid sort callbacks', () => {
    expect(() => PieWrapper({ pieSort: 12 })).toThrow();
    expect(() => PieWrapper({ pieSortValues: 12 })).toThrow();
  });

  test('it should have the .visx-pie-arcs-group class', () => {
    expect(PieWrapper().prop('className')).toBe('visx-pie-arcs-group');
  });

  test('it should contain paths', () => {
    expect(PieWrapper().find('path').length).toBeGreaterThan(0);
  });

  test('it should take a children as function prop', () => {
    const fn = jest.fn();
    PieChildren({ children: fn });
    expect(fn).toHaveBeenCalled();
  });

  test('it should accept a custom fill function', () => {
    const paths = PieWrapper({
      fill: (datum: PieArcDatum<Datum>) => datum.data.color,
    }).find('path');
    expect(paths.at(0).prop('fill')).toBe('blue');
    expect(paths.at(1).prop('fill')).toBe('red');
  });

  test('it should accept a constant string fill value', () => {
    const paths = PieWrapper({
      fill: 'purple',
    }).find('path');
    expect(paths.at(0).prop('fill')).toBe('purple');
    expect(paths.at(1).prop('fill')).toBe('purple');
  });

  test('it should call children function with { arcs, path, pie }', () => {
    const fn = jest.fn();
    PieChildren({ children: fn });
    const args = fn.mock.calls[0][0];
    const keys = Object.keys(args);
    expect(keys).toContain('path');
    expect(keys).toContain('arcs');
    expect(keys).toContain('pie');
  });
});
