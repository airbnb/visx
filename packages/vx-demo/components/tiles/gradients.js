import React from 'react';
import Shape from '@vx/shape';
import Gradient from '@vx/gradient';

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
      <Gradient.DarkgreenGreen id="DarkgreenGreen" />
      <Gradient.LightgreenGreen id="LightgreenGreen" />
      <Gradient.OrangeRed id="OrangeRed" />
      <Gradient.PinkBlue id="PinkBlue" />
      <Gradient.PinkRed id="PinkRed" />
      <Gradient.PurpleOrange id="PurpleOrange" />
      <Gradient.PurpleRed id="PurpleRed" />
      <Gradient.PurpleTeal id="PurpleTeal" />
      <Gradient.SteelPurple id="SteelPurple" />
      <Gradient.TealBlue id="TealBlue" />
      <rect
        x={0}
        y={0}
        width={w}
        height={h}
        fill={`url(#LightgreenGreen)`}
        stroke='#ffffff'
        strokeWidth={8}
        rx={14}
      />
      <rect
        x={w}
        y={0}
        width={w}
        height={h}
        fill={`url(#OrangeRed)`}
        rx={14}
        stroke='#ffffff'
        strokeWidth={8}
      />
      <rect
        x={w * 2}
        y={0}
        width={w}
        height={h}
        fill={`url(#PinkBlue)`}
        rx={14}
        stroke='#ffffff'
        strokeWidth={8}
      />
      <rect
        x={w * 3}
        y={0}
        width={w}
        height={h}
        fill={`url(#DarkgreenGreen)`}
        rx={14}
        stroke='#ffffff'
        strokeWidth={8}
      />
      <rect
        x={0}
        y={h}
        width={w}
        height={h}
        fill={`url(#PinkRed)`}
        rx={14}
        stroke='#ffffff'
        strokeWidth={8}
      />
      <rect
        x={w}
        y={h}
        width={w}
        height={h}
        fill={`url(#TealBlue)`}
        rx={14}
        stroke='#ffffff'
        strokeWidth={8}
      />
      <rect
        x={w * 2}
        y={h}
        width={w}
        height={h}
        fill={`url(#PurpleOrange)`}
        rx={14}
        stroke='#ffffff'
        strokeWidth={8}
      />
      <rect
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
