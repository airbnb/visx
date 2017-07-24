import React from 'react';
import Projection from './Projection';

export default function Mercator(props) {
  return <Projection projection="mercator" {...props} />;
}
