# @vx/hierarchy

<a title="@vx/hierarchy npm downloads" href="https://www.npmjs.com/package/@vx/hierarchy">
  <img src="https://img.shields.io/npm/dm/@vx/hierarchy.svg?style=flat-square" />
</a>

This package contains two components, `<Tree />` and `<Cluster />`, both of which render trees as a node-link diagram.

The `<Tree />` component uses the [d3 tree layout](https://github.com/d3/d3-hierarchy#tree), which produces a tidy node-link diagram.

The `<Cluster />` component uses the [d3 cluster layout](https://github.com/d3/d3-hierarchy#cluster), which produces the leaf nodes of the tree at the same depth. This is also known as a [dendrogram](https://en.wikipedia.org/wiki/Dendrogram).

Both components use the same properties. The data must be a root node, as specified in the [d3-hierarchy](https://github.com/d3/d3-hierarchy) module. Note that you can use [`d3.hierarchy()`](https://github.com/d3/d3-hierarchy#hierarchy) to generate a root node from hierarchical data.

Furthermore, they take in `nodeComponent` and `linkComponent` as props, which are required to render the tree.

See [this example](https://vx-demo.now.sh/trees) for additional details.
