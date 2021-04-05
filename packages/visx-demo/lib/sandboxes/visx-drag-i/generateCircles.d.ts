export interface Circle {
    id: string;
    radius: number;
    x: number;
    y: number;
}
declare const generateCircles: ({ width, height }: {
    width: number;
    height: number;
}) => {
    id: string;
    radius: number;
    x: number;
    y: number;
}[];
export default generateCircles;
//# sourceMappingURL=generateCircles.d.ts.map