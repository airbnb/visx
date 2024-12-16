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
import React from 'react';
import { shallow } from 'enzyme';
import { ResizeObserver } from '@juggle/resize-observer';
import { useTooltipInPortal } from '../src';
import { UseTooltipPortalOptions } from '../src/hooks/useTooltipInPortal';

interface TooltipWithZIndexProps {
  zIndexOption?: UseTooltipPortalOptions['zIndex'];
  zIndexProp?: UseTooltipPortalOptions['zIndex'];
}

const TooltipWithZIndex = ({ zIndexOption, zIndexProp }: TooltipWithZIndexProps) => {
  const { TooltipInPortal } = useTooltipInPortal({
    polyfill: ResizeObserver,
    zIndex: zIndexOption,
  });
  return <TooltipInPortal zIndex={zIndexProp}>Hello</TooltipInPortal>;
};

describe('useTooltipInPortal()', () => {
  test('it should be defined', () => {
    expect(useTooltipInPortal).toBeDefined();
  });

  it('should pass zIndex prop from options to Portal', () => {
    const wrapper = shallow(<TooltipWithZIndex zIndexOption={1} />, {
      disableLifecycleMethods: true,
    }).dive();
    const zIndex = wrapper.find('Portal').prop('zIndex');
    expect(zIndex).toBe(1);
  });

  it('should pass zIndex prop from component to Portal', () => {
    const wrapper = shallow(
      <TooltipWithZIndex zIndexOption={1} zIndexProp="var(--tooltip-zindex)" />,
      {
        disableLifecycleMethods: true,
      },
    ).dive();
    const zIndex = wrapper.find('Portal').prop('zIndex');
    expect(zIndex).toBe('var(--tooltip-zindex)');
  });
});
// MIGRATION STATUS: {"eslint":"pending","jest":{"passed":0,"failed":0,"total":0,"skipped":0,"successRate":0},"tsc":"pending","enyzme":"pending"}
