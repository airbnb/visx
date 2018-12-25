import PropTypes from 'prop-types';
import React, { Component } from 'react';
import reduceCSSCalc from 'reduce-css-calc';
import getStringWidth from './util/getStringWidth';

class Text extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wordsByLines: [],
      firstRender: true
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps === this.props) {
      return;
    }

    const needCalculate =
      this.props.children !== prevProps.children || this.props.style !== prevProps.style;
    const wordsByLines = this.updateWordsByLines(prevProps, needCalculate);

    this.setState({ wordsByLines, firstRender: false });
  }

  updateWordsByLines(props, needCalculate) {
    // Only perform calculations if using features that require them (multiline, scaleToFit)
    if (props.width || props.scaleToFit) {
      if (needCalculate) {
        const words = props.children ? props.children.toString().split(/\s+/) : [];

        this.wordsWithComputedWidth = words.map(word => ({
          word,
          width: getStringWidth(word, props.style)
        }));

        this.spaceWidth = getStringWidth('\u00A0', props.style);
      }

      const wordsByLines = this.calculateWordsByLines(
        this.wordsWithComputedWidth,
        this.spaceWidth,
        props.width
      );

      return wordsByLines;
    }
      return this.updateWordsWithoutCalculate(props);
  }

  updateWordsWithoutCalculate(props) {
    const words = props.children ? props.children.toString().split(/\s+/) : [];

    return { wordsByLines: [{ words }] };
  }

  calculateWordsByLines(wordsWithComputedWidth, spaceWidth, lineWidth) {
    const { scaleToFit } = this.props;
    return wordsWithComputedWidth.reduce((result, { word, width }) => {
      const currentLine = result[result.length - 1];

      if (
        currentLine &&
        (lineWidth == null || scaleToFit || currentLine.width + width + spaceWidth < lineWidth)
      ) {
        // Word can be added to an existing line
        currentLine.words.push(word);
        currentLine.width += width + spaceWidth;
      } else {
        // Add first word to line or word is too long to scaleToFit on existing line
        const newLine = { words: [word], width };
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
      ...textProps
    } = this.props;
    const wordsByLines = this.state.firstRender
      ? this.updateWordsByLines(this.props, true)
      : this.state.wordsByLines;

    const { x, y } = textProps;

    let startDy;
    switch (verticalAnchor) {
      case 'start':
        startDy = reduceCSSCalc(`calc(${capHeight})`);
        break;
      case 'middle':
        startDy = reduceCSSCalc(
          `calc(${(wordsByLines.length - 1) / 2} * -${lineHeight} + (${capHeight} / 2))`
        );
        break;
      default:
        startDy = reduceCSSCalc(`calc(${wordsByLines.length - 1} * -${lineHeight})`);
        break;
    }

    const transforms = [];
    if (scaleToFit && wordsByLines.length) {
      const lineWidth = wordsByLines[0].width;
      const sx = this.props.width / lineWidth;
      const sy = sx;
      const originX = x - sx * x;
      const originY = y - sy * y;
      transforms.push(`matrix(${sx}, 0, 0, ${sy}, ${originX}, ${originY})`);
    }
    if (angle) {
      transforms.push(`rotate(${angle}, ${x}, ${y})`);
    }
    if (transforms.length) {
      textProps.transform = transforms.join(' ');
    }

    return (
      <svg
        ref={innerRef}
        x={dx}
        y={dy}
        fontSize={textProps.fontSize}
        style={{ overflow: 'visible' }}
      >
        <text {...textProps} textAnchor={textAnchor}>
          {wordsByLines.map((line, index) => (
            <tspan x={x} dy={index === 0 ? startDy : lineHeight} key={index}>
              {line.words.join(' ')}
            </tspan>
          ))}
        </text>
      </svg>
    );
  }
}

Text.defaultProps = {
  x: 0,
  y: 0,
  dx: 0,
  dy: 0,
  lineHeight: '1em',
  capHeight: '0.71em', // Magic number from d3
  scaleToFit: false,
  textAnchor: 'start',
  verticalAnchor: 'end' // default SVG behavior
};

Text.propTypes = {
  scaleToFit: PropTypes.bool,
  angle: PropTypes.number,
  textAnchor: PropTypes.oneOf(['start', 'middle', 'end', 'inherit']),
  verticalAnchor: PropTypes.oneOf(['start', 'middle', 'end']),
  style: PropTypes.object,
  innerRef: PropTypes.func,
  x: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  y: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  dx: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  dy: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  lineHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  capHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

export default Text;
