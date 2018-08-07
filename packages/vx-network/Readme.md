# @vx/network

```
npm install --save @vx/network
```

A simple package to represent a network graph.

## Example Usage

```js

import {Graph, DefaultLink, DefaultNode} from '@vx/graph';
const nodes =
  [{x: 50, y: 20}, {x: 200, y: 300}, {x: 300, y: 40}];

const dataSample = {
  nodes,
  links: [
    {source: nodes[0], target: nodes[1]},
    {source: nodes[1], target: nodes[2]},
    {source: nodes[2], target: nodes[0]}
  ]
};

const MyGraph = () => <Graph graph={dataSample}
    linkComponent={DefaultLink} nodeComponent={DefaultNode} />;

```
