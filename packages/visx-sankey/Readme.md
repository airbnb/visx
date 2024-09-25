# @visx/sankey

<a title="@visx/sankey npm downloads" href="https://www.npmjs.com/package/@visx/sankey">
  <img src="https://img.shields.io/npm/dm/@visx/sankey.svg?style=flat-square" />
</a>

Sankey diagrams visualize the directed flow between nodes in an acyclic network. This package contains `react` components for
visualizing sankey diagrams and largely mirrors
[`d3-sankey`](https://github.com/d3/d3-sankey).

Many components take the same input `sankey` data as defined in as specified in the
[`d3-sankey`](https://github.com/d3/d3-sankey) module to output a graph of the sankey layout. For convenience, this package also
exports the [`d3-sankey`](https://github.com/d3/d3-sankey)utility to generate this format.

```js
// equivalent to `import { sankey } from 'd3-sankey';`
import { sankey } from '@visx/sankey';

const generator = sankey();
const graph = generator({
  nodes: [
    { name: 'node 1' },
    { name: 'node 2' },
    { name: 'node 3' },
  ],
  links: [
    { source: 0, target: 1, value: 10 },
    { source: 1, target: 2, value: 5 },
  ],
});
```

## Installation

```
npm install --save @visx/sankey
```
