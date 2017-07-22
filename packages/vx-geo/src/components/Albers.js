import React from 'react';
import Projection from './Projection';

export default function Albers({ ...restProps }) {
  return <Projection projection="albers" {...restProps} />;
}
