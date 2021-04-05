import { TransformMatrix, Point } from '../types';
export declare function identityMatrix(): TransformMatrix;
export declare function createMatrix({ scaleX, scaleY, translateX, translateY, skewX, skewY, }: Partial<TransformMatrix>): TransformMatrix;
export declare function inverseMatrix({ scaleX, scaleY, translateX, translateY, skewX, skewY, }: TransformMatrix): {
    scaleX: number;
    scaleY: number;
    translateX: number;
    translateY: number;
    skewX: number;
    skewY: number;
};
export declare function applyMatrixToPoint(matrix: TransformMatrix, { x, y }: Point): {
    x: number;
    y: number;
};
export declare function applyInverseMatrixToPoint(matrix: TransformMatrix, { x, y }: Point): {
    x: number;
    y: number;
};
export declare function scaleMatrix(scaleX: TransformMatrix['scaleX'], maybeScaleY?: TransformMatrix['scaleY'] | undefined): TransformMatrix;
export declare function translateMatrix(translateX: TransformMatrix['translateX'], translateY: TransformMatrix['translateY']): TransformMatrix;
export declare function multiplyMatrices(matrix1: TransformMatrix, matrix2: TransformMatrix): {
    scaleX: number;
    scaleY: number;
    translateX: number;
    translateY: number;
    skewX: number;
    skewY: number;
};
export declare function composeMatrices(...matrices: TransformMatrix[]): TransformMatrix;
//# sourceMappingURL=matrix.d.ts.map