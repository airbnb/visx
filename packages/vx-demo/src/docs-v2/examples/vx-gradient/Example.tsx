import React from 'react';
import { Bar } from '@vx/shape';
import {
  GradientDarkgreenGreen,
  GradientLightgreenGreen,
  GradientOrangeRed,
  GradientPinkBlue,
  GradientPinkRed,
  GradientPurpleOrange,
  GradientPurpleRed,
  GradientSteelPurple,
  GradientTealBlue,
  RadialGradient,
} from '@vx/gradient';

const defaultMargin = {
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
};

const numColumns = 5;

const gradientIds = [
  [...new Array(numColumns)].map((_, idx) => `vx-gradient-demo-row-0-column-${idx}`),
  [...new Array(numColumns)].map((_, idx) => `vx-gradient-demo-row-1-column-${idx}`),
];

type Props = {
  width: number;
  height: number;
  margin?: typeof defaultMargin;
};

export default function Example({ width, height, margin = defaultMargin }: Props) {
  const columnWidth = Math.max(width / gradientIds[0].length, 0);
  const rowHeight = Math.max((height - margin.bottom) / gradientIds.length, 0);

  return (
    <svg width={width} height={height}>
      <GradientDarkgreenGreen id={gradientIds[0][0]} />
      <GradientLightgreenGreen id={gradientIds[0][1]} />
      <GradientOrangeRed id={gradientIds[0][2]} />
      <GradientPinkBlue id={gradientIds[0][3]} />
      <GradientPinkRed id={gradientIds[0][4]} vertical={false} />
      <GradientPurpleOrange id={gradientIds[1][0]} vertical={false} />
      <GradientPurpleRed id={gradientIds[1][1]} vertical={false} />
      <RadialGradient id={gradientIds[1][2]} from="#55bdd5" to="#4f3681" r="80%" />
      <GradientSteelPurple id={gradientIds[1][3]} vertical={false} />
      <GradientTealBlue id={gradientIds[1][4]} vertical={false} />
      {gradientIds.map((rowIds, rowIndex) =>
        rowIds.map((id, columnIndex) => (
          <Bar
            key={id}
            fill={`url(#${id})`}
            x={columnIndex * columnWidth}
            y={rowIndex * rowHeight}
            width={columnWidth}
            height={rowHeight}
            stroke="#ffffff"
            strokeWidth={8}
            rx={14}
          />
        )),
      )}
    </svg>
  );
}
