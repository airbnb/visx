import React from 'react';
import ResizeObserver from 'resize-observer-polyfill';
import { mount } from 'enzyme';
import { AnyD3Scale } from '@visx/scale';
import { Tooltip as BaseTooltip } from '@visx/tooltip';
import {
  DataContext,
  DataRegistryEntry,
  Tooltip,
  TooltipContext,
  TooltipContextType,
} from '../../src';
import { TooltipProps } from '../../src/components/Tooltip';
import getDataContext from '../mocks/getDataContext';

describe('<Tooltip />', () => {
  type SetupProps =
    | {
        props?: Partial<TooltipProps<object>>;
        context?: Partial<TooltipContextType<object>>;
        dataEntries?: DataRegistryEntry<AnyD3Scale, AnyD3Scale, {}>[];
      }
    | undefined;

  function setup({ props, context, dataEntries = [] }: SetupProps = {}) {
    const wrapper = mount(
      <DataContext.Provider
        value={{
          ...getDataContext(dataEntries),
        }}
      >
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
      </DataContext.Provider>,
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
    expect(renderTooltip).toHaveBeenCalled(); // may be invoked more than once due to forceRefreshBounds invocation
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
      context: {
        tooltipOpen: true,
        tooltipData: {
          datumByKey: {},
        },
      },
      dataEntries: [
        {
          key: 'd1',
          xAccessor: () => 3,
          yAccessor: () => 7,
          data: [{}],
        },
      ],
    });
    expect(wrapper.find('div.visx-tooltip-glyph')).toHaveLength(0);
  });
  it('should render a glyph if showDatumGlyph=true if there is a nearestDatum', () => {
    const wrapper = setup({
      props: { showDatumGlyph: true },
      context: {
        tooltipOpen: true,
        tooltipData: {
          nearestDatum: { distance: 1, key: 'd1', index: 0, datum: {} },
          datumByKey: {},
        },
      },
      dataEntries: [
        {
          key: 'd1',
          xAccessor: () => 3,
          yAccessor: () => 7,
          data: [{}],
        },
      ],
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
      dataEntries: [
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
      ],
    });
    expect(wrapper.find('div.visx-tooltip-glyph')).toHaveLength(2);
  });
});
