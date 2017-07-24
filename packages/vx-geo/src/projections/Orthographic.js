import React from 'react';
import Projection from './Projection';

export default function Orthographic(props) {
  return <Projection projection="orthographic" {...props} />;
}
