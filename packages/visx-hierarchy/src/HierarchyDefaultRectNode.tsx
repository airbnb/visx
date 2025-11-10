export type NodeProps = {
  node: { x0: number; x1: number; y0: number; y1: number };
};

export default function HierarchyDefaultRectNode({ node: { x0, x1, y0, y1 } }: NodeProps) {
  return <rect x={x0} y={y0} width={Math.abs(x1 - x0)} height={Math.abs(y1 - y0)} fill="#21D4FD" />;
}
