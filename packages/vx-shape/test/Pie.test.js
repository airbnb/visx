import React from 'react';
import { shallow } from 'enzyme';
import { Pie } from '../src';
import { browserUsage } from '../../vx-mock-data';

const PieWrapper = ({ ...restProps }) => shallow(<Pie data={browserUsage} {...restProps} />);

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
        }}
      </Pie>
    );
  });

  test('it should break on invalid sort callbacks', () => {
    expect(() => PieWrapper({ pieSort: 12 })).toThrow();
    expect(() => PieWrapper({ pieSortValues: 12 })).toThrow();
  });

  test('it should have the .vx-pie-arcs-group class', () => {
    expect(PieWrapper().prop('className')).toBe('vx-pie-arcs-group');
  });

  test('it should contain paths', () => {
    expect(PieWrapper().find('path').length).toBeGreaterThan(0);
  });
});
