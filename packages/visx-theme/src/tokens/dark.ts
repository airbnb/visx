import type { VisxThemeDefinition } from './types';
import lightTheme from './light';

const darkTheme: VisxThemeDefinition = {
  ...lightTheme,
  name: 'dark',
  colors: {
    categorical: [
      '#60a5fa',
      '#34d399',
      '#fbbf24',
      '#f87171',
      '#a78bfa',
      '#22d3ee',
      '#a3e635',
      '#fb923c',
      '#f472b6',
      '#818cf8',
      '#2dd4bf',
      '#94a3b8',
    ],

    sequentialFrom: '#60a5fa',
    sequentialTo: '#34d399',
    divergingNegative: '#f87171',
    divergingNeutral: '#64748b',
    divergingPositive: '#4ade80',

    background: '#020617',
    surface: '#0f172a',
    border: '#334155',
    textPrimary: '#f8fafc',
    textMuted: '#94a3b8',

    positive: '#4ade80',
    negative: '#f87171',
    highlight: '#60a5fa',

    axisStroke: '#334155',
    axisTickStroke: '#334155',
    gridStroke: '#1e293b',
  },
  typography: { ...lightTheme.typography },
  axis: { ...lightTheme.axis },
  grid: { ...lightTheme.grid },
  spacing: {
    margin: { ...lightTheme.spacing.margin },
  },
};

export default darkTheme;
