export interface DefaultNode {
  x: number;
  y: number;
}

export interface Link<Node> {
  source: Node;
  target: Node;
}

export interface Graph<L, Node> {
  links: L[];
  nodes: Node[];
}

export interface LinkProvidedProps<L> {
  link: L;
}

export interface NodeProvidedProps<Node> {
  node: Node;
}
