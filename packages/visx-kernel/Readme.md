# @visx/kernel

Shared primitives for first-party visx hooks.

`@visx/kernel` keeps user-input handling consistent across the hooks surface: referential stability,
structural equality, accessor normalization, and shared development warnings live in one package
instead of being reimplemented in each consumer package. It also provides stable id generation for
shared SVG and a11y patterns.

## Installation

```sh
npm install --save @visx/kernel
```

## Motivation

visx hooks are designed around one idea: hooks own the math, users own the render tree. That means
first-party hooks like `useScale`, `useAxis`, and `usePie` all receive the same kinds of user input:
data arrays, accessors, options objects, dimensions, ids, and callbacks.

Without a shared substrate, each package has to answer the same questions independently:

- Does this object-shaped input have the same values as last render?
- Should a string accessor and a simple property function behave the same way?
- How do we keep callback identity stable while reading fresh state?
- How do we warn about dirty data with consistent source tags and structured details?
- How do we generate stable ids for clip paths, gradients, labels, and a11y relationships?

Those are cross-cutting contracts, not chart-specific features. `@visx/kernel` keeps them small,
audited, and consistent so the hooks surface behaves like one library instead of many similar local
implementations.

## Primitive-first design

Kernel is not a chart package. It does not create scales, render axes, lay out marks, or own chart
state. It provides the tiny pieces that make those packages predictable.

- Hooks return ordinary values and refs.
- Pure helpers are safe to import on the server.
- User input is normalized before package-specific work begins.
- Warning payloads share one shape across packages.
- Public helpers are added only when multiple first-party packages need the same behavior.

Most applications should use higher-level visx packages directly. Kernel is mainly for first-party
hooks and advanced users building the same kind of low-level primitives.

## Basic usage

### Stabilize object-shaped inputs

Use `useStructuralMemo` when an options object should keep the same reference if its shallow values
are unchanged.

```tsx
import { useStructuralMemo } from '@visx/kernel';

function ChartFrame({ margin }) {
  const stableMargin = useStructuralMemo(
    {
      top: margin?.top ?? 0,
      right: margin?.right ?? 0,
      bottom: margin?.bottom ?? 0,
      left: margin?.left ?? 0,
    },
    1,
  );

  return <g transform={`translate(${stableMargin.left}, ${stableMargin.top})`} />;
}
```

### Normalize accessors

Use `normalizeAccessor` when an API accepts either a string key or a function accessor.

```ts
import { normalizeAccessor } from '@visx/kernel';

type Datum = { label: string; value: number };

const getValue = normalizeAccessor<Datum, number>('value');
const value = getValue({ label: 'Q1', value: 42 }, 0, []);
```

Simple property accessors normalize to the same cached function as their string-key equivalent.

```ts
const byKey = normalizeAccessor<Datum, number>('value');
const byFunction = normalizeAccessor<Datum, number>((datum) => datum.value);

byKey === byFunction; // true
```

### Compute domains with shared warnings

`useDomain` normalizes accessors, skips invalid values, stabilizes the returned domain, and emits
structured development warnings for dirty input.

```tsx
import { useDomain } from '@visx/kernel';

function RevenueChart({ data }) {
  const domain = useDomain({
    data,
    accessor: 'revenue',
    type: 'linear',
  });

  return <span>{domain.join(' - ')}</span>;
}
```

### Keep callbacks and ids stable

Use `useStableCallback` when event handlers need stable identity but fresh closed-over values. Use
`useStableId` for SVG definitions and a11y relationships that must not remount every render.

```tsx
import { useLatestRef, useStableCallback, useStableId } from '@visx/kernel';

function InteractiveLayer({ data, onSelect }) {
  const dataRef = useLatestRef(data);
  const clipId = useStableId('scatter-clip');
  const handlePointerMove = useStableCallback((index: number) => {
    onSelect(dataRef.current[index]);
  });

  return (
    <svg>
      <clipPath id={clipId}>
        <rect width={400} height={240} />
      </clipPath>
      <rect clipPath={`url(#${clipId})`} onPointerMove={() => handlePointerMove(0)} />
    </svg>
  );
}
```

### Build and cache path strings

Use `createPath` when a package needs a small SVG path builder with shared precision behavior. Pass
the resulting string to `toPath2D` when drawing the same path on Canvas.

```ts
import { createPath, toPath2D } from '@visx/kernel';

const d = createPath(2).moveTo(0, 0).lineTo(12.345, 67.89).closePath().toString();
const path = toPath2D(d);
```

`toPath2D(d)` returns a real `Path2D` in browsers. On the server, it returns a minimal object that
stores the path string for cache identity and string inspection; it is not a drawing polyfill.

### Capture warning details

Use `setWarnHandler` in tests, docs, or integrations that need structured warning payloads.

```ts
import { setWarnHandler } from '@visx/kernel';

const restore = setWarnHandler(({ code, details, source }) => {
  console.info(source, code, details);
});

restore();
```
