import React from 'react';
import { useText } from './hooks/useText';
import { TextProps } from './types';
export { TextProps } from './types';

const SVG_STYLE = { overflow: 'visible' };

function isValidXOrY(xOrY: string | number | undefined) {
  return (
    // number that is not NaN or Infinity
    (typeof xOrY === 'number' && Number.isFinite(xOrY)) ||
    // for percentage
    typeof xOrY === 'string'
  );
}

export default function Text(props: TextProps) {
  const {
    dx = 0,
    dy = 0,
    textAnchor = 'start',
    innerRef,
    verticalAnchor,
    angle,
    lineHeight = '1em',
    scaleToFit = false,
    capHeight,
    width,
    ...textProps
  } = props;

  const { x = 0, y = 0, fontSize } = textProps;
  const [wordsByLines, startDy, transform] = useText(props);

  // Cannot render <text> if x or y is invalid
  if (!isValidXOrY(x) || !isValidXOrY(y)) {
    return <svg ref={innerRef} x={dx} y={dy} fontSize={fontSize} style={SVG_STYLE} />;
  }

  return (
    <svg ref={innerRef} x={dx} y={dy} fontSize={fontSize} style={SVG_STYLE}>
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