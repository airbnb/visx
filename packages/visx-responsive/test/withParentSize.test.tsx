import React from 'react';
import { mount } from 'enzyme';

import { withParentSize } from '../src';

describe('withParentSize', () => {
  beforeAll(() => {
    // mock getBoundingClientRect
    jest.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(() => ({
      width: 220,
      height: 120,
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      x: 0,
      y: 0,
      toJSON: () => '',
    }));
  });

  test('it should be defined', () => {
    expect(withParentSize).toBeDefined();
  });

  test('it chould pass parentWidth and parentHeight props to its child', () => {
    const Component = () => <div />;
    const HOC = withParentSize(Component);
    const wrapper = mount(<HOC />);

    // wait for the resizeObserver to run
    setTimeout(() => {
      const RenderedComponent = wrapper.find(Component);
      expect(Element.prototype.getBoundingClientRect).toHaveBeenCalled();
      expect(RenderedComponent.prop('parentWidth')).toBe(220);
      expect(RenderedComponent.prop('parentHeight')).toBe(120);
    }, 0);
  });
});
