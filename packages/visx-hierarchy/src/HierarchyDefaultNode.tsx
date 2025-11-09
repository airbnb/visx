export type NodeProps = {
  node?: { x: number; y: number; r?: number };
};

export default function HierarchyDefaultNode({ node = { x: 0, y: 0, r: 15 } }: NodeProps) {
  return <circle cx={node.x} cy={node.y} r={node.r || 15} fill="#21D4FD" />;
}
