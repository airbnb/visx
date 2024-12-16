/**
 * LLM-GENERATED REFACTOR
 *
 * This file was migrated from Enzyme to RTL using generative AI.
 * To make the migration as clean as possible, the LLM was instructed to
 * use testing patterns similar to Enzyme.
 *
 * If you are making changes to this file, please consider refactoring
 * to more idiomatic RTL (and then removing this banner!).
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { shallow } from 'enzyme';
import { TooltipWithBounds, defaultStyles } from '../src';

describe('<TooltipWithBounds />', () => {
  test('it should be defined', () => {
    expect(TooltipWithBounds).toBeDefined();
  });

  it('should render the Tooltip with default styles by default', () => {
    const wrapper = shallow(<TooltipWithBounds>Hello</TooltipWithBounds>, {
      disableLifecycleMethods: true,
    }).dive();
    const styles = wrapper.find('Tooltip').props().style as any;
    Object.entries(defaultStyles).forEach(([key, value]) => {
      expect(styles[key]).toBe(value);
    });
  });

  it('should render the tooltip without default styles if unstyled is set to true', () => {
    const wrapper = shallow(<TooltipWithBounds unstyled>Hello</TooltipWithBounds>, {
      disableLifecycleMethods: true,
    }).dive();
    const styles = wrapper.find('Tooltip').props().style as any;
    Object.keys(defaultStyles).forEach((key) => {
      expect(styles[key]).toBeUndefined();
    });
  });
});
// MIGRATION STATUS: {"eslint":"pending","jest":{"passed":3,"failed":0,"total":3,"skipped":0,"successRate":100},"tsc":"pending","enyzme":"pending"}
