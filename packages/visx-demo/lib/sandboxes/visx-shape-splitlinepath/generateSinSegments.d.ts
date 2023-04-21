declare type Point = {
    x: number;
    y: number;
};
export default function generateSinSegments({ width, height, numberOfWaves, pointsPerWave, direction, }: {
    width: number;
    height: number;
    numberOfWaves?: number;
    pointsPerWave?: number;
    direction?: 'left-to-right' | 'right-to-left' | 'top-to-bottom' | 'bottom-to-top';
}): Point[][];
export {};
