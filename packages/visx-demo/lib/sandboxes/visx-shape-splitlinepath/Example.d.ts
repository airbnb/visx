/// <reference types="react" />
export declare const background = "#045275";
export declare const backgroundLight = "#089099";
export declare const foreground = "#b7e6a5";
export declare type SplitLinePathProps = {
    width: number;
    height: number;
    margin?: {
        top: number;
        right: number;
        bottom: number;
        left: number;
    };
    numberOfWaves?: number;
    pointsPerWave?: number;
    numberOfSegments?: number;
};
export default function SplitPath({ width, height, numberOfWaves, pointsPerWave, numberOfSegments, }: SplitLinePathProps): JSX.Element | null;
//# sourceMappingURL=Example.d.ts.map