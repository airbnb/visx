/// <reference types="react" />
export declare type PatternCirclesProps = {
    /** Unique id for the pattern. */
    id: string;
    /** Width of the pattern element. */
    width: number;
    /** Height of the pattern element. */
    height: number;
    /** Radius of the pattern circles. */
    radius?: number;
    /** Fill applied to circles. */
    fill?: string;
    /** className applied to circles. */
    className?: string;
    /** stroke applied to circles. */
    stroke?: string;
    /** strokeWidth applied to circles. */
    strokeWidth?: number | string;
    /** strokeDasharray applied to circles. */
    strokeDasharray?: number | string;
    /** Whether to fill in circles within the pattern gaps to increase pattern density. */
    complement?: boolean;
    /** Background color applied behind cirlces. */
    background?: string;
};
export default function Circles({ id, width, height, radius, fill, stroke, strokeWidth, strokeDasharray, background, complement, className, }: PatternCirclesProps): JSX.Element;
//# sourceMappingURL=Circles.d.ts.map