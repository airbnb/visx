import type { TextProps } from '@visx/text';

interface AnchorLineProps {
  anchorLineOrientation: 'horizontal' | 'vertical';
  verticalAnchor: TextProps['verticalAnchor'];
  horizontalAnchor: TextProps['textAnchor'];
  anchorLineStroke: string;
  width: number;
  height: number;
}

export default function AnchorLine({
  anchorLineOrientation,
  anchorLineStroke,
  verticalAnchor,
  horizontalAnchor,
  width,
  height,
}: AnchorLineProps) {
  const backgroundOutline = { stroke: anchorLineStroke, strokeWidth: 2 };

  return (
    <>
      {anchorLineOrientation === 'horizontal' && verticalAnchor === 'start' && (
        <line {...backgroundOutline} x1={0} x2={width} y1={0} y2={0} />
      )}
      {anchorLineOrientation === 'horizontal' && verticalAnchor === 'end' && (
        <line {...backgroundOutline} x1={0} x2={width} y1={height} y2={height} />
      )}
      {anchorLineOrientation === 'vertical' && horizontalAnchor === 'start' && (
        <line {...backgroundOutline} x1={0} x2={0} y1={0} y2={height} />
      )}
      {anchorLineOrientation === 'vertical' && horizontalAnchor === 'end' && (
        <line {...backgroundOutline} x1={width} x2={width} y1={0} y2={height} />
      )}
    </>
  );
}
