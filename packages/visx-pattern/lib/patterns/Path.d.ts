/// <reference types="react" />
declare type PathProps = {
    /** Unique id for the pattern. */
    id: string;
    /** Width of the pattern element. */
    width: number;
    /** Height of the pattern element. */
    height: number;
    /** d attribute of the path element */
    path?: string;
    /** fill color applied to path. */
    fill?: string;
    /** className applied to the path element. */
    className?: string;
    /** Background color applied behind path. */
    background?: string;
    /** Stroke color applied to path. */
    stroke?: string;
    /** strokeWidth applied to path. */
    strokeWidth?: number | string;
    /** strokeDasharray applied to path. */
    strokeDasharray?: string | number;
    /** strokeLinecap applied to path. */
    strokeLinecap?: 'square' | 'butt' | 'round' | 'inherit';
    /** shapeRendering applied to path. */
    shapeRendering?: string | number;
};
export default function Path({ id, width, height, path, fill, stroke, strokeWidth, strokeDasharray, strokeLinecap, shapeRendering, background, className, }: PathProps): JSX.Element;
export {};
//# sourceMappingURL=Path.d.ts.map