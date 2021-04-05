/// <reference types="react" />
export declare const background = "#28272c";
export declare type HeatmapProps = {
    width: number;
    height: number;
    margin?: {
        top: number;
        right: number;
        bottom: number;
        left: number;
    };
    separation?: number;
    events?: boolean;
};
declare const Example: ({ width, height, events, margin, separation, }: HeatmapProps) => JSX.Element | null;
export default Example;
//# sourceMappingURL=Example.d.ts.map