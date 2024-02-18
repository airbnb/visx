export type Simplify<T> = { [Key in keyof T]: T[Key] } & {};

export interface DebounceSettings {
  /** Child render updates upon resize are delayed until `debounceTime` milliseconds _after_ the last resize event is observed. Defaults to `300`. */
  debounceTime?: number;
  /** Optional flag to toggle leading debounce calls. When set to true this will ensure that the component always renders immediately. Defaults to `true`. */
  enableDebounceLeadingCall?: boolean;
}
