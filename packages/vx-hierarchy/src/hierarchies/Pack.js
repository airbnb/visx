import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Group } from '@vx/group';
import { pack as d3pack } from 'd3-hierarchy';
import DefaultNode from '../HierarchyDefaultNode';

Pack.propTypes = {
  root: PropTypes.object.isRequired,
  children: PropTypes.func,
  top: PropTypes.number,
  left: PropTypes.number,
  className: PropTypes.string,
  radius: PropTypes.func,
  size: PropTypes.arrayOf(PropTypes.number),
  padding: PropTypes.number,
  nodeComponent: PropTypes.any
};

export default function Pack({
  top,
  left,
  className,
  root,
  radius,
  size,
  padding,
  children,
  nodeComponent = DefaultNode,
  ...restProps
}) {
  const pack = d3pack();

  if (size) pack.size(size);
  if (radius !== undefined) pack.radius(radius);
  if (padding) pack.padding(padding);

  const data = pack(root);

  if (children) return children(data);

  return (
    <Group top={top} left={left} className={cx('vx-pack', className)}>
      {nodeComponent &&
        data.descendants().map((node, i) => {
          return (
            <Group key={`pack-node-${i}`}>{React.createElement(nodeComponent, { node })}</Group>
          );
        })}
    </Group>
  );
}
