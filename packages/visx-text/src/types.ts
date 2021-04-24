type SVGTSpanProps = React.SVGAttributes<SVGTSpanElement>;
type SVGTextProps = React.SVGAttributes<SVGTextElement>;

type OwnProps = {
  /** className to apply to the SVGText element. */
  className?: string;
  /** Whether to scale the fontSize to accommodate the specified width.  */
  scaleToFit?: boolean;
  /** Rotational angle of the text. */
  angle?: number;
  /** Horizontal text anchor. */
  textAnchor?: 'start' | 'middle' | 'end' | 'inherit';
  /** Vertical text anchor. */
  verticalAnchor?: 'start' | 'middle' | 'end';
  /** Styles to be applied to the text (and used in computation of its size). */
  style?: React.CSSProperties;
  /** Ref passed to the Text SVG element. */
  innerRef?: React.Ref<SVGSVGElement>;
  /** Ref passed to the Text text element */
  innerTextRef?: React.Ref<SVGTextElement>;
  /** x position of the text. */
  x?: string | number;
  /** y position of the text. */
  y?: string | number;
  /** dx offset of the text. */
  dx?: string | number;
  /** dy offset of the text. */
  dy?: string | number;
  /** Desired "line height" of the text, implemented as y offsets. */
  lineHeight?: SVGTSpanProps['dy'];
  /** Cap height of the text. */
  capHeight?: SVGTSpanProps['capHeight'];
  /** Font size of text. */
  fontSize?: string | number;
  /** Font family of text. */
  fontFamily?: string;
  /** Fill color of text. */
  fill?: string;
  /** Maximum width to occupy (approximate as words are not split). */
  width?: number;
  /** String (or number coercible to one) to be styled and positioned. */
  children?: string | number;
};

export type TextProps = OwnProps & Omit<SVGTextProps, keyof OwnProps>;

export type compareFunction<T> = (prev: T | undefined, next: T) => boolean;

export interface WordsWithWidth {
  words: string[];
  width?: number;
}
