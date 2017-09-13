# @vx/hierarchy

```
npm install --save @vx/hierarchy
```

This package contains two components, `<Tree />` and `<Cluster />`, both of which render trees as a node-link diagram.

The `<Tree />` component uses the [d3 tree layout](https://github.com/d3/d3-hierarchy#tree), which produces a tidy node-link diagram.

The `<Cluster />` component uses the [d3 cluster layout](https://github.com/d3/d3-hierarchy#cluster), which produces the leaf nodes of the tree at the same depth.  This is also known as a [dendrogram](https://en.wikipedia.org/wiki/Dendrogram).

Both components use the same properties.  The data must be a root node, as specified in the [d3-hierarchy](https://github.com/d3/d3-hierarchy) module.  Note that you can use [`d3.hierarchy()`](https://github.com/d3/d3-hierarchy#hierarchy) to generate a root node from hierarchical data.

Furthermore, they take in `nodeComponent` and `linkComponent` as props, which are required to render the tree.

See [this example](https://vx-demo.now.sh/trees) for additional details.

## `<Tree />` and `<Cluster />`

### Properties

| Name          | Default | Type | Description |
|:--------------|:--------|:-----|:------------
| top           | 0 | number    | Margin to top 
| left          | 0 | number    | Margin on left 
| className     |   | string    | The className for the component
| root          |   | object    | Root node for hierarchical data; see [`d3.hierarchy()`](https://github.com/d3/d3-hierarchy#hierarchy)
| size          | [1, 1] | array     | Size of tree/cluster layout specified by `[width, height]`; see [`tree.size()`](https://github.com/d3/d3-hierarchy#tree_size) 
| nodeSize      | null | array     | Size of tree/cluster layout's nodes specified by `[width, height]`; see [`tree.nodeSize()`](https://github.com/d3/d3-hierarchy#tree_nodeSize)
| separation    |  | function  | Separation accessor for tree/cluster layout; see [`tree.separation()`](https://github.com/d3/d3-hierarchy#tree_separation) 
| nodeComponent | [`<HierarchyDefaultNode />`](https://github.com/hshoff/vx/blob/master/packages/vx-hierarchy/src/HierarchyDefaultNode.js) | Component | Component to render for each node 
| linkComponent | [`<HierarchyDefaultLink />`](https://github.com/hshoff/vx/blob/master/packages/vx-hierarchy/src/HierarchyDefaultLink.js) | Component | Component to render for links between nodes

## Source For Components

* [`<Tree />`](https://github.com/hshoff/vx/blob/master/packages/vx-hierarchy/src/hierarchies/Tree.js)
* [`<Cluster />`](https://github.com/hshoff/vx/blob/master/packages/vx-hierarchy/src/hierarchies/Cluster.js)