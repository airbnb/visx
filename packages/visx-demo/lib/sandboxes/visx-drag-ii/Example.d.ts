/// <reference types="react" />
declare type Line = {
    x: number;
    y: number;
}[];
declare type Lines = Line[];
export declare type DragIIProps = {
    width: number;
    height: number;
    data?: Lines;
};
export default function DragII({ data, width, height }: DragIIProps): JSX.Element;
export {};
