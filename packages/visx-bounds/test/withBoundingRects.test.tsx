import * as React from 'react';
import { mount } from 'enzyme';
import { withBoundingRects } from '../src';

const expectedRectShape = expect.objectContaining({
  top: expect.any(Number),
  right: expect.any(Number),
  bottom: expect.any(Number),
  left: expect.any(Number),
  width: expect.any(Number),
  height: expect.any(Number),
});

const emptyRect = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  width: 0,
  height: 0,
};

describe('withBoundingRects()', () => {
  beforeAll(() => {
    // mock getBoundingClientRect
    jest.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(() => ({
      width: 100,
      height: 100,
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      x: 0,
      y: 0,
      toJSON: jest.fn(),
    }));
  });

  test('it should be defined', () => {
    expect(withBoundingRects).toBeDefined();
  });

  test('it should pass rect, parentRect, and getRect props to the wrapped component', () => {
    const Component = () => <div />;
    const HOC = withBoundingRects(Component);
    const wrapper = mount(<HOC />);
    const RenderedComponent = wrapper.find(Component);

    expect(Element.prototype.getBoundingClientRect).toHaveBeenCalled();
    expect(RenderedComponent.prop('rect')).toEqual(expectedRectShape);
    expect(RenderedComponent.prop('parentRect')).toEqual(expectedRectShape);
    expect(typeof RenderedComponent.prop('getRects')).toBe('function');
  });

  test('it should pass additional props to the wrapped component', () => {
    const Component = () => <div />;
    const HOC = withBoundingRects(Component);
    // @ts-ignore
    const wrapper = mount(<HOC bananas="are yellow" />);
    const RenderedComponent = wrapper.find(Component);
    expect(RenderedComponent.prop('bananas')).toBe('are yellow');
  });

  test('it should return default empty state if no node', () => {
    const Component = () => null;
    const HOC = withBoundingRects(Component);
    const wrapper = mount(<HOC />);
    const RenderedComponent = wrapper.find(Component);
    expect(RenderedComponent.prop('rect')).toBeUndefined();
    expect(RenderedComponent.prop('parentRect')).toBeUndefined();
  });

  test('it should set rect and parentRect to empty state if no getBoundingClient()', () => {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    const Component = () => <>{''}</>;
    const HOC = withBoundingRects(Component);
    const wrapper = mount(<HOC />);
    const RenderedComponent = wrapper.find(Component);
    expect(RenderedComponent.prop('rect')).toEqual(emptyRect);
  });
});
