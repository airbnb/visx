/** A value that has .toString() function */
export type HasToString = { toString(): string };

/** Possible values */
export type Value = number | string | boolean | null;

/** Union types of all values from a map type */
export type ValueOf<T> = T[keyof T];

/** Extract generic type from array */
export type Unarray<T> = T extends Array<infer U> ? U : T;
