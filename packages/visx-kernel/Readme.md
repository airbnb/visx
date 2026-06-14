# @visx/kernel

Shared primitives for first-party visx hooks.

`@visx/kernel` keeps user-input handling consistent across the hooks surface:
referential stability, structural equality, accessor normalization, and shared
development warnings live in one package instead of being reimplemented in each
consumer package.

The package is intentionally small. Public hooks and pure helpers are added only
when a first-party hook needs the shared behavior.
