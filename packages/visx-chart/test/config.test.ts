import { describe, expect, it } from 'vitest';
import {
  getChartConfigColor,
  getChartConfigEntry,
  getChartConfigIcon,
  getChartConfigLabel,
  getChartCssVariableName,
  getChartCssVariables,
  type ChartConfig,
} from '../src';

function Icon() {
  return null;
}

const config = {
  desktop: {
    label: 'Desktop',
    color: 'var(--chart-1)',
    icon: Icon,
  },
  mobile: {
    label: 'Mobile',
    theme: {
      light: 'oklch(0.6 0.1 184)',
      dark: 'oklch(0.7 0.1 162)',
    },
  },
} satisfies ChartConfig;

describe('chart config helpers', () => {
  it('returns labels, colors, icons, and fallbacks for chart config entries', () => {
    expect(getChartConfigEntry(config, 'desktop')).toEqual(config.desktop);
    expect(getChartConfigLabel(config, 'desktop')).toBe('Desktop');
    expect(getChartConfigLabel(config, 'tablet', 'Tablet')).toBe('Tablet');
    expect(getChartConfigColor(config, 'desktop')).toBe('var(--chart-1)');
    expect(getChartConfigColor(config, 'mobile', undefined, 'dark')).toBe('oklch(0.7 0.1 162)');
    expect(getChartConfigColor(config, 'mobile', 'fallback')).toBe('fallback');
    expect(getChartConfigIcon(config, 'desktop')).toBe(Icon);
  });

  it('creates stable CSS variables from chart config keys', () => {
    expect(getChartCssVariableName('desktop visitors')).toBe('--color-desktop-visitors');
    expect(getChartCssVariables(config, 'light')).toEqual({
      '--color-desktop': 'var(--chart-1)',
      '--color-mobile': 'oklch(0.6 0.1 184)',
    });
  });
});
