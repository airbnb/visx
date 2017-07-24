import React from 'react';
import Projection from './Projection';

export default function Albers(props) {
  return <Projection projection="albers" {...props} />;
}
