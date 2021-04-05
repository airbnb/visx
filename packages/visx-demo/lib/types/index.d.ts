export interface MarginShape {
    top: number;
    right: number;
    bottom: number;
    left: number;
}
export interface WidthAndHeight {
    width: number;
    height: number;
}
export declare type ShowProvidedProps = {
    width: number;
    height: number;
    margin?: MarginShape;
    events?: boolean;
};
export declare type VisxPackage = 'annotation' | 'axis' | 'bounds' | 'brush' | 'chord' | 'clip-path' | 'curve' | 'drag' | 'event' | 'geo' | 'glyph' | 'gradient' | 'grid' | 'group' | 'heatmap' | 'hierarchy' | 'legend' | 'marker' | 'mock-data' | 'network' | 'pattern' | 'point' | 'react-spring' | 'responsive' | 'scale' | 'shape' | 'stats' | 'text' | 'threshold' | 'tooltip' | 'voronoi' | 'visx' | 'xychart' | 'zoom';
export declare type PackageJson = {
    dependencies?: {
        [packageName: string]: string;
    };
};
/** DocGenInfo for a single prop */
export declare type PropInfo = {
    defaultValue?: {
        value?: unknown;
    };
    description?: string;
    name: string;
    required: boolean;
    type?: {
        name: string;
    };
};
/** DocGenInfo, added to components by react-docgen-typescript-loader */
export declare type DocGenInfo = {
    description?: string;
    displayName?: string;
    props: {
        [propName: string]: PropInfo;
    };
};
//# sourceMappingURL=index.d.ts.map