import React from 'react';
import ResizeObserver from 'resize-observer-polyfill';
import { mount } from 'enzyme';
import { Tooltip as BaseTooltip } from '@visx/tooltip';
import { Tooltip, TooltipContext, TooltipContextType } from '../../src';
import { TooltipProps } from '../../src/components/Tooltip';

describe('<Tooltip />', () => {
  type SetupProps =
    | {
        props?: Partial<TooltipProps>;
        context?: Partial<TooltipContextType>;
      }
    | undefined;
  function setup({ props, context }: SetupProps = {}) {
    const wrapper = mount(
      <TooltipContext.Provider
        value={{
          tooltipOpen: false,
          showTooltip: jest.fn(),
          updateTooltip: jest.fn(),
          hideTooltip: jest.fn(),
          ...context,
        }}
      >
        <Tooltip resizeObserverPolyfill={ResizeObserver} renderTooltip={() => null} {...props} />
      </TooltipContext.Provider>,
    );
    return wrapper;
  }
  it('should be defined', () => {
    expect(Tooltip).toBeDefined();
  });

  it('should not render a BaseTooltip when TooltipContext.tooltipOpen=false', () => {
    const wrapper = setup();
    expect(wrapper.find(BaseTooltip)).toHaveLength(0);
  });

  it('should not render a BaseTooltip when TooltipContext.tooltipOpen=true and renderTooltip returns false', () => {
    const wrapper = setup({ context: { tooltipOpen: true } });
    expect(wrapper.find(BaseTooltip)).toHaveLength(0);
  });

  it('should render a BaseTooltip when TooltipContext.tooltipOpen=true and renderTooltip returns non-null', () => {
    const wrapper = setup({
      props: { renderTooltip: () => <div /> },
      context: { tooltipOpen: true },
    });
    expect(wrapper.find(BaseTooltip)).toHaveLength(1);
  });

  it('should not invoke props.renderTooltip when TooltipContext.tooltipOpen=false', () => {
    const renderTooltip = jest.fn(() => <div />);
    setup({
      props: { renderTooltip },
    });
    expect(renderTooltip).toHaveBeenCalledTimes(0);
  });

  it('should invoke props.renderTooltip when TooltipContext.tooltipOpen=true', () => {
    const renderTooltip = jest.fn(() => <div />);
    setup({
      props: { renderTooltip },
      context: { tooltipOpen: true },
    });
    expect(renderTooltip).toHaveBeenCalledTimes(1);
  });
});
