import React from 'react';
import cx from 'classnames';

const svgNS = "http://www.w3.org/2000/svg";

/**
 * TODO: this is horrible and doesn't work. figure this out.
 */


export default class TextWrap extends React.Component {
  componentDidMount() {
    const { text, width, y = 1, x = 1, dy = 0, lineHeight } = this.props;

    let lineNumber = 0;
    let line = [];
    let word;
    let tspan = this.tspan;

    const words = text.split(/\s+/).reverse();

    while (word = words.pop()) {
      line.push(word);
      let newText = line.join(" ");
      tspan.textContent = newText;

      if (tspan.getComputedTextLength() > width) {
        line.pop();
        newText = line.join(" ");
        tspan.textContent = newText;

        line = [word];

        let newLine = document.createElementNS(svgNS, 'tspan');
        newLine.setAttributeNS(svgNS, 'x', x);
        newLine.setAttributeNS(svgNS, 'y', y);
        newLine.setAttributeNS(svgNS, 'dy', `${++lineNumber * lineHeight}em`);
        newLine.textContent = ` ${word}`;

        this.tspan.parentNode.append(newLine);
        tspan = newLine;
      }
    }
  }

  render() {
    const {
      text,
      x,
      y,
      dx,
      dy,
      lineHeight,
      width,
      className,
    } = this.props;
    return (
      <text
        className={cx('vx-text-wrap', className)}
        x={x}
        y={y}
        dx={dx}
        dy={dy}
      >
        <tspan
          ref={(c) => { this.tspan = c;}}
          x={x}
          y={y}
          dy={dy}
        />
      </text>
    );
  }
}

TextWrap.defaultProps = {
  lineHeight: 1.1,
  width: 140,
  x: 0,
  y: 0,
  dx: 0,
  dy: 0,
};
