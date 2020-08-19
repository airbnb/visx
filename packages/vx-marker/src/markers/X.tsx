import React from 'react';
import Cross from './Cross';
import { MarkerProps } from './Marker';

export interface MarkerXProps {
  id: string;
  size?: number;
  strokeWidth?: number;
}

export type Props = MarkerXProps & Omit<MarkerProps, 'children'>;

export default function MarkerX(props: Props) {
  return <Cross orient={45} {...props} />;
}
