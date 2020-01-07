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
import { ShowProvidedProps } from '../../types';

export default ({
  width,
  height,
  margin = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 80,
  },
}: ShowProvidedProps) => {
  const barWidth = Math.max(width / 4, 0);
  const barHeight = Math.max((height - margin.bottom) / 2, 0);

  return (
    <svg width={width} height={height}>
      <GradientDarkgreenGreen id="DarkgreenGreen" />
      <GradientLightgreenGreen id="LightgreenGreen" />
      <GradientOrangeRed id="OrangeRed" />
      <GradientPinkBlue id="PinkBlue" />
      <GradientPinkRed id="PinkRed" vertical={false} />
      <GradientPurpleOrange id="PurpleOrange" vertical={false} />
      <GradientPurpleRed id="PurpleRed" vertical={false} />
      <RadialGradient from="#55bdd5" to="#4f3681" id="Radial" r="80%" />
      <GradientSteelPurple id="SteelPurple" vertical={false} />
      <GradientTealBlue id="TealBlue" vertical={false} />
      <Bar
        x={0}
        y={0}
        width={barWidth}
        height={barHeight}
        fill="url(#LightgreenGreen)"
        stroke="#ffffff"
        strokeWidth={8}
        rx={14}
      />
      <Bar
        x={barWidth}
        y={0}
        width={barWidth}
        height={barHeight}
        fill="url(#OrangeRed)"
        rx={14}
        stroke="#ffffff"
        strokeWidth={8}
      />
      <Bar
        x={barWidth * 2}
        y={0}
        width={barWidth}
        height={barHeight}
        fill="url(#PinkBlue)"
        rx={14}
        stroke="#ffffff"
        strokeWidth={8}
      />
      <Bar
        x={barWidth * 3}
        y={0}
        width={barWidth}
        height={barHeight}
        fill="url(#DarkgreenGreen)"
        rx={14}
        stroke="#ffffff"
        strokeWidth={8}
      />
      <Bar
        x={0}
        y={barHeight}
        width={barWidth}
        height={barHeight}
        fill="url(#PinkRed)"
        rx={14}
        stroke="#ffffff"
        strokeWidth={8}
      />
      <Bar
        x={barWidth}
        y={barHeight}
        width={barWidth}
        height={barHeight}
        fill="url(#TealBlue)"
        rx={14}
        stroke="#ffffff"
        strokeWidth={8}
      />
      <Bar
        x={barWidth * 2}
        y={barHeight}
        width={barWidth}
        height={barHeight}
        fill="url(#PurpleOrange)"
        rx={14}
        stroke="#ffffff"
        strokeWidth={8}
      />
      <Bar
        x={barWidth * 3}
        y={barHeight}
        width={barWidth}
        height={barHeight}
        fill="url(#Radial)"
        rx={14}
        stroke="#ffffff"
        strokeWidth={8}
      />
    </svg>
  );
};
