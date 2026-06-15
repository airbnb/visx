# @visx/kernel

Shared primitives for first-party visx hooks.

`@visx/kernel` keeps user-input handling consistent across the hooks surface: referential stability,
structural equality, accessor normalization, and shared development warnings live in one package
instead of being reimplemented in each consumer package. It also provides stable id generation for
shared SVG and a11y patterns.

The package is intentionally small. Public hooks and pure helpers are added only when a first-party
hook needs the shared behavior.

`toPath2D(d)` returns a real `Path2D` in browsers. On the server, it returns a minimal object that
stores the path string for cache identity and string inspection; it is not a drawing polyfill.
