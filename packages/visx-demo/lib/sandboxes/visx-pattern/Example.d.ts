/// <reference types="react" />
declare const defaultMargin: {
    top: number;
    left: number;
    right: number;
    bottom: number;
};
export declare type PatternProps = {
    width: number;
    height: number;
    margin?: typeof defaultMargin;
};
export default function Example({ width, height, margin }: PatternProps): JSX.Element | null;
export {};
//# sourceMappingURL=Example.d.ts.map