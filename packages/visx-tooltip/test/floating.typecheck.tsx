import {
  ChartTooltip,
  useChartTooltip,
  type ChartTooltipConfig,
  type ChartTooltipItem,
} from '../src/floating';

type Datum = {
  month: string;
  revenue: number;
};

const item: ChartTooltipItem<Datum> = {
  key: 'revenue',
  datum: { month: 'Jan', revenue: 10 },
  rawValue: 10,
};

const config = {
  revenue: {
    label: 'Revenue',
    formatValue: (value, tooltipItem) => `${tooltipItem.datum?.month}: ${value}`,
  },
} satisfies ChartTooltipConfig<Datum>;

function HookUsage() {
  const tooltip = useChartTooltip<Datum>();

  tooltip.show({
    anchor: { x: 0, y: 0 },
    items: [item],
  });

  tooltip.show({
    anchor: { type: 'svg-local-point', x: 0, y: 0 },
    items: [item],
  });

  return <ChartTooltip {...tooltip.tooltipProps} config={config} />;
}

const floatingOptionsCannotControlState = (
  <ChartTooltip
    open
    anchor={null}
    items={[item]}
    floatingOptions={{
      // @ts-expect-error controlled open state lives on ChartTooltip props
      open: false,
    }}
  />
);

const floatingOptionsCannotUseDescriptionRole = (
  <ChartTooltip
    open
    anchor={null}
    items={[item]}
    floatingOptions={{
      // @ts-expect-error description is not a supported Floating UI role value for this API
      role: 'description',
    }}
  />
);

export { HookUsage, floatingOptionsCannotControlState, floatingOptionsCannotUseDescriptionRole };
