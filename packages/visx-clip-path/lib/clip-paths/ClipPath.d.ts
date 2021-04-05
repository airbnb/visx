import React from 'react';
export declare type ClipPathProps = {
    /** Unique id for the clipPath. */
    id: string;
    /** clipPath children. */
    children?: React.ReactNode;
};
/** Handles rendering of <defs> and <clipPath> elements for you, with any children you want. */
export default function ClipPath({ id, children, ...restProps }: ClipPathProps & Omit<React.SVGProps<SVGClipPathElement>, keyof ClipPathProps>): JSX.Element;
//# sourceMappingURL=ClipPath.d.ts.map