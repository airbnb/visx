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



  - [HeatmapCircle](#heatmapcircle-)
  - [HeatmapRect](#heatmaprect-)

## API



### &lt;HeatmapCircle /&gt;


<a name="HeatmapCircle__bins" href="#HeatmapCircle__bins">#</a> *HeatmapCircle*.**bins**&lt;func&gt;  

Default:
```js
d => d.bins
```


<a name="HeatmapCircle__children" href="#HeatmapCircle__children">#</a> *HeatmapCircle*.**children**&lt;func&gt;  

<a name="HeatmapCircle__className" href="#HeatmapCircle__className">#</a> *HeatmapCircle*.**className**&lt;string&gt;  

<a name="HeatmapCircle__colorScale" href="#HeatmapCircle__colorScale">#</a> *HeatmapCircle*.**colorScale**&lt;func&gt;  

Default:
```js
d => undefined
```


<a name="HeatmapCircle__count" href="#HeatmapCircle__count">#</a> *HeatmapCircle*.**count**&lt;func&gt;  

Default:
```js
d => d.count
```


<a name="HeatmapCircle__data" href="#HeatmapCircle__data">#</a> *HeatmapCircle*.**data**&lt;array&gt;  

<a name="HeatmapCircle__gap" href="#HeatmapCircle__gap">#</a> *HeatmapCircle*.**gap**&lt;number&gt;  

Default:
```js
1
```


<a name="HeatmapCircle__left" href="#HeatmapCircle__left">#</a> *HeatmapCircle*.**left**&lt;number&gt;  

<a name="HeatmapCircle__opacityScale" href="#HeatmapCircle__opacityScale">#</a> *HeatmapCircle*.**opacityScale**&lt;func&gt;  

Default:
```js
d => 1
```


<a name="HeatmapCircle__radius" href="#HeatmapCircle__radius">#</a> *HeatmapCircle*.**radius**&lt;number&gt;  

Default:
```js
6
```


<a name="HeatmapCircle__top" href="#HeatmapCircle__top">#</a> *HeatmapCircle*.**top**&lt;number&gt;  

<a name="HeatmapCircle__xScale" href="#HeatmapCircle__xScale">#</a> *HeatmapCircle*.**xScale**&lt;func&gt; `required` 

<a name="HeatmapCircle__yScale" href="#HeatmapCircle__yScale">#</a> *HeatmapCircle*.**yScale**&lt;func&gt; `required` 

### &lt;HeatmapRect /&gt;


<a name="HeatmapRect__binHeight" href="#HeatmapRect__binHeight">#</a> *HeatmapRect*.**binHeight**&lt;number&gt;  

<a name="HeatmapRect__binWidth" href="#HeatmapRect__binWidth">#</a> *HeatmapRect*.**binWidth**&lt;number&gt;  

<a name="HeatmapRect__bins" href="#HeatmapRect__bins">#</a> *HeatmapRect*.**bins**&lt;func&gt;  

Default:
```js
d => d.bins
```


<a name="HeatmapRect__children" href="#HeatmapRect__children">#</a> *HeatmapRect*.**children**&lt;func&gt;  

<a name="HeatmapRect__className" href="#HeatmapRect__className">#</a> *HeatmapRect*.**className**&lt;string&gt;  

<a name="HeatmapRect__colorScale" href="#HeatmapRect__colorScale">#</a> *HeatmapRect*.**colorScale**&lt;func&gt;  

Default:
```js
d => undefined
```


<a name="HeatmapRect__count" href="#HeatmapRect__count">#</a> *HeatmapRect*.**count**&lt;func&gt;  

Default:
```js
d => d.count
```


<a name="HeatmapRect__data" href="#HeatmapRect__data">#</a> *HeatmapRect*.**data**&lt;array&gt;  

<a name="HeatmapRect__gap" href="#HeatmapRect__gap">#</a> *HeatmapRect*.**gap**&lt;number&gt;  

Default:
```js
1
```


<a name="HeatmapRect__left" href="#HeatmapRect__left">#</a> *HeatmapRect*.**left**&lt;number&gt;  

<a name="HeatmapRect__opacityScale" href="#HeatmapRect__opacityScale">#</a> *HeatmapRect*.**opacityScale**&lt;func&gt;  

Default:
```js
d => 1
```


<a name="HeatmapRect__top" href="#HeatmapRect__top">#</a> *HeatmapRect*.**top**&lt;number&gt;  

<a name="HeatmapRect__x0" href="#HeatmapRect__x0">#</a> *HeatmapRect*.**x0**&lt;number&gt;  

Default:
```js
0
```


<a name="HeatmapRect__xScale" href="#HeatmapRect__xScale">#</a> *HeatmapRect*.**xScale**&lt;func&gt;  

<a name="HeatmapRect__yScale" href="#HeatmapRect__yScale">#</a> *HeatmapRect*.**yScale**&lt;func&gt;  
