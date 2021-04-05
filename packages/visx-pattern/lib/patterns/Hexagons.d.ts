/// <reference types="react" />
export declare type PatternHexagonsProps = {
    /** Unique id for the pattern. */
    id: string;
    /** Height of the pattern element. */
    height: number;
    /** Size of the hexagon shape. */
    size?: number;
    /** Fill applied to hexagons. */
    fill?: string;
    /** className applied to hexagon path element. */
    className?: string;
    /** Background color applied behind hexagons. */
    background?: string;
    /** Stroke color applied to hexagon paths. */
    stroke?: string;
    /** strokeWidth applied to hexagon paths. */
    strokeWidth?: number | string;
    /** strokeDasharray applied to hexagon paths. */
    strokeDasharray?: string | number;
    /** strokeLinecap applied to hexagon paths. */
    strokeLinecap?: 'square' | 'butt' | 'round' | 'inherit';
    /** shapeRendering applied to hexagon paths. */
    shapeRendering?: string | number;
};
export default function Hexagons({ id, height, fill, stroke, strokeWidth, strokeDasharray, strokeLinecap, shapeRendering, background, className, size, }: PatternHexagonsProps): JSX.Element;
//# sourceMappingURL=Hexagons.d.ts.map