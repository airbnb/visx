import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Group } from '@vx/group';
import { pack as d3pack } from 'd3-hierarchy';
import DefaultNode from '../HierarchyDefaultNode';

Pack.propTypes = {
  data: PropTypes.object.isRequired,
  children: PropTypes.func
};

export default function Pack({
  top,
  left,
  className,
  data,
  radius,
  size,
  padding,
  children,
  nodeComponent = DefaultNode,
  ...restProps
}) {
  const pack = d3pack();
  if (size) pack.size(size);
  if (radius) pack.radius(radius);
  if (padding) pack.padding(padding);

  const root = pack(data);

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
