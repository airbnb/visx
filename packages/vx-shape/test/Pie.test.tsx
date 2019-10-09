import React from 'react';
import { shallow } from 'enzyme';

import { Pie } from '../src';
import { PieProps } from '../src/shapes/Pie';

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
  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    global.console.error = jest.fn();
  });

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
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(console.error).toBeCalled();
    expect((console.error as jest.Mock).mock.calls).toHaveLength(2);
  });

  test('it should have the .vx-pie-arcs-group class', () => {
    expect(PieWrapper().prop('className')).toBe('vx-pie-arcs-group');
  });

  test('it should contain paths', () => {
    expect(PieWrapper().find('path').length).toBeGreaterThan(0);
  });

  test('it should take a children as function prop', () => {
    const fn = jest.fn();
    PieChildren({ children: fn });
    expect(fn).toHaveBeenCalled();
  });

  test('it should call children function with { arcs, path, pie }', () => {
    const fn = jest.fn();
    PieChildren({ children: fn });
    const args = fn.mock.calls[0][0];
    const keys = Object.keys(args);
    expect(keys.includes('path')).toEqual(true);
    expect(keys.includes('arcs')).toEqual(true);
    expect(keys.includes('pie')).toEqual(true);
  });
});
