/// <reference types="react" />
export declare const accentColor = "#f6acc8";
export declare const background = "#584153";
export declare const background2 = "#af8baf";
export declare type BrushProps = {
    width: number;
    height: number;
    margin?: {
        top: number;
        right: number;
        bottom: number;
        left: number;
    };
    compact?: boolean;
};
declare function BrushChart({ compact, width, height, margin, }: BrushProps): JSX.Element;
export default BrushChart;
//# sourceMappingURL=Example.d.ts.map