import React, { useContext, useEffect } from 'react';
import ParentSize from '@vx/responsive/lib/components/ParentSize';

import DataContext from '../context/DataContext';
import { Margin } from '../types';

const DEFAULT_MARGIN = { top: 50, right: 50, bottom: 50, left: 50 };

type Props = {
  events?: boolean;
  width?: number;
  height?: number;
  margin?: Margin;
  children: React.ReactNode;
};

export default function XYChart(props: Props) {
  const { children, width, height, margin = DEFAULT_MARGIN } = props;
  const { setDimensions } = useContext(DataContext);

  // update dimensions in context
  useEffect(() => {
    if (setDimensions && width != null && height != null && width > 0 && height > 0) {
      setDimensions({ width, height, margin });
    }
  }, [setDimensions, width, height, margin]);

  // if width and height aren't both provided, wrap in auto-sizer + preserve passed dims
  if (width == null || height == null) {
    return <ParentSize>{dims => <XYChart {...dims} {...props} />}</ParentSize>;
  }

  return width > 0 && height > 0 ? (
    <svg width={width} height={height}>
      {children}
    </svg>
  ) : null;
}
