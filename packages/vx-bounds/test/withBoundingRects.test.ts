import { withBoundingRects } from '../src';

// const expectedRectShape = expect.objectContaining({
//   top: expect.any(Number),
//   right: expect.any(Number),
//   bottom: expect.any(Number),
//   left: expect.any(Number),
//   width: expect.any(Number),
//   height: expect.any(Number),
// });

describe('withBoundingRects()', () => {
  // beforeAll(() => {
  //   // mock getBoundingClientRect
  //   Element.prototype.getBoundingClientRect = jest.fn(() => ({
  //     width: 100,
  //     height: 100,
  //     top: 0,
  //     left: 0,
  //     bottom: 0,
  //     right: 0,
  //   }));
  // });

  test('it should be defined', () => {
    expect(withBoundingRects).toBeDefined();
  });

  // test('it should pass rect, parentRect, and getRect props to the wrapped component', () => {
  //   const Component = () => <div />;
  //   const HOC = withBoundingRects(Component);
  //   const wrapper = mount(<HOC />);
  //   const RenderedComponent = wrapper.find(Component);

  //   expect(
  //     Element.prototype.getBoundingClientRect,
  //   ).toHaveBeenCalled();
  //   expect(RenderedComponent.prop('rect')).toEqual(expectedRectShape);
  //   expect(RenderedComponent.prop('parentRect')).toEqual(
  //     expectedRectShape,
  //   );
  //   expect(typeof RenderedComponent.prop('getRects')).toBe(
  //     'function',
  //   );
  // });

  // test('it should pass additional props to the wrapped component', () => {
  //   const Component = () => <div />;
  //   const HOC = withBoundingRects(Component);
  //   const wrapper = mount(<HOC bananas="are yellow" />);
  //   const RenderedComponent = wrapper.find(Component);
  //   expect(RenderedComponent.prop('bananas')).toBe('are yellow');
  // });
});
