import type { ComponentType, CSSProperties } from 'react';

export type VisxThemeMode = 'light' | 'dark' | 'auto';

export type CategoricalColorScale = readonly [string, string, string, string, string, ...string[]];

export interface VisxThemeDefinition {
  /** Identifier for debugging and docs. Not used as a registry key. */
  name: string;

  /** Raw authoring values: hex, hsl, oklch, rgb, CSS color names, or var() references. */
  colors: {
    categorical: CategoricalColorScale;

    sequentialFrom: string;
    sequentialTo: string;
    divergingNegative: string;
    divergingNeutral: string;
    divergingPositive: string;

    background: string;
    surface: string;
    border: string;
    textPrimary: string;
    textMuted: string;

    positive: string;
    negative: string;
    highlight: string;

    axisStroke: string;
    axisTickStroke: string;
    gridStroke: string;
  };

  typography: {
    fontFamily: string;
    fontSizeTitle: number;
    fontSizeLabel: number;
    fontSizeTick: number;
  };

  axis: {
    strokeWidth: number;
    tickLength: number;
  };

  grid: {
    strokeWidth: number;
  };

  spacing: {
    margin: { top: number; right: number; bottom: number; left: number };
  };
}

export type VisxThemeInput = VisxThemeMode | VisxThemeDefinition;

export interface VisxThemeRuntime {
  /** Identifier for debugging. */
  name: string;

  /** Runtime values: CSS-ready var(...) expressions for CSS-backed fields. */
  colors: {
    categorical: readonly string[];

    sequentialFrom: string;
    sequentialTo: string;
    divergingNegative: string;
    divergingNeutral: string;
    divergingPositive: string;

    background: string;
    surface: string;
    border: string;
    textPrimary: string;
    textMuted: string;

    positive: string;
    negative: string;
    highlight: string;

    axisStroke: string;
    axisTickStroke: string;
    gridStroke: string;
  };

  /** fontFamily is runtime CSS-ready; font sizes are JS-only numbers. */
  typography: {
    fontFamily: string;
    fontSizeTitle: number;
    fontSizeLabel: number;
    fontSizeTick: number;
  };

  axis: VisxThemeDefinition['axis'];
  grid: VisxThemeDefinition['grid'];
  spacing: VisxThemeDefinition['spacing'];
}

export type CSSVarName = `--${string}`;

export type CSSVarStyle = CSSProperties & {
  [key: CSSVarName]: string | number | undefined;
};

export interface ChartSeriesConfig {
  /** Human-readable label for legends, tooltips, and screen reader output. */
  label: string;

  /** Optional icon for legends and tooltips. Client-side only if passed across RSC boundaries. */
  icon?: ComponentType<{ className?: string }>;

  /** Explicit color override. May be any CSS color, including var(...). */
  color?: string;
}

export type ChartConfig<K extends string = string> = Record<K, ChartSeriesConfig>;
