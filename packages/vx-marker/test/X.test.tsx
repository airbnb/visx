import React from 'react';
import { shallow } from 'enzyme';
import { MarkerX, MarkerCross } from '../src';

const Wrapper = (restProps = {}) => shallow(<MarkerX id="marker-x-test" {...restProps} />);

describe('<MarkerX />', () => {
  test('it should be defined', () => {
    expect(MarkerX).toBeDefined();
  });

  test('it should render a <MarkerCross /> rotated 45deg', () => {
    const cross = Wrapper().find(MarkerCross);
    expect(cross).toHaveLength(1);
    expect(cross.prop('orient')).toEqual(45);
  });
});
