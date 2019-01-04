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


## Installation

```
npm install --save @vx/network
```


## Components



  - [DefaultLink](#defaultlink-)
  - [DefaultNode](#defaultnode-)
  - [Graph](#graph-)
  - [Links](#links-)
  - [Nodes](#nodes-)

## API



<h3 id="defaultlink-">&lt;DefaultLink /&gt;</h3>



<a id="#DefaultLink__link" name="DefaultLink__link" href="#DefaultLink__link">#</a> *DefaultLink*.**link**&lt;object&gt;  

<h3 id="defaultnode-">&lt;DefaultNode /&gt;</h3>




<h3 id="graph-">&lt;Graph /&gt;</h3>



<a id="#Graph__graph" name="Graph__graph" href="#Graph__graph">#</a> *Graph*.**graph**&lt;object&gt;  

<a id="#Graph__linkComponent" name="Graph__linkComponent" href="#Graph__linkComponent">#</a> *Graph*.**linkComponent**&lt;any&gt;  <table><tr><td><strong>Default</strong></td><td>DefaultLink</td></td></table>

<a id="#Graph__nodeComponent" name="Graph__nodeComponent" href="#Graph__nodeComponent">#</a> *Graph*.**nodeComponent**&lt;any&gt;  <table><tr><td><strong>Default</strong></td><td>DefaultNode</td></td></table>

<h3 id="links-">&lt;Links /&gt;</h3>



<a id="#Links__className" name="Links__className" href="#Links__className">#</a> *Links*.**className**&lt;string&gt;  

<a id="#Links__linkComponent" name="Links__linkComponent" href="#Links__linkComponent">#</a> *Links*.**linkComponent**&lt;any&gt;  

<a id="#Links__links" name="Links__links" href="#Links__links">#</a> *Links*.**links**&lt;array&gt;  

<h3 id="nodes-">&lt;Nodes /&gt;</h3>



<a id="#Nodes__className" name="Nodes__className" href="#Nodes__className">#</a> *Nodes*.**className**&lt;string&gt;  

<a id="#Nodes__nodeComponent" name="Nodes__nodeComponent" href="#Nodes__nodeComponent">#</a> *Nodes*.**nodeComponent**&lt;any&gt;  

<a id="#Nodes__nodes" name="Nodes__nodes" href="#Nodes__nodes">#</a> *Nodes*.**nodes**&lt;array&gt;  
