import React from 'react';
import { mount } from 'enzyme';
import { withParentSize } from '../src';

describe('withParentSize', () => {
  beforeAll(() => {
    // mock getBoundingClientRect
    Element.prototype.getBoundingClientRect = jest.fn(() => ({
      width: 220,
      height: 120,
      top: 0,
      left: 0,
      bottom: 0,
      right: 0
    }));
  });

  test('it should be defined', () => {
    expect(withParentSize).toBeDefined();
  });

  test('it chould pass parentWidth and parentHeight props to its child', () => {
    const Component = props => <div />;
    const HOC = withParentSize(Component);
    const wrapper = mount(<HOC />);
    const RenderedComponent = wrapper.find(Component);
    expect(Element.prototype.getBoundingClientRect).toHaveBeenCalled();
    expect(RenderedComponent.prop('parentWidth')).toBe(220);
    expect(RenderedComponent.prop('parentHeight')).toBe(120);
  });
});
