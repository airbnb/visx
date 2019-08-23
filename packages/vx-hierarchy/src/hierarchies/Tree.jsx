import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Group } from '@vx/group';
import { tree as d3tree } from 'd3-hierarchy';
import DefaultLink from '../HierarchyDefaultLink';
import DefaultNode from '../HierarchyDefaultNode';

Tree.propTypes = {
  root: PropTypes.object.isRequired,
  children: PropTypes.func,
  top: PropTypes.number,
  left: PropTypes.number,
  className: PropTypes.string,
  size: PropTypes.arrayOf(PropTypes.number),
  nodeSize: PropTypes.arrayOf(PropTypes.number),
  separation: PropTypes.func,
  linkComponent: PropTypes.any,
  nodeComponent: PropTypes.any,
};

export default function Tree({
  top,
  left,
  className,
  root,
  size,
  nodeSize,
  separation,
  children,
  linkComponent = DefaultLink,
  nodeComponent = DefaultNode,
}) {
  const tree = d3tree();
  if (size) tree.size(size);
  if (nodeSize) tree.nodeSize(nodeSize);
  if (separation) tree.separation(separation);

  const data = tree(root);

  if (children) return children(data);

  return (
    <Group top={top} left={left} className={cx('vx-tree', className)}>
      {linkComponent &&
        data.links().map((link, i) => {
          return (
            <Group key={`tree-link-${i}`}>{React.createElement(linkComponent, { link })}</Group>
          );
        })}
      {nodeComponent &&
        data.descendants().map((node, i) => {
          return (
            <Group key={`tree-node-${i}`}>{React.createElement(nodeComponent, { node })}</Group>
          );
        })}
    </Group>
  );
}
