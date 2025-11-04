# @visx/bounds

<p>
  <a title="@visx/bounds npm downloads" href="https://www.npmjs.com/package/@visx/bounds">
    <img src="https://img.shields.io/npm/dm/@visx/bounds.svg?style=flat-square" />
  </a>
</p>

```
npm install --save @visx/bounds
```

### `withBoundingRects` HOC

It's often useful to determine whether elements (e.g., tooltips) overflow the bounds of their parent
container and adjust positioning accordingly. The `withBoundingRects` higher-order component is
meant to simplify this computation by passing in a component's bounding rect as well as its
_parent's_ bounding rect.

### Example usage

Example usage with a `<Tooltip />` component

```tsx
import React from 'react';
import { withBoundingRects, WithBoundingRectsProps } from '@visx/bounds';

type TooltipProps = WithBoundingRectsProps & {
  left: number;
  top: number;
  children?: React.ReactNode;
};

function Tooltip({ left: initialLeft, top: initialTop, rect, parentRect, children }: TooltipProps) {
  let left = initialLeft;
  let top = initialTop;

  if (rect && parentRect) {
    left = rect.right > parentRect.right ? left - rect.width : left;
    top = rect.bottom > parentRect.bottom ? top - rect.height : top;
  }

  return <div style={{ top, left, ...myTheme }}>{children}</div>;
}

export default withBoundingRects(Tooltip);
```
