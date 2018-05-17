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
