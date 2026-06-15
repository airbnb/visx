import type { ComponentType, KeyboardEvent, RefCallback } from 'react';
import { useCallback, useId, useMemo, useRef, useState } from 'react';

import { ChartA11yAnnouncer } from './components/ChartA11yAnnouncer';
import type { ChartA11yAnnouncerProps } from './components/ChartA11yAnnouncer';
import { ChartA11yDataTable } from './components/ChartA11yDataTable';
import type { ChartA11yDataTableProps } from './components/ChartA11yDataTable';
import { getChartAriaProps } from './generators/ariaProps';
import { generateChartDescription } from './generators/description';
import type {
  ChartA11yConfig,
  ChartA11yPointProps,
  ChartA11ySeriesProps,
  ChartA11ySvgProps,
} from './types';
import { DEFAULT_CHART_A11Y_ID_PREFIX } from './utils/data';

export type ChartA11yMode = 'chart' | 'data';

export type UseChartA11ySvgProps = ChartA11ySvgProps & {
  tabIndex?: 0;
  onKeyDown?: (event: KeyboardEvent<SVGSVGElement>) => void;
  ref: RefCallback<SVGSVGElement>;
};

export type UseChartA11yPointProps = ChartA11yPointProps & {
  tabIndex: -1;
  'data-a11y-focused'?: boolean;
};

export type UseChartA11yDataTableProps<Datum> = Pick<
  ChartA11yDataTableProps<Datum>,
  'className' | 'style' | 'visible'
>;

export type UseChartA11yAnnouncerProps = Omit<ChartA11yAnnouncerProps, 'message'>;

export type UseChartA11yResult<Datum> = {
  svgProps: UseChartA11ySvgProps;
  getSeriesProps: (seriesIndex: number) => ChartA11ySeriesProps;
  getPointProps: (seriesIndex: number, index: number) => UseChartA11yPointProps;
  descriptionId: string;
  description: string;
  DataTable: ComponentType<UseChartA11yDataTableProps<Datum>>;
  Announcer: ComponentType<UseChartA11yAnnouncerProps>;
  announce: (message: string) => void;
  mode: ChartA11yMode;
  focusedPoint: { seriesIndex: number; index: number } | null;
};

function formatReactId(id: string) {
  return id.replace(/[^\w-]/g, '') || 'chart';
}

export function useChartA11y<Datum>(config: ChartA11yConfig<Datum>): UseChartA11yResult<Datum> {
  const reactId = useId();
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [announcement, setAnnouncement] = useState('');
  const keyboardNavEnabled = config.keyboardNavEnabled ?? true;
  const id =
    config.id ?? `${config.idPrefix ?? DEFAULT_CHART_A11Y_ID_PREFIX}-${formatReactId(reactId)}`;
  const hookConfig = useMemo(() => ({ ...config, id }), [config, id]);
  const ariaProps = useMemo(() => getChartAriaProps(hookConfig), [hookConfig]);
  const description = useMemo(() => generateChartDescription(hookConfig), [hookConfig]);
  const focusedPoint = null;

  const setSvgRef = useCallback<RefCallback<SVGSVGElement>>((node) => {
    svgRef.current = node;
  }, []);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<SVGSVGElement>) => {
      if (event.key === '?' || event.key === 'F1') {
        setAnnouncement(
          hookConfig.locale?.keyboardHelp ?? 'Keyboard navigation is not yet available.',
        );
      }
    },
    [hookConfig.locale],
  );

  const svgProps = useMemo<UseChartA11ySvgProps>(() => {
    const interactionProps = keyboardNavEnabled
      ? {
          onKeyDown: handleKeyDown,
          tabIndex: 0 as const,
        }
      : {};

    return {
      ...ariaProps.svg,
      ...interactionProps,
      ref: setSvgRef,
    };
  }, [ariaProps.svg, handleKeyDown, keyboardNavEnabled, setSvgRef]);

  const getSeriesProps = useCallback(
    (seriesIndex: number) =>
      ariaProps.series[seriesIndex] ?? {
        role: 'graphics-object',
        'aria-roledescription': hookConfig.locale?.seriesRoleDescription ?? 'series',
        'aria-label': `Series ${seriesIndex + 1}`,
      },
    [ariaProps.series, hookConfig.locale],
  );

  const getPointProps = useCallback(
    (seriesIndex: number, index: number): UseChartA11yPointProps => {
      const pointProps = ariaProps.points[seriesIndex]?.[index];

      return {
        ...(pointProps ?? {
          role: 'graphics-symbol',
          'aria-roledescription': hookConfig.locale?.pointRoleDescription ?? 'data point',
          'aria-label': '',
        }),
        tabIndex: -1,
      };
    },
    [ariaProps.points, hookConfig.locale],
  );

  const DataTable = useCallback(
    ({ visible, className, style }: UseChartA11yDataTableProps<Datum> = {}) => {
      if (hookConfig.dataTableEnabled === false) {
        return null;
      }

      return (
        <ChartA11yDataTable {...hookConfig} className={className} style={style} visible={visible} />
      );
    },
    [hookConfig],
  );

  const Announcer = useCallback(
    (props: UseChartA11yAnnouncerProps = {}) => (
      <ChartA11yAnnouncer {...props} message={announcement} />
    ),
    [announcement],
  );
  const announce = useCallback((message: string) => setAnnouncement(message), []);

  return {
    svgProps,
    getSeriesProps,
    getPointProps,
    descriptionId: ariaProps.ids.descriptionId,
    description,
    DataTable,
    Announcer,
    announce,
    mode: 'chart',
    focusedPoint,
  };
}
