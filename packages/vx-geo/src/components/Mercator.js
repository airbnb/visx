import React from 'react';
import Projection from './Projection';

export default function Mercator({ ...restProps }) {
  return <Projection projection="mercator" {...restProps} />;
}
