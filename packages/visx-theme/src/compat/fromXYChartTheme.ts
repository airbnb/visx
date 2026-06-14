import defineTheme from '../provider/defineTheme';
import normalizeCategoricalColors from '../tokens/categorical';
import lightTheme from '../tokens/light';
import type { CategoricalColorScale, VisxThemeDefinition } from '../tokens/types';

type StrokeLike = string | number;
type FontSizeLike = string | number;

type LineStyleLike = {
  stroke?: StrokeLike;
};

type AxisStyleLike = {
  axisLine?: LineStyleLike;
  tickLine?: LineStyleLike;
};

export interface XYChartThemeLike {
  backgroundColor?: string;
  colors?: readonly string[];
  gridStyles?: {
    stroke?: StrokeLike;
  };
  axisStyles?: {
    x?: {
      top?: AxisStyleLike;
      bottom?: AxisStyleLike;
    };
    y?: {
      left?: AxisStyleLike;
      right?: AxisStyleLike;
    };
  };
  svgLabelBig?: {
    fill?: string;
    fontFamily?: string;
    fontSize?: FontSizeLike;
  };
  svgLabelSmall?: {
    fill?: string;
    fontFamily?: string;
    fontSize?: FontSizeLike;
  };
}

function toStringValue(value: StrokeLike | undefined): string | undefined {
  if (value == null) {
    return undefined;
  }

  const stringValue = `${value}`;

  return stringValue === '' ? undefined : stringValue;
}

function firstStringValue(...values: (StrokeLike | undefined)[]) {
  for (const value of values) {
    const stringValue = toStringValue(value);

    if (stringValue !== undefined) {
      return stringValue;
    }
  }

  return undefined;
}

function toNumberValue(value: FontSizeLike | undefined): number | undefined {
  if (typeof value === 'number') {
    return Number.isFinite(value) ? value : undefined;
  }

  if (typeof value === 'string' && value.trim() !== '') {
    const parsedValue = Number.parseFloat(value);

    return Number.isFinite(parsedValue) ? parsedValue : undefined;
  }

  return undefined;
}

function normalizeXYChartColors(colors: readonly string[] | undefined) {
  if (colors == null || colors.length === 0) {
    return undefined;
  }

  return normalizeCategoricalColors(colors) as CategoricalColorScale;
}

export default function fromXYChartTheme(theme: XYChartThemeLike = {}): VisxThemeDefinition {
  const axisStroke = firstStringValue(
    theme.axisStyles?.x?.bottom?.axisLine?.stroke,
    theme.axisStyles?.x?.top?.axisLine?.stroke,
    theme.axisStyles?.y?.left?.axisLine?.stroke,
    theme.axisStyles?.y?.right?.axisLine?.stroke,
  );
  const axisTickStroke = firstStringValue(
    theme.axisStyles?.x?.bottom?.tickLine?.stroke,
    theme.axisStyles?.x?.top?.tickLine?.stroke,
    theme.axisStyles?.y?.left?.tickLine?.stroke,
    theme.axisStyles?.y?.right?.tickLine?.stroke,
  );
  const gridStroke = toStringValue(theme.gridStyles?.stroke);
  const categorical = normalizeXYChartColors(theme.colors);
  const fontFamily = firstStringValue(
    theme.svgLabelBig?.fontFamily,
    theme.svgLabelSmall?.fontFamily,
  );
  const fontSizeLabel = toNumberValue(theme.svgLabelBig?.fontSize);
  const fontSizeTick = toNumberValue(theme.svgLabelSmall?.fontSize);

  return defineTheme(
    {
      name: 'xychart',
      colors: {
        ...(categorical == null ? {} : { categorical }),
        ...(theme.backgroundColor == null ? {} : { background: theme.backgroundColor }),
        ...(theme.svgLabelBig?.fill == null ? {} : { textPrimary: theme.svgLabelBig.fill }),
        ...(theme.svgLabelSmall?.fill == null ? {} : { textMuted: theme.svgLabelSmall.fill }),
        ...(axisStroke == null ? {} : { axisStroke }),
        ...(axisTickStroke == null ? {} : { axisTickStroke }),
        ...(gridStroke == null ? {} : { gridStroke }),
      },
      typography: {
        ...(fontFamily == null ? {} : { fontFamily }),
        ...(fontSizeLabel == null ? {} : { fontSizeLabel }),
        ...(fontSizeTick == null ? {} : { fontSizeTick }),
      },
    },
    lightTheme,
  );
}
