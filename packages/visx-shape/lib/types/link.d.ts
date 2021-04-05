/// <reference types="react" />
export declare type AccessorProps<Link, Node> = {
    /** Given a node, returns its x coordinate. */
    x?: (node: Node) => number;
    /** Given a node, returns its y coordinate. */
    y?: (node: Node) => number;
    /** Given a link, returns the source node. */
    source?: (link: Link) => Node;
    /** Given a link, returns the target node. */
    target?: (link: Link) => Node;
};
export declare type RadialAccessorProps<Link, Node> = Pick<AccessorProps<Link, Node>, 'source' | 'target'> & {
    /** Given a node, returns its x coordinate. */
    angle?: (node: Node) => number;
    /** Given a node, returns its y coordinate. */
    radius?: (node: Node) => number;
};
declare type PathType<Link> = (link: Link) => string | null;
export declare type SharedLinkProps<Link> = {
    /** className applied to path element. */
    className?: string;
    /** React ref to the path element. */
    innerRef?: React.Ref<SVGPathElement>;
    /** Path generator, given a link returns a path d attribute string */
    path?: PathType<Link>;
    /** Render function override which is passed the configured path generator as input. */
    children?: (args: {
        path: PathType<Link>;
    }) => React.ReactNode;
    /** Datum for which to render a link. */
    data: Link;
};
export {};
//# sourceMappingURL=link.d.ts.map