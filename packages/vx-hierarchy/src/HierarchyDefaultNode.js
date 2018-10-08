import React from 'react';
import PropTypes from 'prop-types';

HierarchyDefaultNode.propTypes = {
  node: PropTypes.object
};

export default function HierarchyDefaultNode({ node }) {
  return <circle cx={node.x} cy={node.y} r={15} fill="#21D4FD" />;
}
