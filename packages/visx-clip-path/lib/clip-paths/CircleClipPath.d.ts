import React from 'react';
export declare type CircleClipPathProps = {
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
export default function CircleClipPath({ id, cx, cy, r, ...restProps }: CircleClipPathProps & Omit<React.SVGProps<SVGCircleElement>, keyof CircleClipPathProps>): JSX.Element;
//# sourceMappingURL=CircleClipPath.d.ts.map