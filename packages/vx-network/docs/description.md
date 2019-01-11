# @vx/network

<a title="@vx/network npm downloads" href="https://www.npmjs.com/package/@vx/network">
  <img src="https://img.shields.io/npm/dm/@vx/network.svg?style=flat-square" />
</a>

A simple package to represent a network graph.

## Example Usage

```js
import { Graph, DefaultLink, DefaultNode } from '@vx/network';
const nodes = [{ x: 50, y: 20 }, { x: 200, y: 300 }, { x: 300, y: 40 }];

const dataSample = {
  nodes,
  links: [
    { source: nodes[0], target: nodes[1] },
    { source: nodes[1], target: nodes[2] },
    { source: nodes[2], target: nodes[0] }
  ]
};

const MyGraph = () => (
  <Graph graph={dataSample} linkComponent={DefaultLink} nodeComponent={DefaultNode} />
);
```
