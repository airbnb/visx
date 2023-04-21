/// <reference types="react" />
export declare type VoronoiProps = {
    width: number;
    height: number;
    margin?: {
        top: number;
        right: number;
        bottom: number;
        left: number;
    };
};
declare function Example({ width, height, margin }: VoronoiProps): JSX.Element;
export default Example;
