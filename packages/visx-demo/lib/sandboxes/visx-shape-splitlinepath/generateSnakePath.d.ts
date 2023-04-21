interface Point {
    x: number;
    y: number;
}
/** generate a continuous path that fill rectangular space, similar to the classic Nokia snake game. */
export default function generateSnakePath({ width, height, step, }: {
    width: number;
    height: number;
    step: number;
}): Point[];
export {};
