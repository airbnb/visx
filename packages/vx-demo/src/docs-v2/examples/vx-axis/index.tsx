import React from 'react';
import ReactDOM from 'react-dom';
import ParentSize from '@vx/responsive/lib/components/ParentSize';

import AxisExample from './AxisExample';

ReactDOM.render(
  <ParentSize>{({ width, height }) => <AxisExample width={width} height={height} />}</ParentSize>,
  document.getElementById('root'),
);
