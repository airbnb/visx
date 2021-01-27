import React from 'react';
import { render } from 'react-dom';
import ParentSize from '@visx/responsive/lib/components/ParentSize';

import Example from './Example';
import './sandbox-styles.css';

const prefersReducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
const prefersReducedMotion = !prefersReducedMotionQuery || !!prefersReducedMotionQuery.matches;

render(
  <ParentSize>
    {({ width, height }) => (
      <Example width={width} height={height} prefersReducedMotion={prefersReducedMotion} />
    )}
  </ParentSize>,
  document.getElementById('root'),
);
