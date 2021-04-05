import React from 'react';
import { HierarchyRectangularNode, HierarchyNode } from 'd3-hierarchy';
import { TileMethod } from '../types';
export declare type NodeComponentProps<Datum> = {
    node: HierarchyRectangularNode<Datum>;
};
declare type NumerOrNumberAccessor<Datum> = number | ((node: HierarchyRectangularNode<Datum>) => number);
export declare type TreemapProps<Datum> = {
    /** The root hierarchy node from which to derive the treemap layout. */
    root: HierarchyNode<Datum>;
    /** Render override function which is passed the computed pack layout data. */
    children?: (pack: HierarchyRectangularNode<Datum>) => React.ReactNode;
    /** top offset applied to the g element container. */
    top?: number;
    /** left offset applied to the g element container. */
    left?: number;
    /** className applied to the g element container. */
    className?: string;
    /**
     * Sets the treemap tiling method to the specified function (exported from this package).
     * See https://github.com/d3/d3-hierarchy#treemap for more.
     */
    tile?: TileMethod<Datum>;
    /** Sets this treemap layout’s size to the specified two-element array of numbers [width, height]  */
    size?: [number, number];
    /** Whether to round treemap values. */
    round?: boolean;
    /** Sets both inner and outer padding to the specified number or accessor. */
    padding?: NumerOrNumberAccessor<Datum>;
    /** Sets padding used to separate a node’s adjacent children. */
    paddingInner?: NumerOrNumberAccessor<Datum>;
    /** Sets padding used to spearate a node from its children. */
    paddingOuter?: NumerOrNumberAccessor<Datum>;
    /** Sets padding used to spearate the top edge of a node from its children. */
    paddingTop?: NumerOrNumberAccessor<Datum>;
    /** Sets padding used to spearate the right edge of a node from its children. */
    paddingRight?: NumerOrNumberAccessor<Datum>;
    /** Sets padding used to spearate the bottom edge of a node from its children. */
    paddingBottom?: NumerOrNumberAccessor<Datum>;
    /** Sets padding used to spearate the left edge of a node from its children. */
    paddingLeft?: NumerOrNumberAccessor<Datum>;
    /** Component which renders a single pack node, passed the node object. */
    nodeComponent?: React.FunctionComponent<NodeComponentProps<Datum>> | React.ComponentClass<NodeComponentProps<Datum>>;
};
export default function Treemap<Datum>({ top, left, className, root, tile, size, round, padding, paddingInner, paddingOuter, paddingTop, paddingRight, paddingBottom, paddingLeft, children, nodeComponent, }: TreemapProps<Datum>): JSX.Element;
export {};
//# sourceMappingURL=Treemap.d.ts.map