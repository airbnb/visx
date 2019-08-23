import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Group } from '@vx/group';
import { partition as d3partition } from 'd3-hierarchy';
import DefaultNode from '../HierarchyDefaultNode';

Partition.propTypes = {
  root: PropTypes.object.isRequired,
  children: PropTypes.func,
  top: PropTypes.number,
  left: PropTypes.number,
  className: PropTypes.string,
  size: PropTypes.arrayOf(PropTypes.number),
  round: PropTypes.bool,
  padding: PropTypes.number,
  nodeComponent: PropTypes.any,
};

export default function Partition({
  top,
  left,
  className,
  root,
  size,
  round,
  padding,
  children,
  nodeComponent = DefaultNode,
}) {
  const partition = d3partition();
  if (size) partition.size(size);
  if (round) partition.round(round);
  if (padding) partition.padding(padding);

  const data = partition(root);

  if (children) return children(data);

  return (
    <Group top={top} left={left} className={cx('vx-partition', className)}>
      {nodeComponent &&
        data.descendants().map((node, i) => {
          return (
            <Group key={`partition-node-${i}`}>
              {React.createElement(nodeComponent, { node })}
            </Group>
          );
        })}
    </Group>
  );
}
