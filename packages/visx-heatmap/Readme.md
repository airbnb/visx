# @visx/heatmap

<a title="@visx/heatmap npm downloads" href="https://www.npmjs.com/package/@visx/heatmap">
  <img src="https://img.shields.io/npm/dm/@visx/heatmap.svg?style=flat-square" />
</a>

A Heatmap is an arrangement of shapes where the data values are represented as colors.

## Example

<img style="display:block; width:34vw;" src="http://i.imgur.com/OzSD3X3.png">

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
        bin: 23,
      },
    ],
  },
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
  domain: extent(data, x),
});
```

## Installation

```
npm install --save @visx/heatmap
```
