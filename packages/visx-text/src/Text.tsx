import React from 'react';
import useText from './hooks/useText';
import { TextProps } from './types';

export { TextProps } from './types';

const SVG_STYLE = { overflow: 'visible' };

export default function Text(props: TextProps) {
  const {
    dx = 0,
    dy = 0,
    textAnchor = 'start',
    innerRef,
    verticalAnchor,
    angle,
    lineHeight = '1em',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    scaleToFit = false,
    capHeight,
    width,
    ...textProps
  } = props;

  const { x = 0, fontSize } = textProps;
  const { wordsByLines, startDy, transform } = useText(props);

  return (
    <svg ref={innerRef} x={dx} y={dy} fontSize={fontSize} style={SVG_STYLE}>
      {wordsByLines.length > 0 ? (
        <text transform={transform} {...textProps} textAnchor={textAnchor}>
          {wordsByLines.map((line, index) => (
            <tspan key={index} x={x} dy={index === 0 ? startDy : lineHeight}>
              {line.words.join(' ')}
            </tspan>
          ))}
        </text>
      ) : null}
    </svg>
  );
}
