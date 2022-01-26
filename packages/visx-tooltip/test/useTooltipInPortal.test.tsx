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
    expect(zIndex).toEqual(1);
  });

  it('should pass zIndex prop from component to Portal', () => {
    const wrapper = shallow(
      <TooltipWithZIndex zIndexOption={1} zIndexProp="var(--tooltip-zindex)" />,
      {
        disableLifecycleMethods: true,
      },
    ).dive();
    const zIndex = wrapper.find('Portal').prop('zIndex');
    expect(zIndex).toEqual('var(--tooltip-zindex)');
  });
});
