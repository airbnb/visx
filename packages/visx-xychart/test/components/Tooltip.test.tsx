import React from 'react';
import ResizeObserver from 'resize-observer-polyfill';
import { mount } from 'enzyme';
import { Tooltip as BaseTooltip } from '@visx/tooltip';
import { DataContext, Tooltip, TooltipContext, TooltipContextType } from '../../src';
import { TooltipProps } from '../../src/components/Tooltip';
import getDataContext from '../mocks/getDataContext';

describe('<Tooltip />', () => {
  type SetupProps =
    | {
        props?: Partial<TooltipProps<object>>;
        context?: Partial<TooltipContextType<object>>;
        Parent?: ({ children }: { children: React.ReactElement }) => React.ReactElement;
      }
    | undefined;

  function setup({
    props,
    context,
    Parent = ({ children }: { children: React.ReactElement }) => children,
  }: SetupProps = {}) {
    const wrapper = mount(
      <Parent>
        <TooltipContext.Provider
          value={{
            tooltipOpen: false,
            showTooltip: jest.fn(),
            updateTooltip: jest.fn(),
            hideTooltip: jest.fn(),
            ...context,
          }}
        >
          <Tooltip
            resizeObserverPolyfill={ResizeObserver}
            renderTooltip={() => <div />}
            {...props}
          />
        </TooltipContext.Provider>
      </Parent>,
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
    const wrapper = setup({ context: { tooltipOpen: true }, props: { renderTooltip: () => null } });
    expect(wrapper.find(BaseTooltip)).toHaveLength(0);
  });

  it('should render a BaseTooltip when TooltipContext.tooltipOpen=true and renderTooltip returns non-null', () => {
    const wrapper = setup({
      props: { renderTooltip: () => <div />, snapTooltipToDatumX: true },
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

  it('should render a vertical crosshair if showVerticalCrossHair=true', () => {
    const wrapper = setup({
      props: { showVerticalCrosshair: true },
      context: { tooltipOpen: true },
    });
    expect(wrapper.find('div.visx-crosshair-vertical')).toHaveLength(1);
  });

  it('should render a horizontal crosshair if showVerticalCrossHair=true', () => {
    const wrapper = setup({
      props: { showHorizontalCrosshair: true },
      context: { tooltipOpen: true },
    });
    expect(wrapper.find('div.visx-crosshair-horizontal')).toHaveLength(1);
  });

  it('should not render a glyph if showDatumGlyph=true and there is no nearestDatum', () => {
    const wrapper = setup({
      props: { showDatumGlyph: true },
      context: { tooltipOpen: true },
    });
    expect(wrapper.find('div.visx-tooltip-glyph')).toHaveLength(0);
  });
  it('should render a glyph if showDatumGlyph=true if there is a nearestDatum', () => {
    const wrapper = setup({
      props: { showDatumGlyph: true },
      context: {
        tooltipOpen: true,
        tooltipData: {
          nearestDatum: { distance: 1, key: '', index: 0, datum: {} },
          datumByKey: {},
        },
      },
    });
    expect(wrapper.find('div.visx-tooltip-glyph')).toHaveLength(1);
  });
  it('should render a glyph for each series if showSeriesGlyphs=true', () => {
    const wrapper = setup({
      props: { showSeriesGlyphs: true },
      context: {
        tooltipOpen: true,
        tooltipData: {
          datumByKey: {
            d1: { key: 'd1', index: 0, datum: {} },
            d2: { key: 'd2', index: 1, datum: {} },
          },
        },
      },
      Parent: (
        { children }, // glyphs snap to data points, so scales/accessors must exist
      ) => (
        <DataContext.Provider
          value={{
            ...getDataContext([
              {
                key: 'd1',
                xAccessor: () => 3,
                yAccessor: () => 7,
                data: [{}],
              },
              {
                key: 'd2',
                xAccessor: () => 3,
                yAccessor: () => 7,
                data: [{}],
              },
            ]),
          }}
        >
          {children}
        </DataContext.Provider>
      ),
    });
    expect(wrapper.find('div.visx-tooltip-glyph')).toHaveLength(2);
  });
});
