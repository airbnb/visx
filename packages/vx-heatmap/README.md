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



<h3 id="heatmapcircle-">&lt;HeatmapCircle /&gt;</h3>



<a id="#HeatmapCircle__bins" name="HeatmapCircle__bins" href="#HeatmapCircle__bins">#</a> *HeatmapCircle*.**bins**&lt;func&gt;  <table><tr><td><strong>Default</strong></td><td>d => d.bins</td></td></table>

<a id="#HeatmapCircle__children" name="HeatmapCircle__children" href="#HeatmapCircle__children">#</a> *HeatmapCircle*.**children**&lt;func&gt;  

<a id="#HeatmapCircle__className" name="HeatmapCircle__className" href="#HeatmapCircle__className">#</a> *HeatmapCircle*.**className**&lt;string&gt;  

<a id="#HeatmapCircle__colorScale" name="HeatmapCircle__colorScale" href="#HeatmapCircle__colorScale">#</a> *HeatmapCircle*.**colorScale**&lt;func&gt;  <table><tr><td><strong>Default</strong></td><td>d => undefined</td></td></table>

<a id="#HeatmapCircle__count" name="HeatmapCircle__count" href="#HeatmapCircle__count">#</a> *HeatmapCircle*.**count**&lt;func&gt;  <table><tr><td><strong>Default</strong></td><td>d => d.count</td></td></table>

<a id="#HeatmapCircle__data" name="HeatmapCircle__data" href="#HeatmapCircle__data">#</a> *HeatmapCircle*.**data**&lt;array&gt;  

<a id="#HeatmapCircle__gap" name="HeatmapCircle__gap" href="#HeatmapCircle__gap">#</a> *HeatmapCircle*.**gap**&lt;number&gt;  <table><tr><td><strong>Default</strong></td><td>1</td></td></table>

<a id="#HeatmapCircle__left" name="HeatmapCircle__left" href="#HeatmapCircle__left">#</a> *HeatmapCircle*.**left**&lt;number&gt;  

<a id="#HeatmapCircle__opacityScale" name="HeatmapCircle__opacityScale" href="#HeatmapCircle__opacityScale">#</a> *HeatmapCircle*.**opacityScale**&lt;func&gt;  <table><tr><td><strong>Default</strong></td><td>d => 1</td></td></table>

<a id="#HeatmapCircle__radius" name="HeatmapCircle__radius" href="#HeatmapCircle__radius">#</a> *HeatmapCircle*.**radius**&lt;number&gt;  <table><tr><td><strong>Default</strong></td><td>6</td></td></table>

<a id="#HeatmapCircle__top" name="HeatmapCircle__top" href="#HeatmapCircle__top">#</a> *HeatmapCircle*.**top**&lt;number&gt;  

<a id="#HeatmapCircle__xScale" name="HeatmapCircle__xScale" href="#HeatmapCircle__xScale">#</a> *HeatmapCircle*.**xScale**&lt;func&gt; `required` 

<a id="#HeatmapCircle__yScale" name="HeatmapCircle__yScale" href="#HeatmapCircle__yScale">#</a> *HeatmapCircle*.**yScale**&lt;func&gt; `required` 

<h3 id="heatmaprect-">&lt;HeatmapRect /&gt;</h3>



<a id="#HeatmapRect__binHeight" name="HeatmapRect__binHeight" href="#HeatmapRect__binHeight">#</a> *HeatmapRect*.**binHeight**&lt;number&gt;  

<a id="#HeatmapRect__binWidth" name="HeatmapRect__binWidth" href="#HeatmapRect__binWidth">#</a> *HeatmapRect*.**binWidth**&lt;number&gt;  

<a id="#HeatmapRect__bins" name="HeatmapRect__bins" href="#HeatmapRect__bins">#</a> *HeatmapRect*.**bins**&lt;func&gt;  <table><tr><td><strong>Default</strong></td><td>d => d.bins</td></td></table>

<a id="#HeatmapRect__children" name="HeatmapRect__children" href="#HeatmapRect__children">#</a> *HeatmapRect*.**children**&lt;func&gt;  

<a id="#HeatmapRect__className" name="HeatmapRect__className" href="#HeatmapRect__className">#</a> *HeatmapRect*.**className**&lt;string&gt;  

<a id="#HeatmapRect__colorScale" name="HeatmapRect__colorScale" href="#HeatmapRect__colorScale">#</a> *HeatmapRect*.**colorScale**&lt;func&gt;  <table><tr><td><strong>Default</strong></td><td>d => undefined</td></td></table>

<a id="#HeatmapRect__count" name="HeatmapRect__count" href="#HeatmapRect__count">#</a> *HeatmapRect*.**count**&lt;func&gt;  <table><tr><td><strong>Default</strong></td><td>d => d.count</td></td></table>

<a id="#HeatmapRect__data" name="HeatmapRect__data" href="#HeatmapRect__data">#</a> *HeatmapRect*.**data**&lt;array&gt;  

<a id="#HeatmapRect__gap" name="HeatmapRect__gap" href="#HeatmapRect__gap">#</a> *HeatmapRect*.**gap**&lt;number&gt;  <table><tr><td><strong>Default</strong></td><td>1</td></td></table>

<a id="#HeatmapRect__left" name="HeatmapRect__left" href="#HeatmapRect__left">#</a> *HeatmapRect*.**left**&lt;number&gt;  

<a id="#HeatmapRect__opacityScale" name="HeatmapRect__opacityScale" href="#HeatmapRect__opacityScale">#</a> *HeatmapRect*.**opacityScale**&lt;func&gt;  <table><tr><td><strong>Default</strong></td><td>d => 1</td></td></table>

<a id="#HeatmapRect__top" name="HeatmapRect__top" href="#HeatmapRect__top">#</a> *HeatmapRect*.**top**&lt;number&gt;  

<a id="#HeatmapRect__x0" name="HeatmapRect__x0" href="#HeatmapRect__x0">#</a> *HeatmapRect*.**x0**&lt;number&gt;  <table><tr><td><strong>Default</strong></td><td>0</td></td></table>

<a id="#HeatmapRect__xScale" name="HeatmapRect__xScale" href="#HeatmapRect__xScale">#</a> *HeatmapRect*.**xScale**&lt;func&gt;  

<a id="#HeatmapRect__yScale" name="HeatmapRect__yScale" href="#HeatmapRect__yScale">#</a> *HeatmapRect*.**yScale**&lt;func&gt;  
