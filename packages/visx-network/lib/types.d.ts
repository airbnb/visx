export interface DefaultNode {
    x: number;
    y: number;
}
export interface Link<Node> {
    source: Node;
    target: Node;
}
export interface Graph<Link, Node> {
    links: Link[];
    nodes: Node[];
}
export interface LinkProvidedProps<Link> {
    link: Link;
}
export interface NodeProvidedProps<Node> {
    node: Node;
}
//# sourceMappingURL=types.d.ts.map