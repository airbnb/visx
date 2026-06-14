import type { VisxThemeDefinition } from './types';

const systemSansSerif =
  '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';

const lightTheme: VisxThemeDefinition = {
  name: 'light',
  colors: {
    categorical: [
      '#3b82f6',
      '#10b981',
      '#f59e0b',
      '#ef4444',
      '#8b5cf6',
      '#06b6d4',
      '#84cc16',
      '#f97316',
      '#ec4899',
      '#6366f1',
      '#14b8a6',
      '#64748b',
    ],

    sequentialFrom: '#3b82f6',
    sequentialTo: '#10b981',
    divergingNegative: '#ef4444',
    divergingNeutral: '#94a3b8',
    divergingPositive: '#22c55e',

    background: '#ffffff',
    surface: '#ffffff',
    border: '#e5e7eb',
    textPrimary: '#111827',
    textMuted: '#6b7280',

    positive: '#22c55e',
    negative: '#ef4444',
    highlight: '#2563eb',

    axisStroke: '#e5e7eb',
    axisTickStroke: '#e5e7eb',
    gridStroke: '#f3f4f6',
  },
  typography: {
    fontFamily: systemSansSerif,
    fontSizeTitle: 16,
    fontSizeLabel: 12,
    fontSizeTick: 11,
  },
  axis: {
    strokeWidth: 1,
    tickLength: 4,
  },
  grid: {
    strokeWidth: 1,
  },
  spacing: {
    margin: { top: 20, right: 20, bottom: 40, left: 50 },
  },
};

export default lightTheme;
