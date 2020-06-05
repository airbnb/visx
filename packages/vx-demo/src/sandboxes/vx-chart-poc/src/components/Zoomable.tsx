import React, { useContext } from 'react';
import { Zoom } from '@vx/zoom';
import ChartContext from '../context/ChartContext';

type ZoomableProps = {
  children: React.ReactNode;
};

export default function Zoomable({ children }: ZoomableProps) {
  const { xScale, yScale, updateXScale, updateYScale } = useContext(ChartContext) || {};

  return <Zoom>{children}</Zoom>;
}
