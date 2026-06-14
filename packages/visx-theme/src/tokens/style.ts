import { resolveThemeInput } from '../runtime/resolveThemeInput';
import normalizeCategoricalColors from './categorical';
import { cssVarNames } from './names';
import type { CSSVarName, CSSVarStyle, VisxThemeInput } from './types';

function setCssVar(style: CSSVarStyle, name: CSSVarName, value: string | undefined) {
  if (value !== undefined) {
    style[name] = value;
  }
}

export default function createThemeStyle(theme: Exclude<VisxThemeInput, 'auto'>): CSSVarStyle {
  const definition = resolveThemeInput(theme);
  const { colors } = definition;
  const categorical = normalizeCategoricalColors(colors.categorical);
  const style: CSSVarStyle = {};

  cssVarNames.categorical.forEach((name, index) => {
    setCssVar(style, name, categorical[index]);
  });

  setCssVar(style, cssVarNames.sequentialFrom, colors.sequentialFrom);
  setCssVar(style, cssVarNames.sequentialTo, colors.sequentialTo);
  setCssVar(style, cssVarNames.divergingNegative, colors.divergingNegative);
  setCssVar(style, cssVarNames.divergingNeutral, colors.divergingNeutral);
  setCssVar(style, cssVarNames.divergingPositive, colors.divergingPositive);

  setCssVar(style, cssVarNames.background, colors.background);
  setCssVar(style, cssVarNames.surface, colors.surface);
  setCssVar(style, cssVarNames.border, colors.border);
  setCssVar(style, cssVarNames.textPrimary, colors.textPrimary);
  setCssVar(style, cssVarNames.textMuted, colors.textMuted);

  setCssVar(style, cssVarNames.positive, colors.positive);
  setCssVar(style, cssVarNames.negative, colors.negative);
  setCssVar(style, cssVarNames.highlight, colors.highlight);

  setCssVar(style, cssVarNames.axisStroke, colors.axisStroke);
  setCssVar(style, cssVarNames.axisTickStroke, colors.axisTickStroke);
  setCssVar(style, cssVarNames.gridStroke, colors.gridStroke);

  setCssVar(style, cssVarNames.fontFamily, definition.typography.fontFamily);

  return style;
}
