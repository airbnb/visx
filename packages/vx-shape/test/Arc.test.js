import React from 'react';
import { shallow } from 'enzyme';
import { Arc } from '../src';
import { browserUsage } from '../../vx-mock-data';

const ArcWrapper = ({ ...restProps }) =>
  shallow(<Arc data={browserUsage} {...restProps} />);

describe('<Arc />', () => {
  test('it should be defined', () => {
    expect(Arc).toBeDefined();
  });

  test('it should have the .vx-arcs-group class', () => {
    expect(ArcWrapper().prop('className')).toBe('vx-arc');
  });

  test('it should contain paths', () => {
    expect(ArcWrapper().find('path').length).toBeGreaterThan(0);
  });
});
