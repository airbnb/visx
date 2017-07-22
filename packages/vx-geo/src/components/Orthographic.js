import React from 'react';
import Projection from './Projection';

export default function Orthographic({ ...restProps }) {
  return <Projection projection="orthographic" {...restProps} />;
}
