import React from 'react';
import { shallow } from 'enzyme';
import { Connector } from '../src';

describe('<Connector />', () => {
  it('should be defined', () => {
    expect(Connector).toBeDefined();
  });
  it('should render a path', () => {
    expect(shallow(<Connector />).find('path')).toHaveLength(1);
  });
});
