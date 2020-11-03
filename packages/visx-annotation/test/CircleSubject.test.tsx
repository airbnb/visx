import React from 'react';
import { shallow } from 'enzyme';
import { CircleSubject } from '../src';

describe('<CircleSubject />', () => {
  it('should be defined', () => {
    expect(CircleSubject).toBeDefined();
  });
  it('should render a cirlce', () => {
    expect(shallow(<CircleSubject />).find('circle')).toHaveLength(1);
  });
});
