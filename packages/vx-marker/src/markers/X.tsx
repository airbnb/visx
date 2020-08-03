import React from 'react';
import Cross from './Cross';
import { MarkerProps } from './Marker';

export default function MarkerX(props: MarkerProps) {
  return <Cross orient={45} {...props} />;
}
