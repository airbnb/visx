// @ts-ignore ts-migrate(1259) FIXME: Module '"/Users/sergii_rudenko/Projects/vx/node_mo... Remove this comment to see the full error message
import React from 'react';
import { mount } from 'enzyme';

import { withParentSize } from '../src';

// @ts-ignore ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('withParentSize', () => {
  // @ts-ignore ts-migrate(2304) FIXME: Cannot find name 'beforeAll'.
  beforeAll(() => {
    // mock getBoundingClientRect
    // @ts-ignore ts-migrate(2304) FIXME: Cannot find name 'jest'.
    Element.prototype.getBoundingClientRect = jest.fn(() => ({
      width: 220,
      height: 120,
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    }));
  });

  // @ts-ignore ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test('it should be defined', () => {
    // @ts-ignore ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(withParentSize).toBeDefined();
  });

  // @ts-ignore ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test('it chould pass parentWidth and parentHeight props to its child', () => {
    // @ts-ignore ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    const Component = () => <div />;
    const HOC = withParentSize(Component);
    // @ts-ignore ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    const wrapper = mount(<HOC />);

    // wait for the resizeObserver to run
    setTimeout(() => {
      const RenderedComponent = wrapper.find(Component);
      // @ts-ignore ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(Element.prototype.getBoundingClientRect).toHaveBeenCalled();
      // @ts-ignore ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(RenderedComponent.prop('parentWidth')).toBe(220);
      // @ts-ignore ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(RenderedComponent.prop('parentHeight')).toBe(120);
    }, 0);
  });
});
