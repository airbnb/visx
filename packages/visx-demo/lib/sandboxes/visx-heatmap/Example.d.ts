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
declare function Example({ width, height, events, margin, separation, }: HeatmapProps): JSX.Element;
export default Example;
