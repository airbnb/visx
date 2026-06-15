import type { ComponentType } from 'react';
import { useCallback, useId, useMemo, useState } from 'react';

import { ChartA11yAnnouncer } from './components/ChartA11yAnnouncer';
import type { ChartA11yAnnouncerProps } from './components/ChartA11yAnnouncer';
import { ChartA11yDataTable } from './components/ChartA11yDataTable';
import type { ChartA11yDataTableProps } from './components/ChartA11yDataTable';
import { getChartAriaProps } from './generators/ariaProps';
import { generateChartDescription } from './generators/description';
import type { ChartA11yMode, ChartA11yPointFocus } from './keyboard/stateMachine';
import type {
  ChartA11yConfig,
  ChartA11yPointProps,
  ChartA11ySeriesProps,
  ChartA11ySvgProps,
} from './types';
import { useChartKeyboardNav } from './useChartKeyboardNav';
import type {
  UseChartKeyboardNavPointProps,
  UseChartKeyboardNavSvgProps,
} from './useChartKeyboardNav';
import { DEFAULT_CHART_A11Y_ID_PREFIX } from './utils/data';

export type { ChartA11yMode } from './keyboard/stateMachine';

export type UseChartA11ySvgProps = ChartA11ySvgProps & UseChartKeyboardNavSvgProps;

export type UseChartA11yPointProps = Partial<ChartA11yPointProps> & UseChartKeyboardNavPointProps;

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
  focusedPoint: ChartA11yPointFocus | null;
};

function formatReactId(id: string) {
  return id.replace(/[^\w-]/g, '') || 'chart';
}

export function useChartA11y<Datum>(config: ChartA11yConfig<Datum>): UseChartA11yResult<Datum> {
  const reactId = useId();
  const [announcement, setAnnouncement] = useState('');
  const id =
    config.id ?? `${config.idPrefix ?? DEFAULT_CHART_A11Y_ID_PREFIX}-${formatReactId(reactId)}`;
  const hookConfig = useMemo(() => ({ ...config, id }), [config, id]);
  const ariaProps = useMemo(() => getChartAriaProps(hookConfig), [hookConfig]);
  const description = useMemo(() => generateChartDescription(hookConfig), [hookConfig]);
  const keyboard = useChartKeyboardNav({
    data: hookConfig.data,
    keyboardNavEnabled: hookConfig.keyboardNavEnabled,
    locale: hookConfig.locale,
    onKeyboardHelp: setAnnouncement,
    onPointFocus: hookConfig.onPointFocus,
    pointDescriptionThreshold: hookConfig.pointDescriptionThreshold,
    series: hookConfig.series,
  });
  const {
    focusedPoint,
    getPointProps: getKeyboardPointProps,
    mode,
    svgProps: keyboardSvgProps,
  } = keyboard;

  const svgProps = useMemo<UseChartA11ySvgProps>(
    () => ({
      ...ariaProps.svg,
      ...keyboardSvgProps,
    }),
    [ariaProps.svg, keyboardSvgProps],
  );

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
        ...pointProps,
        ...getKeyboardPointProps(seriesIndex, index),
      };
    },
    [ariaProps.points, getKeyboardPointProps],
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
    mode,
    focusedPoint,
  };
}
