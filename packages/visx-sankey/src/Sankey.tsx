import type { ReactNode, SVGAttributes } from 'react';
import cx from 'classnames';
import { Group } from '@visx/group';
import type { SankeyExtraProperties, SankeyGraph, SankeyLink, SankeyNode } from 'd3-sankey';
import { sankey as d3sankey, sankeyLinkHorizontal } from 'd3-sankey';
import type { Link } from '@visx/vendor/d3-shape';

const DEFAULT_COLOR = '#000';

type NodeProps = Pick<
  SVGAttributes<SVGRectElement>,
  'stroke' | 'strokeOpacity' | 'strokeWidth' | 'fill' | 'fillOpacity'
>;
type LinkProps = Pick<
  SVGAttributes<SVGPathElement>,
  | 'fill'
  | 'fillOpacity'
  | 'stroke'
  | 'strokeOpacity'
  | 'strokeWidth'
  | 'strokeDasharray'
  | 'strokeDashoffset'
>;

type CreatePath<
  NodeDatum extends SankeyExtraProperties,
  LinkDatum extends SankeyExtraProperties,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
> = Link<any, SankeyLink<NodeDatum, LinkDatum>, [number, number]>;

type NodeIdAccessor<
  NodeDatum extends SankeyExtraProperties,
  LinkDatum extends SankeyExtraProperties,
> = (node: SankeyNode<NodeDatum, LinkDatum>) => string | number;

type SourceAccessor<
  NodeDatum extends SankeyExtraProperties,
  LinkDatum extends SankeyExtraProperties,
> = Exclude<Parameters<CreatePath<NodeDatum, LinkDatum>['source']>, undefined>[0];

type TargetAccessor<
  NodeDatum extends SankeyExtraProperties,
  LinkDatum extends SankeyExtraProperties,
> = Exclude<Parameters<CreatePath<NodeDatum, LinkDatum>['target']>, undefined>[0];

type NodeAlignment<
  NodeDatum extends SankeyExtraProperties,
  LinkDatum extends SankeyExtraProperties,
> = (node: SankeyNode<NodeDatum, LinkDatum>, n: number) => number;

type SankeyChildrenFunction<
  NodeDatum extends SankeyExtraProperties,
  LinkDatum extends SankeyExtraProperties,
> = (args: {
  graph: SankeyGraph<NodeDatum, LinkDatum>;
  createPath: CreatePath<NodeDatum, LinkDatum>;
}) => ReactNode;

export type SankeyProps<
  NodeDatum extends SankeyExtraProperties,
  LinkDatum extends SankeyExtraProperties,
> = {
  /** The root data from which to derive the sankey layout. */
  root: SankeyGraph<NodeDatum, LinkDatum>;
  /** The class name(s) applied to the g element container. */
  className?: string;
  /** Render override function which is passed the computed sankey data graph */
  children?: SankeyChildrenFunction<NodeDatum, LinkDatum>;
  /** Sets the node id accessor. */
  nodeId?: NodeIdAccessor<NodeDatum, LinkDatum>;
  /** Sets the node width. */
  nodeWidth?: number;
  /** Sets the node padding. */
  nodePadding?: number;
  /** Sets the node alignment function. */
  nodeAlign?: NodeAlignment<NodeDatum, LinkDatum>;
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
  nodeProps?: NodeProps;
  /** Sets the props for the default rendered link path. Ignored when children is defined. */
  linkProps?: LinkProps;
  /** Sets the source accessor for determining the link path. */
  sourceAccessor?: SourceAccessor<NodeDatum, LinkDatum>;
  /** Sets the target accessor for determining the link path. */
  targetAccessor?: TargetAccessor<NodeDatum, LinkDatum>;
};

/**
 * Exposes d3-sankey as a React component.
 */
export default function Sankey<
  NodeDatum extends SankeyExtraProperties,
  LinkDatum extends SankeyExtraProperties,
>({
  root,
  className,
  children,
  nodeId,
  nodeWidth = 2,
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
  const createPath = sankeyLinkHorizontal<NodeDatum, LinkDatum>();
  if (sourceAccessor) createPath.source(sourceAccessor);
  if (targetAccessor) createPath.target(targetAccessor);

  if (children) {
    return <>{children({ graph, createPath })}</>;
  }

  return (
    <Group className={cx('visx-sankey', className)}>
      <Group className="visx-sankey-links">
        {graph.links.map((link, i) => (
          <path
            d={createPath(link) ?? ''}
            key={i}
            fill="transparent"
            stroke={DEFAULT_COLOR}
            strokeWidth={Math.max(1, link.width ?? 0)}
            strokeOpacity={0.5}
            {...linkProps}
          />
        ))}
      </Group>
      <Group className="visx-sankey-nodes">
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
    </Group>
  );
}
