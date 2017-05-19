import React from 'react';
import Show from '../components/show';
import Gradients from '../components/tiles/gradients';

export default () => {
  return (
    <Show component={Gradients} title="Gradients" shadow margin={{
      bottom: 0,
    }}>
{`import React from 'react';
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
}) => {
  const w = width / 4;
  const h = (height - 80) / 2;
  return (
    <svg width={width} height={height}>
      <DarkgreenGreen id="DarkgreenGreen" />
      <LightgreenGreen id="LightgreenGreen" />
      <OrangeRed id="OrangeRed" />
      <PinkBlue id="PinkBlue" />
      <PinkRed id="PinkRed" />
      <PurpleOrange id="PurpleOrange" />
      <PurpleRed id="PurpleRed" />
      <PurpleTeal id="PurpleTeal" />
      <SteelPurple id="SteelPurple" />
      <TealBlue id="TealBlue" />
      <Bar
        x={0}
        y={0}
        width={w}
        height={h}
        fill={\`url(#LightgreenGreen)\`}
        stroke='#ffffff'
        strokeWidth={8}
        rx={14}
      />
      <Bar
        x={w}
        y={0}
        width={w}
        height={h}
        fill={\`url(#OrangeRed)\`}
        rx={14}
        stroke='#ffffff'
        strokeWidth={8}
      />
      <Bar
        x={w * 2}
        y={0}
        width={w}
        height={h}
        fill={\`url(#PinkBlue)\`}
        rx={14}
        stroke='#ffffff'
        strokeWidth={8}
      />
      <Bar
        x={w * 3}
        y={0}
        width={w}
        height={h}
        fill={\`url(#DarkgreenGreen)\`}
        rx={14}
        stroke='#ffffff'
        strokeWidth={8}
      />
      <Bar
        x={0}
        y={h}
        width={w}
        height={h}
        fill={\`url(#PinkRed)\`}
        rx={14}
        stroke='#ffffff'
        strokeWidth={8}
      />
      <Bar
        x={w}
        y={h}
        width={w}
        height={h}
        fill={\`url(#TealBlue)\`}
        rx={14}
        stroke='#ffffff'
        strokeWidth={8}
      />
      <Bar
        x={w * 2}
        y={h}
        width={w}
        height={h}
        fill={\`url(#PurpleOrange)\`}
        rx={14}
        stroke='#ffffff'
        strokeWidth={8}
      />
      <Bar
        x={w * 3}
        y={h}
        width={w}
        height={h}
        fill={\`url(#PurpleTeal)\`}
        rx={14}
        stroke='#ffffff'
        strokeWidth={8}
      />
    </svg>
  );
}`}
    </Show>
  );
}
