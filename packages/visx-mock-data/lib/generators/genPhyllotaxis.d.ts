export interface GenPhyllotaxis {
    radius: number;
    width: number;
    height: number;
}
export interface PhyllotaxisPoint {
    x: number;
    y: number;
}
export declare type GenPhyllotaxisFunction = (idx: number) => PhyllotaxisPoint;
export default function genPhyllotaxis({ radius, width, height, }: GenPhyllotaxis): GenPhyllotaxisFunction;
//# sourceMappingURL=genPhyllotaxis.d.ts.map