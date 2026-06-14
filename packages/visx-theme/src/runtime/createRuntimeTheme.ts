import normalizeCategoricalColors from '../tokens/categorical';
import cssVar from '../tokens/cssVar';
import { cssVarNames, shadcnFallbackCssVarNames } from '../tokens/names';
import type { VisxThemeInput, VisxThemeRuntime } from '../tokens/types';
import { resolveRuntimeThemeName, resolveThemeInput } from './resolveThemeInput';

export default function createRuntimeTheme(theme: VisxThemeInput = 'auto'): VisxThemeRuntime {
  const definition = resolveThemeInput(theme);
  const { colors } = definition;
  const categorical = normalizeCategoricalColors(colors.categorical);

  return {
    name: resolveRuntimeThemeName(theme),
    colors: {
      categorical: cssVarNames.categorical.map((name, index) => cssVar(name, categorical[index])),

      sequentialFrom: cssVar(
        cssVarNames.sequentialFrom,
        cssVar(cssVarNames.categorical[0], categorical[0]),
      ),
      sequentialTo: cssVar(
        cssVarNames.sequentialTo,
        cssVar(cssVarNames.categorical[1], categorical[1]),
      ),
      divergingNegative: cssVar(
        cssVarNames.divergingNegative,
        cssVar(shadcnFallbackCssVarNames.destructive, colors.divergingNegative),
      ),
      divergingNeutral: cssVar(
        cssVarNames.divergingNeutral,
        cssVar(shadcnFallbackCssVarNames.muted, colors.divergingNeutral),
      ),
      divergingPositive: cssVar(
        cssVarNames.divergingPositive,
        cssVar(shadcnFallbackCssVarNames.primary, colors.divergingPositive),
      ),

      background: cssVar(cssVarNames.background, colors.background),
      surface: cssVar(cssVarNames.surface, cssVar(cssVarNames.background, colors.background)),
      border: cssVar(cssVarNames.border, colors.border),
      textPrimary: cssVar(cssVarNames.textPrimary, colors.textPrimary),
      textMuted: cssVar(cssVarNames.textMuted, colors.textMuted),

      positive: cssVar(cssVarNames.positive, colors.positive),
      negative: cssVar(
        cssVarNames.negative,
        cssVar(shadcnFallbackCssVarNames.destructive, colors.negative),
      ),
      highlight: cssVar(
        cssVarNames.highlight,
        cssVar(shadcnFallbackCssVarNames.primary, colors.highlight),
      ),

      axisStroke: cssVar(cssVarNames.axisStroke, cssVar(cssVarNames.border, colors.border)),
      axisTickStroke: cssVar(cssVarNames.axisTickStroke, cssVar(cssVarNames.border, colors.border)),
      gridStroke: cssVar(cssVarNames.gridStroke, cssVar(cssVarNames.border, colors.border)),
    },
    typography: {
      fontFamily: cssVar(cssVarNames.fontFamily, definition.typography.fontFamily),
      fontSizeTitle: definition.typography.fontSizeTitle,
      fontSizeLabel: definition.typography.fontSizeLabel,
      fontSizeTick: definition.typography.fontSizeTick,
    },
    axis: { ...definition.axis },
    grid: { ...definition.grid },
    spacing: {
      margin: { ...definition.spacing.margin },
    },
  };
}
