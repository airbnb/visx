# @visx/event

<a title="@visx/event npm downloads" href="https://www.npmjs.com/package/@visx/event">
  <img src="https://img.shields.io/npm/dm/@visx/event.svg?style=flat-square" />
</a>

## Installation

```
npm install --save @visx/event
```

## Usage

`@visx/event` exports a utility `localPoint` that takes an `SVG` `MouseEvent` or `TouchEvent` as
input and returns a `{ x: number; y: number; }` point coordinate (or `null` in the case the event
has no `ownerSVGElement`) within the coordinate system of the `SVG`. This makes placement of
tooltips, finding nearby datum, etc. easier.

Example:

```tsx
import { localPoint } from '@visx/event';

<svg>
  <SomeElement
    {...}
    onMouseMove={(event: MouseEvent) => {
      const point = localPoint(event) || { x: 0, y: 0 };
      // use coordinates ...
    }}
  />
  {...}
</svg>
```

You may optionally pass a reference to the SVG node

```tsx
import { useRef } from 'react';
import { localPoint } from '@visx/event';

const svgRef = useRef<SVGSVGElement>(null);

<svg ref={svgRef}>
  <SomeElement
    {...}
    onMouseMove={(event: MouseEvent) => {
      const point = localPoint(svgRef.current, event) || { x: 0, y: 0 };
      // use coordinates ...
    }}
  />
  {...}
</svg>
```
