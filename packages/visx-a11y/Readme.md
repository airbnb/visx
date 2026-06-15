# @visx/a11y

Accessibility helpers for primitive visx charts.

`@visx/a11y` will provide spreadable chart semantics, data table fallbacks, live announcements, and
keyboard navigation helpers for charts built from low-level visx packages. The package follows the
same primitive-first model as the rest of visx: hooks and helpers own accessibility state and
generated semantics, while users keep control of their SVG render tree.

This package is being introduced for the visx chart registry work. The initial implementation will
focus on semantic SVG annotation, server-safe description and table generators, and React helpers
that registry items can compose without adopting a new chart component.

## Entry points

```tsx
import {} from '@visx/a11y';
import {} from '@visx/a11y/server';
```

The root entry is reserved for React hooks and components. The `server` entry is reserved for pure
helpers that can run during server rendering.
