# @visx/hierarchy

<a title="@visx/hierarchy npm downloads" href="https://www.npmjs.com/package/@visx/hierarchy">
  <img src="https://img.shields.io/npm/dm/@visx/hierarchy.svg?style=flat-square" />
</a>

Many datasets are intrinsically hierarchical. This package contains several `react` components for
visualizing hierarchical data and largely mirrors
[`d3-hierarchy`](https://github.com/d3/d3-hierarchy).

Many components take the same input `hierarchy` data root node as defined in as specified in the
[`d3-hierarchy`](https://github.com/d3/d3-hierarchy) module. For convenience, this package also
exports the [`d3-hierarchy`](https://github.com/d3/d3-hierarchy)utility to generate this format.

```js
// equivalent to `import { hierarchy } from 'd3-hierarchy';`
import { hierarchy } from '@visx/hierarchy';

const root = hierarchy({
  name: 'root',
  children: [
    { name: 'child #1' },
    {
      name: 'child #2',
      children: [{ name: 'grandchild #1' }, { name: 'grandchild #2' }, { name: 'grandchild #3' }],
    },
  ],
});
```

## Installation

```
npm install --save @visx/hierarchy
```
