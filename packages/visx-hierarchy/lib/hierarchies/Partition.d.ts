import React from 'react';
import { HierarchyNode, HierarchyRectangularNode } from 'd3-hierarchy';
export declare type NodeComponentProps<Datum> = {
    node: HierarchyRectangularNode<Datum>;
};
export declare type PartitionProps<Datum> = {
    /** The root hierarchy node from which to derive the treemap layout. */
    root: HierarchyNode<Datum>;
    /** Render override function which is passed the computed partition layout data. */
    children?: (pack: HierarchyRectangularNode<Datum>) => React.ReactNode;
    /** top offset applied to the g element container. */
    top?: number;
    /** left offset applied to the g element container. */
    left?: number;
    /** className applied to the g element container. */
    className?: string;
    /** Sets this partition layout’s size to the specified two-element array of numbers `[width, height]` . */
    size?: [number, number];
    /** Whether partition layout rounds values. */
    round?: boolean;
    /** Sets padding, used to separate a node’s adjacent children. */
    padding?: number;
    /** Component which renders a single cluster node, passed the node object. */
    nodeComponent?: React.FunctionComponent<NodeComponentProps<Datum>> | React.ComponentClass<NodeComponentProps<Datum>>;
};
export default function Partition<Datum>({ top, left, className, root, size, round, padding, children, nodeComponent, }: PartitionProps<Datum>): JSX.Element;
//# sourceMappingURL=Partition.d.ts.map