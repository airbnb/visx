import React from 'react';
import { shallow } from 'enzyme';

import { ClipPath, CircleClipPath, RectClipPath } from '../src';

describe('<ClipPath />', () => {
  test('it should be defined', () => {
    expect(ClipPath).toBeDefined();
  });

  test('it should render defs and clipPath elements', () => {
    const wrapper = shallow(<ClipPath id="test" />);
    expect(wrapper.type()).toBe('defs');
    expect(wrapper.find('clipPath')).toHaveLength(1);
  });

  test('it should assign the passed id to the clipPath', () => {
    const wrapper = shallow(<ClipPath id="best_clip" />);
    expect(wrapper.find('clipPath#best_clip')).toHaveLength(1);
  });
});

describe('<RectClipPath />', () => {
  test('it should be defined', () => {
    expect(RectClipPath).toBeDefined();
  });

  test('it should render a rect', () => {
    const wrapper = shallow(<RectClipPath id="test" />);
    expect(wrapper.find('rect')).toHaveLength(1);
  });
});

describe('<CircleClipPath />', () => {
  test('it should be defined', () => {
    expect(CircleClipPath).toBeDefined();
  });

  test('it should render a circle', () => {
    const wrapper = shallow(<CircleClipPath id="test" />);
    expect(wrapper.find('circle')).toHaveLength(1);
  });
});
