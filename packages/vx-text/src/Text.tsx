import React from 'react';
import reduceCSSCalc from 'reduce-css-calc';
import getStringWidth from './util/getStringWidth';
import truncateWord from './util/truncateWord';

const SVG_STYLE = { overflow: 'visible' };

function isNumber(val: unknown): val is number {
  return typeof val === 'number';
}

interface WordWithWidth {
  word: string;
  width: number;
}

interface WordsWithWidth {
  words: string[];
  width?: number;
}

type SVGTSpanProps = React.SVGAttributes<SVGTSpanElement>;
type SVGTextProps = React.SVGAttributes<SVGTextElement>;

type OwnProps = {
  /** className to apply to the SVGText element. */
  className?: string;
  /** Whether to scale the fontSize to accomodate the specified width.  */
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
  /** x position of the text. */
  x?: SVGTSpanProps['x'];
  /** y position of the text. */
  y?: SVGTSpanProps['y'];
  /** dx offset of the text. */
  dx?: SVGTSpanProps['dx'];
  /** dy offset of the text. */
  dy?: SVGTSpanProps['dy'];
  /** Desired "line height" of the text, implemented as y offsets. */
  lineHeight?: SVGTSpanProps['dy'];
  /** Cap height of the text. */
  capHeight?: SVGTSpanProps['capHeight'];
  /** Font size of text. */
  fontSize?: SVGTextProps['fontSize'];
  /** Font family of text. */
  fontFamily?: SVGTextProps['fontFamily'];
  /** Fill color of text. */
  fill?: SVGTextProps['fill'];
  /** Maximum number of lines the text can occupy before applying trunctation. */
  lineClamp?: number;
  /**  Text appended when truncation has been applied */
  truncateText?: string;
  /** Maximum width to occupy (approximate as words are not split). */
  width?: number;
  /** String (or number coercible to one) to be styled and positioned. */
  children?: string | number;
};

export type TextProps = OwnProps & Omit<SVGTextProps, keyof OwnProps>;

type TextState = {
  wordsByLines: WordsWithWidth[];
};

class Text extends React.Component<TextProps, TextState> {
  static defaultProps = {
    x: 0,
    y: 0,
    dx: 0,
    dy: 0,
    lineHeight: '1em',
    capHeight: '0.71em', // Magic number from d3
    scaleToFit: false,
    textAnchor: 'start',
    verticalAnchor: 'end', // default SVG behavior
    truncateText: '&hellip;',
  };

  state: TextState = {
    wordsByLines: [],
  };

  private wordsWithWidth: WordWithWidth[] = [];

  private spaceWidth: number = 0;

  componentDidMount() {
    this.updateWordsByLines(this.props, true);
  }

  componentDidUpdate(prevProps: TextProps, prevState: TextState) {
    // We calculated a new state, break out of the loop.
    if (prevState.wordsByLines !== this.state.wordsByLines) {
      return;
    }

    const needCalculate =
      prevProps.children !== this.props.children || prevProps.style !== this.props.style;
    this.updateWordsByLines(this.props, needCalculate);
  }

  updateWordsByLines(props: TextProps, needCalculate: boolean = false) {
    // Only perform calculations if using features that require them (multiline, scaleToFit)
    if (props.width || props.scaleToFit) {
      if (needCalculate) {
        const words: string[] = props.children
          ? props.children.toString().split(/(?:(?!\u00A0+)\s+)/)
          : [];

        this.wordsWithWidth = words.map(word => ({
          word,
          width: getStringWidth(word, props.style) || 0,
        }));
        this.spaceWidth = getStringWidth('\u00A0', props.style) || 0;
      }

      const wordsByLines = this.calculateWordsByLines(
        this.wordsWithWidth,
        this.spaceWidth,
        props.width,
      );
      this.setState({ wordsByLines });
    } else {
      this.updateWordsWithoutCalculate(props);
    }
  }

  updateWordsWithoutCalculate(props: TextProps) {
    const words = props.children ? props.children.toString().split(/(?:(?!\u00A0+)\s+)/) : [];
    this.setState({ wordsByLines: [{ words }] });
  }

  calculateWordsByLines(wordsWithWidth: WordWithWidth[], spaceWidth: number, lineWidth?: number) {
    const { lineClamp, scaleToFit, style, truncateText } = this.props;
    const truncateTextWidth = getStringWidth(truncateText, style);
    return wordsWithWidth.reduce((result: WordsWithWidth[], { word, width }) => {
      const currentLine = result[result.length - 1];
      const spaceAfterWord =
        lineClamp && result.length + 1 > lineClamp ? spaceWidth + truncateTextWidth : spaceWidth;

      // Skip if the result exceeds the lineClamp limit
      if (lineClamp && result.length > lineClamp) {
        return result;
      }

      if (
        currentLine &&
        (lineWidth == null ||
          scaleToFit ||
          (currentLine.width || 0) + width + spaceAfterWord < lineWidth)
      ) {
        // Word can be added to an existing line
        currentLine.words.push(word);
        currentLine.width = currentLine.width || 0;
        currentLine.width += width + spaceWidth;
      } else {
        // Add first word to a new line
        let newLine = { words: [word], width };
        // But if it would exceed the line clamp limit, truncate and add to existing line
        if (lineClamp && result.length + 1 > lineClamp) {
          const truncatedWord = truncateWord(
            word,
            lineWidth - currentLine.width,
            truncateText,
            style,
          );
          currentLine.words.push(truncatedWord.word);
          currentLine.width += truncatedWord.width;
          newLine = { words: [], width: 0 };
        }
        result.push(newLine);
      }

      return result;
    }, []);
  }

  render() {
    const {
      dx,
      dy,
      textAnchor,
      verticalAnchor,
      scaleToFit,
      angle,
      lineHeight,
      capHeight,
      innerRef,
      width,
      ...textProps
    } = this.props;

    const { wordsByLines } = this.state;
    const { x, y } = textProps;

    let startDy: string | undefined;
    if (verticalAnchor === 'start') {
      startDy = reduceCSSCalc(`calc(${capHeight})`);
    } else if (verticalAnchor === 'middle') {
      startDy = reduceCSSCalc(
        `calc(${(wordsByLines.length - 1) / 2} * -${lineHeight} + (${capHeight} / 2))`,
      );
    } else {
      startDy = reduceCSSCalc(`calc(${wordsByLines.length - 1} * -${lineHeight})`);
    }

    let transform: string | undefined;
    const transforms = [];
    if (isNumber(x) && isNumber(y) && isNumber(width) && scaleToFit && wordsByLines.length > 0) {
      const lineWidth = wordsByLines[0].width || 1;
      const sx = width / lineWidth;
      const sy = sx;
      const originX = x - sx * x;
      const originY = y - sy * y;
      transforms.push(`matrix(${sx}, 0, 0, ${sy}, ${originX}, ${originY})`);
    }
    if (angle) {
      transforms.push(`rotate(${angle}, ${x}, ${y})`);
    }
    if (transforms.length > 0) {
      transform = transforms.join(' ');
    }

    return (
      <svg ref={innerRef} x={dx} y={dy} fontSize={textProps.fontSize} style={SVG_STYLE}>
        <text transform={transform} {...textProps} textAnchor={textAnchor}>
          {wordsByLines.map((line, index) => (
            <tspan key={index} x={x} dy={index === 0 ? startDy : lineHeight}>
              {line.words.join(' ')}
            </tspan>
          ))}
        </text>
      </svg>
    );
  }
}

export default Text;
