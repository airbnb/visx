/**
 * The typings for React 16 and 17 erroneously include events named
 * `onPointerEnterCapture` and `onPointerLeaveCapture`. When type declarations
 * are generated for this library, these events are included in
 * exhaustive lists of properties through inlining of the `Omit` utility as an
 * invested `Pick`. This causes type errors in React 18, where these event names
 * are not valid.
 *
 * To work around this, wrap any such type in this helper, which will strip off
 * the invalid event names.
 */
export type LegacyReactEvents = 'onPointerEnterCapture' | 'onPointerLeaveCapture';
