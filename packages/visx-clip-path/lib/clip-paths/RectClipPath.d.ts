import React from 'react';
export declare type RectClipPathProps = {
    /** Unique id for the clipPath. */
    id: string;
    /** x position of the ClipPath rect. */
    x?: string | number;
    /** y position of the ClipPath rect. */
    y?: string | number;
    /** width of the ClipPath rect. */
    width?: string | number;
    /** height of the ClipPath rect. */
    height?: string | number;
};
export default function RectClipPath({ id, x, y, width, height, ...restProps }: RectClipPathProps & Omit<React.SVGProps<SVGRectElement>, keyof RectClipPathProps>): JSX.Element;
//# sourceMappingURL=RectClipPath.d.ts.map