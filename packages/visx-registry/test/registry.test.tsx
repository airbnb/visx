import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { fireEvent, render } from '@testing-library/react';
import type { ComponentType } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { smokeInstallRegistryItem } from '../scripts/smokeInstallRegistryItem';
import { AreaChart } from '../registry/charts/area-chart/area-chart';
import { BarChart } from '../registry/charts/bar-chart/bar-chart';
import { GroupedBarChart } from '../registry/charts/grouped-bar-chart/grouped-bar-chart';
import { HeatmapChart } from '../registry/charts/heatmap-chart/heatmap-chart';
import { HistogramChart } from '../registry/charts/histogram-chart/histogram-chart';
import { HorizontalStackedBarChart } from '../registry/charts/horizontal-stacked-bar-chart/horizontal-stacked-bar-chart';
import { LineChart } from '../registry/charts/line-chart/line-chart';
import { MultiSeriesLineChart } from '../registry/charts/multi-series-line-chart/multi-series-line-chart';
import { PieChart } from '../registry/charts/pie-chart/pie-chart';
import { RadarChart } from '../registry/charts/radar-chart/radar-chart';
import { RadialBarChart } from '../registry/charts/radial-bar-chart/radial-bar-chart';
import { ScatterChart } from '../registry/charts/scatter-chart/scatter-chart';
import { StackedAreaChart } from '../registry/charts/stacked-area-chart/stacked-area-chart';
import { StackedBarChart } from '../registry/charts/stacked-bar-chart/stacked-bar-chart';
import { ThresholdChart } from '../registry/charts/threshold-chart/threshold-chart';
import { TreemapChart } from '../registry/charts/treemap-chart/treemap-chart';

const PACKAGE_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const REPO_ROOT = path.resolve(PACKAGE_ROOT, '../..');
const ROOT_REGISTRY_PATH = path.join(REPO_ROOT, 'registry.json');
const SOURCE_REGISTRY_PATH = path.join(PACKAGE_ROOT, 'registry.json');

class MockResizeObserver implements ResizeObserver {
  private readonly observed = new Set<Element>();

  disconnect() {
    this.observed.clear();
  }

  observe(target: Element) {
    this.observed.add(target);
  }

  unobserve(target: Element) {
    this.observed.delete(target);
  }
}

Object.defineProperty(window, 'ResizeObserver', {
  configurable: true,
  value: MockResizeObserver,
  writable: true,
});

function readJson(filePath: string) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8')) as unknown;
}

const CORE_CHART_ITEMS = [
  'line-chart',
  'bar-chart',
  'area-chart',
  'scatter-chart',
  'stacked-bar-chart',
  'multi-series-line-chart',
  'pie-chart',
  'histogram-chart',
] as const;

const EXTENDED_CHART_ITEMS = [
  'grouped-bar-chart',
  'horizontal-stacked-bar-chart',
  'stacked-area-chart',
  'threshold-chart',
  'heatmap-chart',
  'radar-chart',
  'radial-bar-chart',
  'treemap-chart',
] as const;

const REGISTRY_ITEMS = [...CORE_CHART_ITEMS, ...EXTENDED_CHART_ITEMS] as const;

type RegistryItemName = (typeof REGISTRY_ITEMS)[number];

const CHART_UI_ITEMS = [
  'bar-chart',
  'stacked-bar-chart',
  'multi-series-line-chart',
  'grouped-bar-chart',
  'horizontal-stacked-bar-chart',
  'stacked-area-chart',
  'threshold-chart',
] as const;

const CARTESIAN_DEPENDENCIES = [
  '@visx/a11y',
  '@visx/axis',
  '@visx/chart',
  '@visx/grid',
  '@visx/responsive',
  '@visx/scale',
  '@visx/shape',
  '@visx/theme',
];

const PIE_DEPENDENCIES = [
  '@visx/a11y',
  '@visx/chart',
  '@visx/responsive',
  '@visx/shape',
  '@visx/theme',
];

const THRESHOLD_DEPENDENCIES = [
  '@visx/a11y',
  '@visx/axis',
  '@visx/chart',
  '@visx/grid',
  '@visx/responsive',
  '@visx/scale',
  '@visx/shape',
  '@visx/threshold',
  '@visx/theme',
];

const HEATMAP_DEPENDENCIES = [
  '@visx/a11y',
  '@visx/chart',
  '@visx/heatmap',
  '@visx/responsive',
  '@visx/scale',
  '@visx/theme',
];

const RADAR_DEPENDENCIES = [
  '@visx/a11y',
  '@visx/chart',
  '@visx/responsive',
  '@visx/scale',
  '@visx/theme',
];

const RADIAL_BAR_DEPENDENCIES = [
  '@visx/a11y',
  '@visx/chart',
  '@visx/responsive',
  '@visx/scale',
  '@visx/shape',
  '@visx/theme',
];

const TREEMAP_DEPENDENCIES = [
  '@visx/a11y',
  '@visx/chart',
  '@visx/hierarchy',
  '@visx/responsive',
  '@visx/scale',
  '@visx/theme',
];

const REGISTRY_DEPENDENCIES = {
  'line-chart': CARTESIAN_DEPENDENCIES,
  'bar-chart': CARTESIAN_DEPENDENCIES,
  'area-chart': CARTESIAN_DEPENDENCIES,
  'scatter-chart': CARTESIAN_DEPENDENCIES,
  'stacked-bar-chart': CARTESIAN_DEPENDENCIES,
  'multi-series-line-chart': CARTESIAN_DEPENDENCIES,
  'pie-chart': PIE_DEPENDENCIES,
  'histogram-chart': CARTESIAN_DEPENDENCIES,
  'grouped-bar-chart': CARTESIAN_DEPENDENCIES,
  'horizontal-stacked-bar-chart': CARTESIAN_DEPENDENCIES,
  'stacked-area-chart': CARTESIAN_DEPENDENCIES,
  'threshold-chart': THRESHOLD_DEPENDENCIES,
  'heatmap-chart': HEATMAP_DEPENDENCIES,
  'radar-chart': RADAR_DEPENDENCIES,
  'radial-bar-chart': RADIAL_BAR_DEPENDENCIES,
  'treemap-chart': TREEMAP_DEPENDENCIES,
} satisfies Record<RegistryItemName, readonly string[]>;

const chartComponents: {
  Component: ComponentType<{ id?: string; showLiveRegion?: boolean; title: string }>;
  markerSelector: string;
  name: RegistryItemName;
}[] = [
  { name: 'line-chart', Component: LineChart, markerSelector: '[data-line-chart-point]' },
  { name: 'bar-chart', Component: BarChart, markerSelector: '[data-bar-chart-bar]' },
  { name: 'area-chart', Component: AreaChart, markerSelector: '[data-area-chart-point]' },
  { name: 'scatter-chart', Component: ScatterChart, markerSelector: '[data-scatter-chart-point]' },
  {
    name: 'stacked-bar-chart',
    Component: StackedBarChart,
    markerSelector: '[data-stacked-bar-chart-bar]',
  },
  {
    name: 'multi-series-line-chart',
    Component: MultiSeriesLineChart,
    markerSelector: '[data-multi-series-line-chart-point]',
  },
  { name: 'pie-chart', Component: PieChart, markerSelector: '[data-pie-chart-segment]' },
  {
    name: 'histogram-chart',
    Component: HistogramChart,
    markerSelector: '[data-histogram-chart-bin]',
  },
  {
    name: 'grouped-bar-chart',
    Component: GroupedBarChart,
    markerSelector: '[data-grouped-bar-chart-bar]',
  },
  {
    name: 'horizontal-stacked-bar-chart',
    Component: HorizontalStackedBarChart,
    markerSelector: '[data-horizontal-stacked-bar-chart-bar]',
  },
  {
    name: 'stacked-area-chart',
    Component: StackedAreaChart,
    markerSelector: '[data-stacked-area-chart-point]',
  },
  {
    name: 'threshold-chart',
    Component: ThresholdChart,
    markerSelector: '[data-threshold-chart-point]',
  },
  {
    name: 'heatmap-chart',
    Component: HeatmapChart,
    markerSelector: '[data-heatmap-chart-cell]',
  },
  { name: 'radar-chart', Component: RadarChart, markerSelector: '[data-radar-chart-point]' },
  {
    name: 'radial-bar-chart',
    Component: RadialBarChart,
    markerSelector: '[data-radial-bar-chart-bar]',
  },
  {
    name: 'treemap-chart',
    Component: TreemapChart,
    markerSelector: '[data-treemap-chart-cell]',
  },
];

const emptyStateChartComponents: {
  Component: ComponentType<Record<string, unknown>>;
  markerSelector: string;
  name: RegistryItemName;
  props: Record<string, unknown>;
}[] = chartComponents.map(({ Component, markerSelector, name }) => ({
  Component: Component as ComponentType<Record<string, unknown>>,
  markerSelector,
  name,
  props:
    name === 'histogram-chart'
      ? { values: [] }
      : name === 'multi-series-line-chart'
      ? { series: [] }
      : { data: [] },
}));

const legendChartComponents: {
  Component: ComponentType<{
    id?: string;
    showLegend?: boolean;
    showLiveRegion?: boolean;
    title: string;
  }>;
  labels: string[];
  name: (typeof CHART_UI_ITEMS)[number];
}[] = [
  {
    name: 'stacked-bar-chart',
    Component: StackedBarChart,
    labels: ['Desktop', 'Mobile', 'Tablet'],
  },
  {
    name: 'multi-series-line-chart',
    Component: MultiSeriesLineChart,
    labels: ['Desktop', 'Mobile'],
  },
  {
    name: 'grouped-bar-chart',
    Component: GroupedBarChart,
    labels: ['Desktop', 'Mobile', 'Tablet'],
  },
  {
    name: 'horizontal-stacked-bar-chart',
    Component: HorizontalStackedBarChart,
    labels: ['Desktop', 'Mobile', 'Tablet'],
  },
  {
    name: 'stacked-area-chart',
    Component: StackedAreaChart,
    labels: ['Desktop', 'Mobile', 'Tablet'],
  },
  { name: 'threshold-chart', Component: ThresholdChart, labels: ['Actual', 'Target'] },
];

describe('@visx/registry scaffold', () => {
  it('exposes a root GitHub registry entrypoint for shadcn installs', () => {
    const rootRegistry = readJson(ROOT_REGISTRY_PATH) as {
      homepage?: string;
      include?: string[];
      name?: string;
    };

    expect(rootRegistry.name).toBe('visx');
    expect(rootRegistry.homepage).toBe('https://github.com/airbnb/visx');
    expect(rootRegistry.include).toEqual(['packages/visx-registry/registry.json']);
  });

  it('ships the core and extended chart sets in registry order', () => {
    const registry = readJson(SOURCE_REGISTRY_PATH) as {
      items: { meta?: Record<string, unknown>; name: string }[];
    };

    expect(registry.items.map((item) => item.name)).toEqual(REGISTRY_ITEMS);
    registry.items.forEach((item, index) => {
      expect(item.meta).toMatchObject({
        a11y: true,
        client: true,
        ssr: true,
        tier: index < CORE_CHART_ITEMS.length ? 'core' : 'extended',
      });
    });
  });

  it('declares GitHub registry source files and install metadata', () => {
    const registry = readJson(SOURCE_REGISTRY_PATH) as {
      items: {
        dependencies?: string[];
        files?: { content?: string; path: string; target?: string; type: string }[];
        name: string;
        type?: string;
      }[];
    };
    const itemsByName = new Map(registry.items.map((item) => [item.name, item]));

    REGISTRY_ITEMS.forEach((name) => {
      const item = itemsByName.get(name);
      const file = item?.files?.find(({ target }) => target === `components/charts/${name}.tsx`);

      expect(item?.type).toBe('registry:block');
      expect(item?.dependencies).toEqual(REGISTRY_DEPENDENCIES[name]);
      expect(file).toMatchObject({
        path: `registry/charts/${name}/${name}.tsx`,
        target: `components/charts/${name}.tsx`,
        type: 'registry:component',
      });
      expect(file?.content).toBeUndefined();

      const source = fs.readFileSync(path.join(PACKAGE_ROOT, file?.path ?? ''), 'utf8');

      expect(source.startsWith("'use client';\n\n")).toBe(true);
      expect(source).toContain('export function');
      expect(source).toContain('@visx/a11y/react');
    });

    CHART_UI_ITEMS.forEach((name) => {
      expect(itemsByName.get(name)?.files).toContainEqual({
        path: 'registry/charts/bar-chart/chart-ui.tsx',
        target: 'components/charts/chart-ui.tsx',
        type: 'registry:component',
      });
    });
  });

  it('renders the line chart with themed marks and a11y semantics', () => {
    const { container } = render(<LineChart id="sales-chart" title="Sales" />);
    const svg = container.querySelector('svg');
    const line = container.querySelector('path');
    const points = container.querySelectorAll('[data-line-chart-point]');
    const table = container.querySelector('table');
    const liveRegions = container.querySelectorAll('[aria-live]');

    expect(svg?.getAttribute('role')).toBe('graphics-document');
    expect(svg?.getAttribute('aria-label')).toBe('Sales');
    expect(svg?.getAttribute('viewBox')).toBe('0 0 640 320');
    expect(svg?.getAttribute('width')).toBe('640');
    expect(line?.getAttribute('stroke')).toContain('var(--chart-1');
    expect(points).toHaveLength(6);
    expect(points[0].getAttribute('aria-label')).toContain('Sales, Jan, 32');
    expect(table?.id).toBe('sales-chart-table');
    expect(liveRegions).toHaveLength(1);
  });

  it('can disable its live region when a dashboard owns the page-level announcer', () => {
    const { container } = render(
      <>
        <LineChart id="primary-chart" title="Primary" />
        <LineChart id="secondary-chart" title="Secondary" showLiveRegion={false} />
      </>,
    );

    expect(container.querySelectorAll('[aria-live]')).toHaveLength(1);
  });

  it('renders bar chart config, legend, and tooltip affordances', () => {
    const { container } = render(
      <BarChart
        config={{
          bookings: {
            label: 'Bookings',
            color: 'var(--chart-2)',
          },
        }}
        formatValue={(value) => `${value} bookings`}
        id="booking-chart"
        seriesKey="bookings"
        showLegend
        title="Bookings by channel"
      />,
    );
    const bar = container.querySelector('[data-bar-chart-bar]');
    const legend = container.querySelector('[aria-label="Chart legend"]');

    expect(bar?.getAttribute('fill')).toBe('var(--chart-2)');
    expect(legend?.textContent).toContain('Bookings');
    expect(container.querySelector('[role="tooltip"]')).toBeNull();

    fireEvent.pointerEnter(bar as Element);

    const tooltip = container.querySelector('[role="tooltip"]');

    expect(tooltip?.textContent).toContain('Jan');
    expect(tooltip?.textContent).toContain('Bookings');
    expect(tooltip?.textContent).toContain('32 bookings');
    expect(tooltip?.getAttribute('style')).toContain('max-width: calc(624px)');

    fireEvent.pointerLeave(bar as Element);

    expect(container.querySelector('[role="tooltip"]')).toBeNull();
  });

  it('generates unique a11y ids for multiple chart instances without explicit ids', () => {
    const { container } = render(
      <>
        <LineChart title="Sales" showLiveRegion={false} />
        <LineChart title="Sales" showLiveRegion={false} />
      </>,
    );
    const svgs = Array.from(container.querySelectorAll('svg[role="graphics-document"]'));
    const svgIds = svgs.map((svg) => svg.id);
    const descriptionIds = svgs.map((svg) => svg.getAttribute('aria-describedby'));
    const tableIds = Array.from(container.querySelectorAll('table'), (table) => table.id);

    expect(svgs.length).toBe(2);
    expect(svgIds.length).toBe(2);
    expect(descriptionIds.length).toBe(2);
    expect(tableIds.length).toBe(2);
    expect(new Set(svgIds).size).toBe(2);
    expect(new Set(descriptionIds).size).toBe(2);
    expect(new Set(tableIds).size).toBe(2);
    expect(descriptionIds).toEqual(svgIds.map((svgId) => `${svgId}-description`));
    descriptionIds.forEach((descriptionId) => {
      expect(container.querySelector(`desc[id="${descriptionId}"]`)).not.toBeNull();
    });
  });

  it.each(chartComponents)(
    'renders $name with live a11y wiring',
    ({ Component, markerSelector, name }) => {
      const { container } = render(<Component id={`${name}-chart`} title={name} />);
      const svg = container.querySelector('svg');
      const table = container.querySelector('table');
      const liveRegions = container.querySelectorAll('[aria-live]');

      expect(svg?.getAttribute('role')).toBe('graphics-document');
      expect(svg?.getAttribute('aria-label')).toBe(name);
      expect(table?.id).toBe(`${name}-chart-table`);
      expect(container.querySelector(markerSelector)).not.toBeNull();
      expect(liveRegions).toHaveLength(1);
      expect(container.innerHTML).not.toContain('NaN');
      expect(container.innerHTML).not.toContain('Infinity');
    },
  );

  it('rounds only the top visible stacked bar segment for each category', () => {
    const { container } = render(
      <StackedBarChart
        data={[
          { x: 'Jan', desktop: 10, mobile: 20, tablet: 30 },
          { x: 'Feb', desktop: 12, mobile: 0, tablet: 24 },
        ]}
        id="stacked-rounding"
        title="Stacked rounding"
      />,
    );

    expect(container.querySelectorAll('[data-stacked-bar-chart-bar]')).toHaveLength(5);
    expect(container.querySelectorAll('path[data-stacked-bar-chart-bar]')).toHaveLength(2);
    expect(container.querySelectorAll('rect[data-stacked-bar-chart-bar]')).toHaveLength(3);
    container.querySelectorAll('rect[data-stacked-bar-chart-bar]').forEach((rect) => {
      expect(rect.getAttribute('rx')).toBeNull();
    });
  });

  it('rounds only the top corners for bar and histogram chart marks', () => {
    const bar = render(<BarChart id="bar-rounding" title="Bar rounding" />);
    const histogram = render(<HistogramChart id="histogram-rounding" title="Histogram rounding" />);
    const countArcs = (element: Element) => element.getAttribute('d')?.match(/a/g)?.length ?? 0;

    expect(bar.container.querySelectorAll('path[data-bar-chart-bar]')).toHaveLength(6);
    expect(bar.container.querySelectorAll('rect[data-bar-chart-bar]')).toHaveLength(0);
    bar.container.querySelectorAll('path[data-bar-chart-bar]').forEach((element) => {
      expect(countArcs(element)).toBe(2);
    });
    expect(histogram.container.querySelectorAll('path[data-histogram-chart-bin]')).toHaveLength(6);
    expect(histogram.container.querySelectorAll('rect[data-histogram-chart-bin]')).toHaveLength(0);
    histogram.container.querySelectorAll('path[data-histogram-chart-bin]').forEach((element) => {
      expect(countArcs(element)).toBe(2);
    });
  });

  it('supports explicit histogram tick values and tick formatting', () => {
    const { container } = render(
      <HistogramChart
        binCount={4}
        id="histogram-ticks"
        title="Histogram ticks"
        values={[0, 10, 20, 30, 40]}
        xTickFormat={(value) => `bin:${value}`}
        xTickValues={['0-10', '30-40']}
      />,
    );
    const svgLabels = Array.from(
      container.querySelectorAll('svg text'),
      (text) => text.textContent,
    );

    expect(svgLabels).toContain('bin:0-10');
    expect(svgLabels).toContain('bin:30-40');
    expect(svgLabels).not.toContain('bin:10-20');
    expect(svgLabels).not.toContain('bin:20-30');
  });

  it.each(legendChartComponents)(
    'renders a legend for $name by default',
    ({ Component, labels, name }) => {
      const { container } = render(
        <Component id={`${name}-legend`} title={name} showLiveRegion={false} />,
      );
      const legend = container.querySelector('[aria-label="Chart legend"]');

      expect(legend).not.toBeNull();
      labels.forEach((label) => {
        expect(legend?.textContent).toContain(label);
      });
    },
  );

  it('renders empty and single-datum states without invalid SVG output', () => {
    const empty = render(<LineChart id="empty-chart" title="Empty" data={[]} />);

    expect(empty.container.querySelector('desc')?.textContent).toContain('has no data');
    expect(empty.container.querySelector('path')).toBeNull();
    expect(empty.container.querySelectorAll('[data-line-chart-point]')).toHaveLength(0);

    const single = render(
      <LineChart id="single-chart" title="Single" data={[{ x: 'Only', y: 10 }]} />,
    );

    expect(single.container.querySelector('path')).toBeNull();
    expect(single.container.querySelectorAll('[data-line-chart-point]')).toHaveLength(1);
    expect(single.container.innerHTML).not.toContain('NaN');
    expect(single.container.innerHTML).not.toContain('Infinity');
  });

  it.each(emptyStateChartComponents)(
    'renders an empty $name without invalid SVG output',
    ({ Component, markerSelector, name, props }) => {
      const { container } = render(
        <Component
          id={`empty-${name}`}
          title={`Empty ${name}`}
          showLiveRegion={false}
          {...props}
        />,
      );

      expect(container.querySelector('svg[role="graphics-document"]')).not.toBeNull();
      expect(container.querySelector('desc')?.textContent).toMatch(
        /has no data|has no numeric values/,
      );
      expect(container.querySelectorAll(markerSelector)).toHaveLength(0);
      expect(container.innerHTML).not.toContain('NaN');
      expect(container.innerHTML).not.toContain('Infinity');
    },
  );

  it.each(chartComponents)(
    'supports server rendering $name with hidden tabular fallback content',
    ({ Component, name }) => {
      const html = renderToString(<Component id={`ssr-${name}`} title={`SSR ${name}`} />);

      expect(html).toContain('role="graphics-document"');
      expect(html).toContain(`ssr-${name}-description`);
      expect(html).toContain('<table');
      expect(html).toContain(`SSR ${name}`);
    },
  );

  it('installs line-chart into fresh Next and Vite fixtures with the real shadcn CLI', () => {
    expect(() => smokeInstallRegistryItem('line-chart')).not.toThrow();
  }, 20_000);
});
