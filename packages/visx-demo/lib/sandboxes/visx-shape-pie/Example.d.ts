/// <reference types="react" />
declare const defaultMargin: {
    top: number;
    right: number;
    bottom: number;
    left: number;
};
export declare type PieProps = {
    width: number;
    height: number;
    margin?: typeof defaultMargin;
    animate?: boolean;
};
export default function Example({ width, height, margin, animate, }: PieProps): JSX.Element | null;
export {};
//# sourceMappingURL=Example.d.ts.map