import { StackPathConfig } from './D3ShapeConfig';
/** Unique key for item in a stack. */
export declare type StackKey = string | number;
export declare type BaseStackProps<Datum, Key> = {
    /** Array of data for which generates a stack. */
    data: Datum[];
    /** className applied to path element. */
    className?: string;
    /** Top offset of rendered Stack. */
    top?: number;
    /** Left offset of rendered Stack. */
    left?: number;
} & StackPathConfig<Datum, Key>;
//# sourceMappingURL=stack.d.ts.map