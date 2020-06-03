import React, { useContext, useEffect } from 'react';
import ParentSize from '@vx/responsive/lib/components/ParentSize';
import ChartContext from '../context/ChartContext';
import { Margin } from '../types';

type Props = {
  width?: number;
  height?: number;
  margin?: Margin;
  children: React.ReactNode;
};

export default function XYChart(props: Props) {
  const { children, width, height, margin } = props;
  const { setChartDimensions } = useContext(ChartContext);

  // update dimensions in context
  useEffect(() => {
    if (width != null && height != null && width > 0 && height > 0) {
      setChartDimensions({ width, height, margin });
    }
  }, [setChartDimensions, width, height, margin]);

  // if width and height aren't both provided, wrap in auto-sizer
  if (width == null || height == null) {
    return <ParentSize>{dims => <XYChart {...dims} {...props} />}</ParentSize>;
  }

  return (
    <svg width={width} height={height}>
      {children}
    </svg>
  );
}
