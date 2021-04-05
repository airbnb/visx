/// <reference types="react" />
import { PatternOrientationType } from '../constants';
export declare function pathForOrientation({ height, orientation, }: {
    height: number;
    orientation: PatternOrientationType;
}): string;
export declare type PatternLinesProps = {
    /** Unique id for the pattern. */
    id: string;
    /** Width of the pattern element. */
    width: number;
    /** Height of the pattern element. */
    height: number;
    /** className applied to line path element. */
    className?: string;
    /** Background color applied behind lines. */
    background?: string;
    /** Stroke color applied to path elements. */
    stroke?: string;
    /** strokeWidth applied to path elements. */
    strokeWidth?: number | string;
    /** strokeDasharray applied to path elements. */
    strokeDasharray?: string | number;
    /** strokeLinecap applied to path elements. */
    strokeLinecap?: 'square' | 'butt' | 'round' | 'inherit';
    /** shapeRendering applied to path elements. */
    shapeRendering?: string | number;
    /** Array of orientations to render (can mix multiple). */
    orientation?: PatternOrientationType[];
};
export default function Lines({ id, width, height, stroke, strokeWidth, strokeDasharray, strokeLinecap, shapeRendering, orientation, background, className, }: PatternLinesProps): JSX.Element;
//# sourceMappingURL=Lines.d.ts.map