# @vx/heatmap

```
npm install --save @vx/heatmap
```

A Heatmap is a series of shapes where the data values are represented as colors.

## Example

![Example heatmap](http://i.imgur.com/OzSD3X3.png)

``` js
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

``` js
[{
  bin: 1,
  bins: [{
    count: 20,
    bin: 23
  }]
}]
```

However, you're welcome to use your own structure by defining `x`, `y`, `z` accessors such as:

``` js
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

## `<HeatmapRect />` Properties

|     Name     |   Default    |   Type   |                                           Description                                           |
|:------------ |:------------ |:-------- |:----------------------------------------------------------------------------------------------- |
| className    |              | string   | className for each <rect/>                                                                      |
| data         |              | array    | The data for your chart                                                                         |
| binWidth     |              | number   | The width of the bin.                                                                           |
| binHeight    |              | number   | The height of the bin.                                                                          |
| x            | 0            | number   | The x coordinate for heatmap.                                                                   |
| gap          | 1            | number   | The gap between heatmap shapes.                                                                 |
| step         | 0            | number   | The step between heatmap shapes.                                                                |
| xScale       |              | function | A [scale function](https://github.com/hshoff/vx/tree/master/packages/vx-scale) for the xs.      |
| yScale       |              | function | A [scale function](https://github.com/hshoff/vx/tree/master/packages/vx-scale) for the ys.      |
| colorScale   |              | function | A [color scale function](https://github.com/hshoff/vx/tree/master/packages/vx-scale).           |
| opacityScale | d => 1       | function | A [scale function](https://github.com/hshoff/vx/tree/master/packages/vx-scale) between 1 and 0. |
| bin          | d => d.bin   | function | An accessor function get the "bin".                                                             |
| bins         | d => d.bins  | function | An accessor function get the "bins".                                                            |
| count        | d => d.count | function | An accessor function get the "count".                                                           |

## `<HeatmapCircle />` Properties

|     Name     |   Default    |   Type   |                                           Description                                           |
|:------------ |:------------ |:-------- |:----------------------------------------------------------------------------------------------- |
| className    |              | string   | className for each <circle/>                                                                    |
| data         |              | array    | The data for your chart                                                                         |
| binWidth     |              | number   | The width of the bin.                                                                           |
| binHeight    |              | number   | The height of the bin.                                                                          |
| x            | 0            | number   | The x coordinate for heatmap.                                                                   |
| gap          | 1            | number   | The gap between heatmap shapes.                                                                 |
| step         | 0            | number   | The step between heatmap shapes.                                                                |
| radius       | 6            | number   | The radius of each circle.                                                                      |
| xScale       |              | function | A [scale function](https://github.com/hshoff/vx/tree/master/packages/vx-scale) for the xs.      |
| yScale       |              | function | A [scale function](https://github.com/hshoff/vx/tree/master/packages/vx-scale) for the ys.      |
| colorScale   |              | function | A [color scale function](https://github.com/hshoff/vx/tree/master/packages/vx-scale).           |
| opacityScale | d => 1       | function | A [scale function](https://github.com/hshoff/vx/tree/master/packages/vx-scale) between 1 and 0. |
| bin          | d => d.bin   | function | An accessor function get the "bin".                                                             |
| bins         | d => d.bins  | function | An accessor function get the "bins".                                                            |
| count        | d => d.count | function | An accessor function get the "count".                                                           |
