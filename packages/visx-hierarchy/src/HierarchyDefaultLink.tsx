type Node = { x: number; y: number };

export type LinkProps = {
  link?: { source: Node; target: Node };
};

const DEFAULT_LINK = { source: { x: 0, y: 0 }, target: { x: 0, y: 0 } };

export default function HierarchyDefaultLink({ link = DEFAULT_LINK }: LinkProps) {
  return (
    <line
      x1={link.source.x}
      y1={link.source.y}
      x2={link.target.x}
      y2={link.target.y}
      strokeWidth={2}
      stroke="#999"
      strokeOpacity={0.6}
    />
  );
}
