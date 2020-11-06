# @visx/annotation

<p>
  <a title="@visx/annotation npm downloads" href="https://www.npmjs.com/package/@visx/annotation">
    <img src="https://img.shields.io/npm/dm/@visx/annotation.svg?style=flat-square" />
  </a>
</p>

SVG `Annotation`s enable you to label points, thresholds, or regions of a visualization to provide additional context to for your chart consumer. This package is heavily inspired by [Susie Lu](https://github.com/susielu/)'s [`react-annotation`](https://github.com/susielu/react-annotation) library.

Each annotation consists of three (optional) parts:

1) `Subject` (`CircleSubject`, `LineSubject`, more 🔜) – what part of a chart is being annotated (point, line, region)

2) `Label` – the text component for the annotation. Handles SVG text wrapping using `@visx/text`, and supports `title` and `subtitle` customization as well as vertical & horizontal anchors / alignment

3) `Connector` – line connecting a subject and label


The `Annotation` or `EditableAnnotation` component wrappers allow you to compose these components and simplify their individual positioning:

```tsx
<EditableAnnotation
  x={subjectX}
  y={subjectY}
  dx={labelDx} // x offset of label from subject
  dy={labelDy} // y offset of label from subject
  onDragEnd={({ x, y, dx, dy }) => ...}
>
  <Connector />
  <CircleSubject />
  <Label title="Context about this point" subtitle="More deets">
</EditableAnnotation>
```

Components can also be used in isolation, in which case you must specify exact positions for each item:

```tsx
() => (
  <g>
    <Connector x={subjectX} y={subjectY} dx={labelDx} dy={labelDy} />
    <CircleSubject x={subjectX} y={subjectY} />
    <Label x={subjectX + labelDx} y={subjectY + labelDy} title="...">
  </g>
)
```

##### ⚠️ `ResizeObserver` dependency

The `Label` component relies on `ResizeObserver`s for auto-sizing. If you need a polyfill, you can either polute the `window` object or inject it cleanly through props:


```tsx
import { ResizeObserver } from 'your-favorite-polyfill';

function App() {
  return <Label resizeObserverPolyfill={ResizeObserver} {...} />
```


## Installation

```
npm install --save @visx/annotation
```
