import React from 'react';
import { TransformMatrix, Point, Translate, Scale, ScaleSignature, ProvidedZoom } from './types';
export declare type ZoomProps = {
    /** Width of the zoom container. */
    width: number;
    /** Height of the zoom container. */
    height: number;
    /**
     * ```js
     *  wheelDelta(event)
     * ```
     *
     * A function that returns { scaleX,scaleY } factors to scale the matrix by.
     * Scale factors greater than 1 will increase (zoom in), less than 1 will descrease (zoom out).
     */
    wheelDelta?: (event: React.WheelEvent | WheelEvent) => Scale;
    /** Minimum x scale value for transform. */
    scaleXMin?: number;
    /** Maximum x scale value for transform. */
    scaleXMax?: number;
    /** Minimum y scale value for transform. */
    scaleYMin?: number;
    /** Maximum y scale value for transform. */
    scaleYMax?: number;
    /**
     * By default constrain() will only constrain scale values. To change
     * constraints you can pass in your own constrain function as a prop.
     *
     * For example, if you wanted to constrain your view to within [[0, 0], [width, height]]:
     *
     * ```js
     * function constrain(transformMatrix, prevTransformMatrix) {
     *   const min = applyMatrixToPoint(transformMatrix, { x: 0, y: 0 });
     *   const max = applyMatrixToPoint(transformMatrix, { x: width, y: height });
     *   if (max.x < width || max.y < height) {
     *     return prevTransformMatrix;
     *   }
     *   if (min.x > 0 || min.y > 0) {
     *     return prevTransformMatrix;
     *   }
     *   return transformMatrix;
     * }
     * ```
     */
    constrain?: (transform: TransformMatrix, prevTransform: TransformMatrix) => TransformMatrix;
    /** Initial transform matrix to apply. */
    transformMatrix?: TransformMatrix;
    /**
     * When `false` (default), `<Zoom>` `children` are wrapped in a `<div>` with an active wheel
     * event listener (`handleWheel`). `handleWheel()` will call `event.preventDefault()` before other
     * execution to prevent an outer parent from scrolling when the mouse wheel is used to zoom.
     *
     * When passive is `true` it is **required** to add `<MyComponent onWheel={zoom.handleWheel} />` to handle
     * wheel events. **Note:** By default you do not need to add `<MyComponent onWheel={zoom.handleWheel} />`.
     * This is only necessary when `<Zoom passive={true} />`.
     */
    passive?: boolean;
    /** style object to apply to zoom div container. */
    style?: React.CSSProperties;
    /** className to apply to zoom div container. */
    className?: string;
    children: (zoom: ProvidedZoom & ZoomState) => React.ReactNode;
};
declare type ZoomState = {
    initialTransformMatrix: TransformMatrix;
    transformMatrix: TransformMatrix;
    isDragging: boolean;
};
declare class Zoom extends React.Component<ZoomProps, ZoomState> {
    static defaultProps: {
        passive: boolean;
        scaleXMin: number;
        scaleXMax: number;
        scaleYMin: number;
        scaleYMax: number;
        transformMatrix: {
            scaleX: number;
            scaleY: number;
            translateX: number;
            translateY: number;
            skewX: number;
            skewY: number;
        };
        wheelDelta: (event: React.WheelEvent | WheelEvent) => {
            scaleX: number;
            scaleY: number;
        };
        style: undefined;
        className: undefined;
    };
    containerRef: HTMLDivElement | null;
    startPoint: Point | undefined;
    startTranslate: Translate | undefined;
    state: {
        initialTransformMatrix: TransformMatrix;
        transformMatrix: TransformMatrix;
        isDragging: boolean;
    };
    componentDidMount(): void;
    componentWillUnmount(): void;
    applyToPoint: ({ x, y }: Point) => {
        x: number;
        y: number;
    };
    applyInverseToPoint: ({ x, y }: Point) => {
        x: number;
        y: number;
    };
    reset: () => void;
    scale: ({ scaleX, scaleY: maybeScaleY, point }: ScaleSignature) => void;
    translate: ({ translateX, translateY }: Translate) => void;
    translateTo: ({ x, y }: Point) => void;
    setTranslate: ({ translateX, translateY }: Translate) => void;
    setTransformMatrix: (transformMatrix: TransformMatrix) => void;
    invert: () => {
        scaleX: number;
        scaleY: number;
        translateX: number;
        translateY: number;
        skewX: number;
        skewY: number;
    };
    toStringInvert: () => string;
    constrain: (transformMatrix: TransformMatrix, prevTransformMatrix: TransformMatrix) => TransformMatrix;
    dragStart: (event: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent) => void;
    dragMove: (event: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent) => void;
    dragEnd: () => void;
    handleWheel: (event: React.WheelEvent | WheelEvent) => void;
    toString: () => string;
    center: () => void;
    clear: () => void;
    render(): {} | null | undefined;
}
export default Zoom;
//# sourceMappingURL=Zoom.d.ts.map