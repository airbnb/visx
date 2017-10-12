import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Group } from '@vx/group';
import { partition as d3partition } from 'd3-hierarchy';
import DefaultNode from '../HierarchyDefaultNode';

Partition.propTypes = {
  data: PropTypes.object.isRequired,
  children: PropTypes.func
};

export default function Partition({
  top,
  left,
  className,
  data,
  size,
  round,
  padding,
  children,
  nodeComponent = DefaultNode,
  ...restProps
}) {
  const partition = d3partition();
  if (size) partition.size(size);
  if (round) partition.round(round);
  if (padding) partition.padding(padding);

  const root = partition(data);

  if (!!children) {
    return (
      <Group top={top} left={left} className={cx('vx-pack', className)}>
        {children({ root })}
      </Group>
    );
  }

  return (
    <Group top={top} left={left} className={cx('vx-pack', className)}>
      {nodeComponent &&
        root.descendants().map((node, i) => {
          return (
            <Group key={`pack-node-${i}`}>
              {React.createElement(nodeComponent, { node })}
            </Group>
          );
        })}
    </Group>
  );
}
