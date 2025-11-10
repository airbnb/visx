import type { SVGProps } from 'react';
import ClipPath from './ClipPath';

export type CircleClipPathProps = {
  /** Unique id for the clipPath. */
  id: string;
  /** x position of the center of the ClipPath circle. */
  cx?: string | number;
  /** y position of the center of the ClipPath circle. */
  cy?: string | number;
  /** radius of the ClipPath circle. */
  r?: string | number;
};

/** ClipPath for clipping to the shape of a `<circle />`, pass any `<circle />` props you want. */
export default function CircleClipPath({
  id,
  cx,
  cy,
  r,
  ...restProps
}: CircleClipPathProps & Omit<SVGProps<SVGCircleElement>, keyof CircleClipPathProps>) {
  return (
    <ClipPath id={id}>
      <circle cx={cx} cy={cy} r={r} {...restProps} />
    </ClipPath>
  );
}
