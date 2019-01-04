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


## Installation

```
npm install --save @vx/hierarchy
```


## Components



  - [HierarchyDefaultLink](#hierarchydefaultlink-)
  - [HierarchyDefaultNode](#hierarchydefaultnode-)
  - [Cluster](#cluster-)
  - [Pack](#pack-)
  - [Partition](#partition-)
  - [Tree](#tree-)
  - [Treemap](#treemap-)

## API



<h3 id="hierarchydefaultlink-">&lt;HierarchyDefaultLink /&gt;</h3>



<a id="#HierarchyDefaultLink__link" name="HierarchyDefaultLink__link" href="#HierarchyDefaultLink__link">#</a> *HierarchyDefaultLink*.**link**&lt;object&gt;  

<h3 id="hierarchydefaultnode-">&lt;HierarchyDefaultNode /&gt;</h3>



<a id="#HierarchyDefaultNode__node" name="HierarchyDefaultNode__node" href="#HierarchyDefaultNode__node">#</a> *HierarchyDefaultNode*.**node**&lt;object&gt;  

<h3 id="cluster-">&lt;Cluster /&gt;</h3>



<a id="#Cluster__children" name="Cluster__children" href="#Cluster__children">#</a> *Cluster*.**children**&lt;func&gt;  

<a id="#Cluster__className" name="Cluster__className" href="#Cluster__className">#</a> *Cluster*.**className**&lt;string&gt;  

<a id="#Cluster__left" name="Cluster__left" href="#Cluster__left">#</a> *Cluster*.**left**&lt;number&gt;  

<a id="#Cluster__linkComponent" name="Cluster__linkComponent" href="#Cluster__linkComponent">#</a> *Cluster*.**linkComponent**&lt;any&gt;  <table><tr><td><strong>Default</strong></td><td>DefaultLink</td></td></table>

<a id="#Cluster__nodeComponent" name="Cluster__nodeComponent" href="#Cluster__nodeComponent">#</a> *Cluster*.**nodeComponent**&lt;any&gt;  <table><tr><td><strong>Default</strong></td><td>DefaultNode</td></td></table>

<a id="#Cluster__nodeSize" name="Cluster__nodeSize" href="#Cluster__nodeSize">#</a> *Cluster*.**nodeSize**&lt;arrayOf[object Object]&gt;  

<a id="#Cluster__root" name="Cluster__root" href="#Cluster__root">#</a> *Cluster*.**root**&lt;object&gt; `required` 

<a id="#Cluster__separation" name="Cluster__separation" href="#Cluster__separation">#</a> *Cluster*.**separation**&lt;func&gt;  

<a id="#Cluster__size" name="Cluster__size" href="#Cluster__size">#</a> *Cluster*.**size**&lt;arrayOf[object Object]&gt;  

<a id="#Cluster__top" name="Cluster__top" href="#Cluster__top">#</a> *Cluster*.**top**&lt;number&gt;  

<h3 id="pack-">&lt;Pack /&gt;</h3>



<a id="#Pack__children" name="Pack__children" href="#Pack__children">#</a> *Pack*.**children**&lt;func&gt;  

<a id="#Pack__className" name="Pack__className" href="#Pack__className">#</a> *Pack*.**className**&lt;string&gt;  

<a id="#Pack__left" name="Pack__left" href="#Pack__left">#</a> *Pack*.**left**&lt;number&gt;  

<a id="#Pack__nodeComponent" name="Pack__nodeComponent" href="#Pack__nodeComponent">#</a> *Pack*.**nodeComponent**&lt;any&gt;  <table><tr><td><strong>Default</strong></td><td>DefaultNode</td></td></table>

<a id="#Pack__padding" name="Pack__padding" href="#Pack__padding">#</a> *Pack*.**padding**&lt;number&gt;  

<a id="#Pack__radius" name="Pack__radius" href="#Pack__radius">#</a> *Pack*.**radius**&lt;func&gt;  

<a id="#Pack__root" name="Pack__root" href="#Pack__root">#</a> *Pack*.**root**&lt;object&gt; `required` 

<a id="#Pack__size" name="Pack__size" href="#Pack__size">#</a> *Pack*.**size**&lt;arrayOf[object Object]&gt;  

<a id="#Pack__top" name="Pack__top" href="#Pack__top">#</a> *Pack*.**top**&lt;number&gt;  

<h3 id="partition-">&lt;Partition /&gt;</h3>



<a id="#Partition__children" name="Partition__children" href="#Partition__children">#</a> *Partition*.**children**&lt;func&gt;  

<a id="#Partition__className" name="Partition__className" href="#Partition__className">#</a> *Partition*.**className**&lt;string&gt;  

<a id="#Partition__left" name="Partition__left" href="#Partition__left">#</a> *Partition*.**left**&lt;number&gt;  

<a id="#Partition__nodeComponent" name="Partition__nodeComponent" href="#Partition__nodeComponent">#</a> *Partition*.**nodeComponent**&lt;any&gt;  <table><tr><td><strong>Default</strong></td><td>DefaultNode</td></td></table>

<a id="#Partition__padding" name="Partition__padding" href="#Partition__padding">#</a> *Partition*.**padding**&lt;number&gt;  

<a id="#Partition__root" name="Partition__root" href="#Partition__root">#</a> *Partition*.**root**&lt;object&gt; `required` 

<a id="#Partition__round" name="Partition__round" href="#Partition__round">#</a> *Partition*.**round**&lt;bool&gt;  

<a id="#Partition__size" name="Partition__size" href="#Partition__size">#</a> *Partition*.**size**&lt;arrayOf[object Object]&gt;  

<a id="#Partition__top" name="Partition__top" href="#Partition__top">#</a> *Partition*.**top**&lt;number&gt;  

<h3 id="tree-">&lt;Tree /&gt;</h3>



<a id="#Tree__children" name="Tree__children" href="#Tree__children">#</a> *Tree*.**children**&lt;func&gt;  

<a id="#Tree__className" name="Tree__className" href="#Tree__className">#</a> *Tree*.**className**&lt;string&gt;  

<a id="#Tree__left" name="Tree__left" href="#Tree__left">#</a> *Tree*.**left**&lt;number&gt;  

<a id="#Tree__linkComponent" name="Tree__linkComponent" href="#Tree__linkComponent">#</a> *Tree*.**linkComponent**&lt;any&gt;  <table><tr><td><strong>Default</strong></td><td>DefaultLink</td></td></table>

<a id="#Tree__nodeComponent" name="Tree__nodeComponent" href="#Tree__nodeComponent">#</a> *Tree*.**nodeComponent**&lt;any&gt;  <table><tr><td><strong>Default</strong></td><td>DefaultNode</td></td></table>

<a id="#Tree__nodeSize" name="Tree__nodeSize" href="#Tree__nodeSize">#</a> *Tree*.**nodeSize**&lt;arrayOf[object Object]&gt;  

<a id="#Tree__root" name="Tree__root" href="#Tree__root">#</a> *Tree*.**root**&lt;object&gt; `required` 

<a id="#Tree__separation" name="Tree__separation" href="#Tree__separation">#</a> *Tree*.**separation**&lt;func&gt;  

<a id="#Tree__size" name="Tree__size" href="#Tree__size">#</a> *Tree*.**size**&lt;arrayOf[object Object]&gt;  

<a id="#Tree__top" name="Tree__top" href="#Tree__top">#</a> *Tree*.**top**&lt;number&gt;  

<h3 id="treemap-">&lt;Treemap /&gt;</h3>



<a id="#Treemap__children" name="Treemap__children" href="#Treemap__children">#</a> *Treemap*.**children**&lt;func&gt;  

<a id="#Treemap__className" name="Treemap__className" href="#Treemap__className">#</a> *Treemap*.**className**&lt;string&gt;  

<a id="#Treemap__left" name="Treemap__left" href="#Treemap__left">#</a> *Treemap*.**left**&lt;number&gt;  

<a id="#Treemap__nodeComponent" name="Treemap__nodeComponent" href="#Treemap__nodeComponent">#</a> *Treemap*.**nodeComponent**&lt;any&gt;  <table><tr><td><strong>Default</strong></td><td>DefaultNode</td></td></table>

<a id="#Treemap__padding" name="Treemap__padding" href="#Treemap__padding">#</a> *Treemap*.**padding**&lt;union(number|func)&gt;  

<a id="#Treemap__paddingBottom" name="Treemap__paddingBottom" href="#Treemap__paddingBottom">#</a> *Treemap*.**paddingBottom**&lt;union(number|func)&gt;  

<a id="#Treemap__paddingInner" name="Treemap__paddingInner" href="#Treemap__paddingInner">#</a> *Treemap*.**paddingInner**&lt;union(number|func)&gt;  

<a id="#Treemap__paddingLeft" name="Treemap__paddingLeft" href="#Treemap__paddingLeft">#</a> *Treemap*.**paddingLeft**&lt;union(number|func)&gt;  

<a id="#Treemap__paddingOuter" name="Treemap__paddingOuter" href="#Treemap__paddingOuter">#</a> *Treemap*.**paddingOuter**&lt;union(number|func)&gt;  

<a id="#Treemap__paddingRight" name="Treemap__paddingRight" href="#Treemap__paddingRight">#</a> *Treemap*.**paddingRight**&lt;union(number|func)&gt;  

<a id="#Treemap__paddingTop" name="Treemap__paddingTop" href="#Treemap__paddingTop">#</a> *Treemap*.**paddingTop**&lt;union(number|func)&gt;  

<a id="#Treemap__root" name="Treemap__root" href="#Treemap__root">#</a> *Treemap*.**root**&lt;object&gt; `required` 

<a id="#Treemap__round" name="Treemap__round" href="#Treemap__round">#</a> *Treemap*.**round**&lt;bool&gt;  

<a id="#Treemap__size" name="Treemap__size" href="#Treemap__size">#</a> *Treemap*.**size**&lt;arrayOf[object Object]&gt;  

<a id="#Treemap__tile" name="Treemap__tile" href="#Treemap__tile">#</a> *Treemap*.**tile**&lt;func&gt;  

<a id="#Treemap__top" name="Treemap__top" href="#Treemap__top">#</a> *Treemap*.**top**&lt;number&gt;  
