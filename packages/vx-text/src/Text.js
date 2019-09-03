import PropTypes from 'prop-types';
import React, { Component } from 'react';
import reduceCSSCalc from 'reduce-css-calc';
import getStringWidth from './util/getStringWidth';

class Text extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wordsByLines: [],
      previousStyle: props.style,
      previousChildren: props.children,
      spaceWidth: undefined,
      wordsWithComputedWidth: undefined
    };
  }

  static getDerivedStateFromProps(props, state) {
    const words = props.children ? props.children.toString().split(/(?:(?!\u00A0+)\s+)/) : [];

    // Only perform calculations if using features that require them (multiline, scaleToFit)
    if (props.width || props.scaleToFit) {
      const needCalculate =
        !state.spaceWidth ||
        !state.wordsWithComputedWidth ||
        state.previousChildren !== props.children ||
        state.previousStyle !== props.style;

      if (needCalculate) {
        state.wordsWithComputedWidth = words.map(word => ({
          word,
          width: getStringWidth(word, props.style)
        }));

        state.spaceWidth = getStringWidth('\u00A0', props.style);
      }
      state.wordsByLines = Text.calculateWordsByLines(props, state);
    } else {
      state.wordsByLines = [{ words }];
    }

    state.previousChildren = props.children;
    state.previousStyle = props.style;

    return state;
  }

  static calculateWordsByLines(props, state) {
    return state.wordsWithComputedWidth.reduce((result, { word, width }) => {
      const currentLine = result[result.length - 1];

      if (
        currentLine &&
        (props.width == null ||
          props.scaleToFit ||
          currentLine.width + width + state.spaceWidth < props.width)
      ) {
        // Word can be added to an existing line
        currentLine.words.push(word);
        currentLine.width += width + state.spaceWidth;
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
    const { wordsByLines } = this.state;

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
  width: PropTypes.number,
  children: PropTypes.node,
  innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  x: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  y: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  dx: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  dy: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  lineHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  capHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

export default Text;
