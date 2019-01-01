# @vx/heatmap

<a title="@vx/heatmap npm downloads" href="https://www.npmjs.com/package/@vx/heatmap">
  <img src="https://img.shields.io/npm/dm/@vx/heatmap.svg?style=flat-square" />
</a>

A Heatmap is a series of shapes where the data values are represented as colors.

## Example

![Example heatmap](http://i.imgur.com/OzSD3X3.png)

```js
<HeatmapRect
  data={data}
  xScale={xScale}
  yScale={yScale}
  colorScale={colorScale}
  opacityScale={opacityScale}
  binWidth={bWidth}
  binHeight={bWidth}
  step={dStep}
  gap={0}
/>
```

Heatmaps generally require structure that has this shape:

```js
[
  {
    bin: 1,
    bins: [
      {
        count: 20,
        bin: 23
      }
    ]
  }
];
```

However, you're welcome to use your own structure by defining `x`, `y`, `z` accessors such as:

```js
// Example accessors
const x = d => d.myBin;
const y = d => d.myBins;
const z = d => d.myCount;

// Example scale with an accessors
const xScale = scaleLinear({
  range: [0, xMax],
  domain: extent(data, x)
});
```


## Installation

```
npm install --save @vx/heatmap
```


## Components



  - [circle](#circle-)
  - [rect](#rect-)

## API



### &lt;circle /&gt;


<a name="circle__bins" href="#circle__bins">#</a> *circle*.**bins**&lt;func&gt;  

Default:
```js
d => d.bins
```


<a name="circle__children" href="#circle__children">#</a> *circle*.**children**&lt;func&gt;  

<a name="circle__className" href="#circle__className">#</a> *circle*.**className**&lt;string&gt;  

<a name="circle__colorScale" href="#circle__colorScale">#</a> *circle*.**colorScale**&lt;func&gt;  

Default:
```js
d => undefined
```


<a name="circle__count" href="#circle__count">#</a> *circle*.**count**&lt;func&gt;  

Default:
```js
d => d.count
```


<a name="circle__data" href="#circle__data">#</a> *circle*.**data**&lt;array&gt;  

<a name="circle__gap" href="#circle__gap">#</a> *circle*.**gap**&lt;number&gt;  

Default:
```js
1
```


<a name="circle__left" href="#circle__left">#</a> *circle*.**left**&lt;number&gt;  

<a name="circle__opacityScale" href="#circle__opacityScale">#</a> *circle*.**opacityScale**&lt;func&gt;  

Default:
```js
d => 1
```


<a name="circle__radius" href="#circle__radius">#</a> *circle*.**radius**&lt;number&gt;  

Default:
```js
6
```


<a name="circle__top" href="#circle__top">#</a> *circle*.**top**&lt;number&gt;  

<a name="circle__xScale" href="#circle__xScale">#</a> *circle*.**xScale**&lt;func&gt; `required` 

<a name="circle__yScale" href="#circle__yScale">#</a> *circle*.**yScale**&lt;func&gt; `required` 

### &lt;rect /&gt;


<a name="rect__binHeight" href="#rect__binHeight">#</a> *rect*.**binHeight**&lt;number&gt;  

<a name="rect__binWidth" href="#rect__binWidth">#</a> *rect*.**binWidth**&lt;number&gt;  

<a name="rect__bins" href="#rect__bins">#</a> *rect*.**bins**&lt;func&gt;  

Default:
```js
d => d.bins
```


<a name="rect__children" href="#rect__children">#</a> *rect*.**children**&lt;func&gt;  

<a name="rect__className" href="#rect__className">#</a> *rect*.**className**&lt;string&gt;  

<a name="rect__colorScale" href="#rect__colorScale">#</a> *rect*.**colorScale**&lt;func&gt;  

Default:
```js
d => undefined
```


<a name="rect__count" href="#rect__count">#</a> *rect*.**count**&lt;func&gt;  

Default:
```js
d => d.count
```


<a name="rect__data" href="#rect__data">#</a> *rect*.**data**&lt;array&gt;  

<a name="rect__gap" href="#rect__gap">#</a> *rect*.**gap**&lt;number&gt;  

Default:
```js
1
```


<a name="rect__left" href="#rect__left">#</a> *rect*.**left**&lt;number&gt;  

<a name="rect__opacityScale" href="#rect__opacityScale">#</a> *rect*.**opacityScale**&lt;func&gt;  

Default:
```js
d => 1
```


<a name="rect__top" href="#rect__top">#</a> *rect*.**top**&lt;number&gt;  

<a name="rect__x0" href="#rect__x0">#</a> *rect*.**x0**&lt;number&gt;  

Default:
```js
0
```


<a name="rect__xScale" href="#rect__xScale">#</a> *rect*.**xScale**&lt;func&gt;  

<a name="rect__yScale" href="#rect__yScale">#</a> *rect*.**yScale**&lt;func&gt;  
