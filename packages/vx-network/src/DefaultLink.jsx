import React from 'react';
import PropTypes from 'prop-types';

DefaultLink.propTypes = {
  link: PropTypes.object,
};

export default function DefaultLink({ link }) {
  return (
    <line
      x1={link.source.x}
      y1={link.source.y}
      x2={link.target.x}
      y2={link.target.y}
      strokeWidth={2}
      stroke="#999"
      strokeOpacity={0.6}
    />
  );
}
