/// <reference types="react" />
declare const defaultMargin: {
    top: number;
    right: number;
    bottom: number;
    left: number;
};
export declare const primaryColor = "#8921e0";
export declare const secondaryColor = "#00f2ff";
export declare type GlyphProps = {
    width: number;
    height: number;
    margin?: typeof defaultMargin;
};
export default function Example({ width, height, margin }: GlyphProps): JSX.Element | null;
export {};
//# sourceMappingURL=Example.d.ts.map