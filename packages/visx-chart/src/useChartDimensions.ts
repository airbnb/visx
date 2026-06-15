import { useStructuralMemo } from '@visx/kernel';

export type MarginShape = {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
};

export type RequiredMarginShape = Required<MarginShape>;

export type UseChartDimensionsOptions = {
  /** Outer SVG width. */
  width?: number;
  /** Outer SVG height. */
  height?: number;
  /** Margins reserved around the drawable chart area. */
  margin?: MarginShape;
};

export type ChartDimensions = {
  width: number;
  height: number;
  margin: RequiredMarginShape;
  innerWidth: number;
  innerHeight: number;
  /** Alias for innerWidth, matching common visx example naming. */
  xMax: number;
  /** Alias for innerHeight, matching common visx example naming. */
  yMax: number;
};

const defaultMargin: RequiredMarginShape = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
};

function finiteOrZero(value: number | undefined) {
  return typeof value === 'number' && Number.isFinite(value) ? value : 0;
}

function normalizeMargin(margin: MarginShape | undefined): RequiredMarginShape {
  return {
    top: finiteOrZero(margin?.top),
    right: finiteOrZero(margin?.right),
    bottom: finiteOrZero(margin?.bottom),
    left: finiteOrZero(margin?.left),
  };
}

export default function useChartDimensions({
  width,
  height,
  margin = defaultMargin,
}: UseChartDimensionsOptions = {}): ChartDimensions {
  const normalizedMargin = useStructuralMemo(normalizeMargin(margin), 1);
  const outerWidth = finiteOrZero(width);
  const outerHeight = finiteOrZero(height);
  const innerWidth = Math.max(0, outerWidth - normalizedMargin.left - normalizedMargin.right);
  const innerHeight = Math.max(0, outerHeight - normalizedMargin.top - normalizedMargin.bottom);

  return useStructuralMemo(
    {
      width: outerWidth,
      height: outerHeight,
      margin: normalizedMargin,
      innerWidth,
      innerHeight,
      xMax: innerWidth,
      yMax: innerHeight,
    },
    1,
  );
}
