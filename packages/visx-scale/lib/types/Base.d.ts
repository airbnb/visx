/** A value that has .valueOf() function */
export declare type NumberLike = {
    valueOf(): number;
};
/** A value that has .toString() function */
export declare type StringLike = {
    toString(): string;
};
/** Default output type */
export declare type DefaultOutput = number | string | boolean | null;
/** Union types of all values from a map type */
export declare type ValueOf<T> = T[keyof T];
/** Extract generic type from array */
export declare type Unarray<T> = T extends Array<infer U> ? U : T;
//# sourceMappingURL=Base.d.ts.map