import React from 'react';
import { shallow } from 'enzyme';
import { LineSubject } from '../src';

describe('<LineSubject />', () => {
  it('should be defined', () => {
    expect(LineSubject).toBeDefined();
  });
  it('should render a line', () => {
    expect(shallow(<LineSubject min={0} max={100} />).find('line')).toHaveLength(1);
  });
});
