import React, { SVGAttributes } from 'react';
import { Group } from '@visx/group';
import {
  sankey as d3sankey,
  SankeyExtraProperties,
  SankeyGraph,
  SankeyLink,
  sankeyLinkHorizontal,
  SankeyNode,
} from 'd3-sankey';
import { Link } from 'd3-shape';

const DEFAULT_COLOR = '#000';

export type SankeyProps<
  NodeDatum extends SankeyExtraProperties,
  LinkDatum extends SankeyExtraProperties,
> = {
  /** The root data from which to derive the sankey layout. */
  root: SankeyGraph<NodeDatum, LinkDatum>;
  /** Render override function which is passed the computed sankey data graph */
  children?: (args: { graph: SankeyGraph<NodeDatum, LinkDatum> }) => React.ReactNode;
  /** Sets the node id accessor. */
  nodeId?: (node: SankeyNode<NodeDatum, LinkDatum>) => string | number;
  /** Sets the node width. */
  nodeWidth?: number;
  /** Sets the node padding. */
  nodePadding?: number;
  /** Sets the node alignment function. */
  nodeAlign?: (node: SankeyNode<NodeDatum, LinkDatum>, n: number) => number;
  /** Sets the extent of the sankey layout. */
  extent?: [[number, number], [number, number]];
  /** Sets the size of the layout. A convenience method equivalent to using an extent of [[0, 0], [width, height]] */
  size?: [number, number];
  /** Sets the number of relaxation iterations. */
  iterations?: number;
  /** Sets the node comparison function. */
  nodeSort?: (
    a: SankeyNode<NodeDatum, LinkDatum>,
    b: SankeyNode<NodeDatum, LinkDatum>,
  ) => number | undefined | null;
  /** Sets the link comparison function */
  linkSort?: (
    a: SankeyLink<NodeDatum, LinkDatum>,
    b: SankeyLink<NodeDatum, LinkDatum>,
  ) => number | undefined | null;
  /** Sets the props for the default rendered node rect. Ignored when children is defined. */
  nodeProps?: Omit<SVGAttributes<SVGRectElement>, 'width' | 'height' | 'x' | 'y'>;
  /** Sets the props for the default rendered link path. Ignored when children is defined. */
  linkProps?: Omit<SVGAttributes<SVGPathElement>, 'd'>;
  /** Sets the source accessor for determining the link path. */
  sourceAccessor?: Exclude<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Parameters<Link<any, SankeyLink<NodeDatum, LinkDatum>, [number, number]>['source']>,
    undefined
  >[0];
  /** Sets the target accessor for determining the link path. */
  targetAccessor?: Exclude<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Parameters<Link<any, SankeyLink<NodeDatum, LinkDatum>, [number, number]>['target']>,
    undefined
  >[0];
};

/**
 * Exposes d3-sankey as a React component.
 */
export default function Sankey<
  NodeDatum extends SankeyExtraProperties,
  LinkDatum extends SankeyExtraProperties,
>({
  root,
  children,
  nodeId,
  nodeWidth,
  nodePadding,
  nodeAlign,
  extent,
  size,
  iterations,
  nodeSort,
  linkSort,
  nodeProps = {},
  linkProps = {},
  sourceAccessor,
  targetAccessor,
}: SankeyProps<NodeDatum, LinkDatum>) {
  const sankey = d3sankey<NodeDatum, LinkDatum>();
  if (nodeId) sankey.nodeId(nodeId);
  if (nodeWidth) sankey.nodeWidth(nodeWidth);
  if (nodePadding) sankey.nodePadding(nodePadding);
  if (nodeAlign) sankey.nodeAlign(nodeAlign);
  if (extent) sankey.extent(extent);
  if (size) sankey.size(size);
  if (iterations) sankey.iterations(iterations);
  if (nodeSort) sankey.nodeSort(nodeSort);
  if (linkSort) sankey.linkSort(linkSort);

  const graph = sankey(root);
  const path = sankeyLinkHorizontal<NodeDatum, LinkDatum>();
  if (sourceAccessor) path.source(sourceAccessor);
  if (targetAccessor) path.target(targetAccessor);

  if (children) {
    return children({ graph });
  }

  return (
    <>
      <Group>
        {graph.links.map((link, i) => (
          <path
            d={path(link) ?? ''}
            key={i}
            fill="transparent"
            stroke={DEFAULT_COLOR}
            strokeWidth={link.width}
            strokeOpacity={0.5}
            {...linkProps}
          />
        ))}
      </Group>
      <Group>
        {graph.nodes.map(({ y0, y1, x0, x1 }, i) =>
          y0 !== undefined && y1 !== undefined && x0 !== undefined && x1 !== undefined ? (
            <rect
              fill={DEFAULT_COLOR}
              width={x1 - x0}
              height={y1 - y0}
              x={x0}
              y={y0}
              key={i}
              {...nodeProps}
            />
          ) : null,
        )}
      </Group>
    </>
  );
}
