import { vi } from 'vitest';
import React from 'react';
import { ResizeObserver } from '@juggle/resize-observer';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import type { AnyD3Scale } from '@visx/scale';
import type { DataRegistryEntry, TooltipContextType } from '../../src';
import { DataContext, Tooltip, TooltipContext } from '../../src';
import type { TooltipProps } from '../../src/components/Tooltip';
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
    //  Disable Warning: render(): Rendering components directly into document.body is discouraged.
    const wrapper = render(
      <DataContext.Provider
        value={{
          ...getDataContext(dataEntries),
        }}
      >
        <TooltipContext.Provider
          value={{
            tooltipOpen: false,
            showTooltip: vi.fn(),
            updateTooltip: vi.fn(),
            hideTooltip: vi.fn(),
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
    const { container } = setup();
    expect(container?.parentNode?.querySelectorAll('.visx-tooltip')).toHaveLength(0);
  });

  it('should not render a BaseTooltip when TooltipContext.tooltipOpen=true and renderTooltip returns false', () => {
    const { container } = setup({
      context: { tooltipOpen: true },
      props: { renderTooltip: () => null },
    });
    expect(container?.parentNode?.querySelectorAll('.visx-tooltip')).toHaveLength(0);
  });

  it('should render a BaseTooltip when TooltipContext.tooltipOpen=true and renderTooltip returns non-null', () => {
    const { container } = setup({
      props: { renderTooltip: () => <div />, snapTooltipToDatumX: true },
      context: { tooltipOpen: true },
    });
    expect(container?.parentNode?.querySelectorAll('.visx-tooltip')).toHaveLength(1);
  });

  it('should not invoke props.renderTooltip when TooltipContext.tooltipOpen=false', () => {
    const renderTooltip = vi.fn(() => <div />);
    setup({
      props: { renderTooltip },
    });
    expect(renderTooltip).toHaveBeenCalledTimes(0);
  });

  it('should invoke props.renderTooltip when TooltipContext.tooltipOpen=true', () => {
    const renderTooltip = vi.fn(() => <div />);
    setup({
      props: { renderTooltip },
      context: { tooltipOpen: true },
    });
    expect(renderTooltip).toHaveBeenCalled(); // may be invoked more than once due to forceRefreshBounds invocation
  });

  it('should render a vertical crosshair if showVerticalCrossHair=true', () => {
    const { container } = setup({
      props: { showVerticalCrosshair: true },
      context: { tooltipOpen: true },
    });
    expect(container?.parentNode?.querySelectorAll('div.visx-crosshair-vertical')).toHaveLength(1);
  });

  it('should render a horizontal crosshair if showVerticalCrossHair=true', () => {
    const { container } = setup({
      props: { showHorizontalCrosshair: true },
      context: { tooltipOpen: true },
    });
    expect(container?.parentNode?.querySelectorAll('div.visx-crosshair-horizontal')).toHaveLength(
      1,
    );
  });

  it('should not render a glyph if showDatumGlyph=true and there is no nearestDatum', () => {
    const { container } = setup({
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
    expect(container?.parentNode?.querySelectorAll('div.visx-tooltip-glyph')).toHaveLength(0);
  });

  it('should render a glyph if showDatumGlyph=true if there is a nearestDatum', () => {
    const { container } = setup({
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
    expect(container?.parentNode?.querySelectorAll('.visx-tooltip-glyph')).toHaveLength(1);
  });

  it('should render a glyph for each series if showSeriesGlyphs=true', () => {
    const { container } = setup({
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
    expect(container?.parentNode?.querySelectorAll('div.visx-tooltip-glyph')).toHaveLength(2);
  });

  it('should pass zIndex prop to Portal', () => {
    const { container } = setup({
      props: { zIndex: 123 },
      context: { tooltipOpen: true },
    });
    const zIndex =
      container?.parentNode?.querySelector('div.visx-tooltip')?.parentElement?.style.zIndex;
    expect(zIndex).toBe('123');
  });
});
