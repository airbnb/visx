/** A value that has .valueOf() function */
export type NumberLike = { valueOf(): number };

/** A value that has .toString() function */
export type StringLike = { toString(): string };

/** Default output type */
export type DefaultOutput = number | string | boolean | null;

/** Union types of all values from a map type */
export type ValueOf<T> = T[keyof T];

/** Extract generic type from array */
export type Unarray<T> = T extends Array<infer U> ? U : T;
