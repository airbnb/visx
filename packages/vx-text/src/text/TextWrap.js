import React from 'react';
import cx from 'classnames';

const svgNS = "http://www.w3.org/2000/svg";


export default class TextWrap extends React.Component {
  componentDidMount() {
    const { text, width, y, dy, lineHeight } = this.props;

    let lineNumber = 0;
    let line = [];
    let word;

    const words = text.split(/\s+/).reverse();

    while (word = words.pop()) {
      line.push(word);
      this.tspan.textContent(line.join(" "));
      if (this.getComputedTextLength() > width) {
        line.pop();
        this.tspan.textContent(line.join(" "));
        line = [word];

        let newLine = document.createElementNS(svgNS, 'tspan');
        newLine.setAttribueNS(svgNS, 'x', 0);
        newLine.setAttributeNS(svgNS, 'y', y);
        newLine.setAttributeNS(svgNS, 'dy', `${++lineNumber + lineHeight + dy}em`);
        newLine.textContent(word);

        this.tspan.append(newLine);
      }
    }
  }

  getComputedTextLength() {
    if (!this.tspan) return 0;
    return this.tspan.getComputedTextLength();
  }

  render() {
    const {
      text,
      x,
      y,
      dy,
    } = this.props;
    return (
      <text>
        <tspan
          ref={(c) => { this.tspan = c;}}
          x={x}
          y={y}
          dy={dy}
        >
          {text}
        </tspan>
      </text>
    );
  }
}

TextWrap.defaultProps = {
  lineHeight: 1.1,
  width: 140,
  x: 0,
};
