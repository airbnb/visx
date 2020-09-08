import React from 'react';
import Cross from './Cross';
import { MarkerComponentProps } from './Marker';

export default function MarkerX(props: MarkerComponentProps) {
  return <Cross orient={45} {...props} />;
}
