import React from "react";
import cx from "classnames";
import { Group } from "@vx/group";
import { tree as d3tree } from "d3-hierarchy";
import DefaultLink from "../DefaultLink";
import DefaultNode from "../DefaultNode";

export default function Tree({
  top,
  left,
  className,
  root,
  size,
  nodeSize,
  separation,
  linkComponent = DefaultLink,
  nodeComponent = DefaultNode,
  ...restProps
}) {
  const tree = d3tree();
  if (size) tree.size(size);
  if (nodeSize) tree.nodeSize(nodeSize);
  if (separation) tree.separation(separation);
  const data = tree(root);
  const links = data.links();
  const descendants = root.descendants();
  return (
    <Group top={top} left={left} className={className}>
      {linkComponent &&
        links.map((link, i) => {
          return (
            <Group key={`tree-link-${i}`}>
              {React.createElement(linkComponent, { link })}
            </Group>
          );
        })}
      {nodeComponent &&
        descendants.map((node, i) => {
          return (
            <Group key={`tree-node-${i}`} className={className}>
              {React.createElement(nodeComponent, { node })}
            </Group>
          );
        })}
    </Group>
  );
}
