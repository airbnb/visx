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
  GradientPurpleTeal,
  GradientSteelPurple,
  GradientTealBlue
} from '@vx/gradient';

export default ({
  width,
  height,
  margin = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 80
  }
}) => {
  const w = width / 4;
  const h = (height - margin.bottom) / 2;
  return (
    <svg width={width} height={height}>
      <GradientDarkgreenGreen id="DarkgreenGreen" />
      <GradientLightgreenGreen id="LightgreenGreen" />
      <GradientOrangeRed id="OrangeRed" />
      <GradientPinkBlue id="PinkBlue" />
      <GradientPinkRed id="PinkRed" />
      <GradientPurpleOrange id="PurpleOrange" />
      <GradientPurpleRed id="PurpleRed" />
      <GradientPurpleTeal id="PurpleTeal" />
      <GradientSteelPurple id="SteelPurple" />
      <GradientTealBlue id="TealBlue" />
      <Bar
        x={0}
        y={0}
        width={w}
        height={h}
        fill={`url(#LightgreenGreen)`}
        stroke='#ffffff'
        strokeWidth={8}
        rx={14}
      />
      <Bar
        x={w}
        y={0}
        width={w}
        height={h}
        fill={`url(#OrangeRed)`}
        rx={14}
        stroke='#ffffff'
        strokeWidth={8}
      />
      <Bar
        x={w * 2}
        y={0}
        width={w}
        height={h}
        fill={`url(#PinkBlue)`}
        rx={14}
        stroke='#ffffff'
        strokeWidth={8}
      />
      <Bar
        x={w * 3}
        y={0}
        width={w}
        height={h}
        fill={`url(#DarkgreenGreen)`}
        rx={14}
        stroke='#ffffff'
        strokeWidth={8}
      />
      <Bar
        x={0}
        y={h}
        width={w}
        height={h}
        fill={`url(#PinkRed)`}
        rx={14}
        stroke='#ffffff'
        strokeWidth={8}
      />
      <Bar
        x={w}
        y={h}
        width={w}
        height={h}
        fill={`url(#TealBlue)`}
        rx={14}
        stroke='#ffffff'
        strokeWidth={8}
      />
      <Bar
        x={w * 2}
        y={h}
        width={w}
        height={h}
        fill={`url(#PurpleOrange)`}
        rx={14}
        stroke='#ffffff'
        strokeWidth={8}
      />
      <Bar
        x={w * 3}
        y={h}
        width={w}
        height={h}
        fill={`url(#PurpleTeal)`}
        rx={14}
        stroke='#ffffff'
        strokeWidth={8}
      />
    </svg>
  );
}
