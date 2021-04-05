import { Scale } from './types';
export declare function scaleInvert(scale: Scale, value: number): any;
export declare function getDomainFromExtent(scale: Scale, start: number, end: number, tolerentDelta: number): {
    start: number;
    end: number;
    values?: undefined;
} | {
    values: any[];
    start?: undefined;
    end?: undefined;
};
//# sourceMappingURL=utils.d.ts.map