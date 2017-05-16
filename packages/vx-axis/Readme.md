# @vx/axis

An axis is a line with ticks that helps you label your graphs.

You can use one of the 4 pre-made axes or you can create your own based on the `<Axis />` element.

## Example

![Axis Example](http://i.imgur.com/uNIgPsg.png)

``` js
<Axis.AxisBottom
  scale={xScale}
  top={yMax + margin.top}
  left={margin.left}
  label={''}
  stroke={'#1b1a1e'}
  tickTextFill={'#1b1a1e'}
/>
<Axis.AxisLeft
  scale={yScale}
  top={margin.top}
  left={margin.left}
  label={''}
  stroke={'#1b1a1e'}
  tickTextFill={'#1b1a1e'}
/>
```

## `<Axis.AxisTop/>`

|        Name        | Default  |   Type   |                                                   Description                                                   |
|:------------------ |:-------- |:-------- |:--------------------------------------------------------------------------------------------------------------- |
| scale              |          | function | A d3 [scale function](https://github.com/hshoff/vx/tree/master/packages/vx-scale).                              |
| top                |          | number   | A pixel value for the top margin.                                                                               |
| left               |          | number   | A pixel value for the top margin.                                                                               |
| stroke             |          | string   | The color for the stroke of the lines.                                                                          |
| strokeWidth        |          | number   | The pixel value for the width of the lines.                                                                     |
| strokeDasharray    |          | array    | The [pattern of dashes](https://mzl.la/1l7EiTQ) in the stroke.                                                  |
| label              |          | string   | The text for the axis label.                                                                                    |
| numTicks           | 10       | number   | The number of ticks wanted for the axis.                                                                        |
| tickFormat         |          | function | A [d3 formatter](https://github.com/d3/d3-scale/blob/master/README.md#continuous_tickFormat) for the tick text. |
| tickStroke         | black    | string   | The color for the tick's stroke value.                                                                          |
| tickK              | -1        | number   | A value that determines an offset in the tick position.                                                         |
| tickOffset         |          | number   | A value that determines the y offset in the tick position.                                                      |
| tickTransform      |          | string   | A custom SVG transform value to be applied to the ticks.                                                        |
| tickLength         | 8        | number   | The length of the tick lines.                                                                                   |
| tickPadding        | 2        | number   | The padding between the ticks and their labels.                                                                 |
| tickTextAnchor     | "middle" | string   | The textAnchor value for the tick's text.                                                                       |
| tickTextFontFamily | "Arial"  | string   | The font for the ticks.                                                                                         |
| tickTextFontSize   | 10       | number   | The font size for the ticks.                                                                                    |
| tickTextFill       | black    | string   | The text fill color for the tick's text.                                                                        |
| tickTextDy         |          | number   | The y offset to the tick's text.                                                                                |
| tickTextDx         |          | number   | The x offset to the tick's text.                                                                                |
| hideAxisLine       | false    | bool     | If true, will hide the axis line.                                                                               |
| hideTicks          | false    | bool     | If true, will hide the ticks.                                                                                   |
| hideZero           | false    | bool     | If true, will hide '0' values.                                                                                  |
| className          |          | string   | The class name applied to the axis group element.                                                               |

## `<Axis.AxisBottom/>`

|        Name        | Default  |   Type   |                                                   Description                                                   |
|:------------------ |:-------- |:-------- |:--------------------------------------------------------------------------------------------------------------- |
| scale              |          | function | A d3 [scale function](https://github.com/hshoff/vx/tree/master/packages/vx-scale).                              |
| top                |          | number   | A pixel value for the top margin.                                                                               |
| left               |          | number   | A pixel value for the top margin.                                                                               |
| stroke             |          | string   | The color for the stroke of the lines.                                                                          |
| strokeWidth        |          | number   | The pixel value for the width of the lines.                                                                     |
| strokeDasharray    |          | array    | The [pattern of dashes](https://mzl.la/1l7EiTQ) in the stroke.                                                  |
| label              |          | string   | The text for the axis label.                                                                                    |
| numTicks           | 10       | number   | The number of ticks wanted for the axis.                                                                        |
| tickFormat         |          | function | A [d3 formatter](https://github.com/d3/d3-scale/blob/master/README.md#continuous_tickFormat) for the tick text. |
| tickStroke         | black    | string   | The color for the tick's stroke value.                                                                          |
| tickK              | 1        | number   | A value that determines an offset in the tick position.                                                         |
| tickOffset         |          | number   | A value that determines the y offset in the tick position.                                                      |
| tickTransform      |          | string   | A custom SVG transform value to be applied to the ticks.                                                        |
| tickLength         | 8        | number   | The length of the tick lines.                                                                                   |
| tickPadding        | 2        | number   | The padding between the ticks and their labels.                                                                 |
| tickTextAnchor     | "middle" | string   | The textAnchor value for the tick's text.                                                                       |
| tickTextFontFamily | "Arial"  | string   | The font for the ticks.                                                                                         |
| tickTextFontSize   | 10       | number   | The font size for the ticks.                                                                                    |
| tickTextFill       | black    | string   | The text fill color for the tick's text.                                                                        |
| tickTextDy         |          | number   | The y offset to the tick's text.                                                                                |
| tickTextDx         |          | number   | The x offset to the tick's text.                                                                                |
| hideAxisLine       | false    | bool     | If true, will hide the axis line.                                                                               |
| hideTicks          | false    | bool     | If true, will hide the ticks.                                                                                   |
| hideZero           | false    | bool     | If true, will hide '0' values.                                                                                  |
| className          |          | string   | The class name applied to the axis group element.                                                               |

## `<Axis.AxisLeft/>`

|        Name        | Default |   Type   |                                                   Description                                                   |
|:------------------ |:------- |:-------- |:--------------------------------------------------------------------------------------------------------------- |
| scale              |         | function | A d3 [scale function](https://github.com/hshoff/vx/tree/master/packages/vx-scale).                              |
| top                |         | number   | A pixel value for the top margin.                                                                               |
| left               |         | number   | A pixel value for the top margin.                                                                               |
| stroke             |         | string   | The color for the stroke of the lines.                                                                          |
| strokeWidth        |         | number   | The pixel value for the width of the lines.                                                                     |
| strokeDasharray    |         | array    | The [pattern of dashes](https://mzl.la/1l7EiTQ) in the stroke.                                                  |
| label              |         | string   | The text for the axis label.                                                                                    |
| numTicks           | 10      | number   | The number of ticks wanted for the axis.                                                                        |
| tickFormat         |         | function | A [d3 formatter](https://github.com/d3/d3-scale/blob/master/README.md#continuous_tickFormat) for the tick text. |
| tickStroke         | black   | string   | The color for the tick's stroke value.                                                                          |
| tickK              | -1      | number   | A value that determines an offset in the tick position.                                                         |
| tickOffset         |         | number   | A value that determines the y offset in the tick position.                                                      |
| tickTransform      |         | string   | A custom SVG transform value to be applied to the ticks.                                                        |
| tickLength         | 8       | number   | The length of the tick lines.                                                                                   |
| tickPadding        | 2       | number   | The padding between the ticks and their labels.                                                                 |
| tickTextAnchor     | "end"   | string   | The textAnchor value for the tick's text.                                                                       |
| tickTextFontFamily | "Arial" | string   | The font for the ticks.                                                                                         |
| tickTextFontSize   | 10      | number   | The font size for the ticks.                                                                                    |
| tickTextFill       | black   | string   | The text fill color for the tick's text.                                                                        |
| tickTextDy         |         | number   | The y offset to the tick's text.                                                                                |
| tickTextDx         |         | number   | The x offset to the tick's text.                                                                                |
| hideAxisLine       | false   | bool     | If true, will hide the axis line.                                                                               |
| hideTicks          | false   | bool     | If true, will hide the ticks.                                                                                   |
| hideZero           | false   | bool     | If true, will hide '0' values.                                                                                  |
| className          |         | string   | The class name applied to the axis group element.                                                               |

## `<Axis.AxisRight/>`

|        Name        | Default |   Type   |                                                   Description                                                   |
|:------------------ |:------- |:-------- |:--------------------------------------------------------------------------------------------------------------- |
| scale              |         | function | A d3 [scale function](https://github.com/hshoff/vx/tree/master/packages/vx-scale).                              |
| top                |         | number   | A pixel value for the top margin.                                                                               |
| left               |         | number   | A pixel value for the top margin.                                                                               |
| stroke             |         | string   | The color for the stroke of the lines.                                                                          |
| strokeWidth        |         | number   | The pixel value for the width of the lines.                                                                     |
| strokeDasharray    |         | array    | The [pattern of dashes](https://mzl.la/1l7EiTQ) in the stroke.                                                  |
| label              |         | string   | The text for the axis label.                                                                                    |
| numTicks           | 10      | number   | The number of ticks wanted for the axis.                                                                        |
| tickFormat         |         | function | A [d3 formatter](https://github.com/d3/d3-scale/blob/master/README.md#continuous_tickFormat) for the tick text. |
| tickStroke         | black   | string   | The color for the tick's stroke value.                                                                          |
| tickK              | 1       | number   | A value that determines an offset in the tick position.                                                         |
| tickOffset         |         | number   | A value that determines the y offset in the tick position.                                                      |
| tickTransform      |         | string   | A custom SVG transform value to be applied to the ticks.                                                        |
| tickLength         | 8       | number   | The length of the tick lines.                                                                                   |
| tickPadding        | 2       | number   | The padding between the ticks and their labels.                                                                 |
| tickTextAnchor     | "start" | string   | The textAnchor value for the tick's text.                                                                       |
| tickTextFontFamily | "Arial" | string   | The font for the ticks.                                                                                         |
| tickTextFontSize   | 10      | number   | The font size for the ticks.                                                                                    |
| tickTextFill       | black   | string   | The text fill color for the tick's text.                                                                        |
| tickTextDy         |         | number   | The y offset to the tick's text.                                                                                |
| tickTextDx         |         | number   | The x offset to the tick's text.                                                                                |
| hideAxisLine       | false   | bool     | If true, will hide the axis line.                                                                               |
| hideTicks          | false   | bool     | If true, will hide the ticks.                                                                                   |
| hideZero           | false   | bool     | If true, will hide '0' values.                                                                                  |
| className          |         | string   | The class name applied to the axis group element.                                                               |

## `<Axis.Axis />`

|        Name        |     Default     |   Type   |                                                   Description                                                   |
|:------------------ |:--------------- |:-------- |:--------------------------------------------------------------------------------------------------------------- |
| scale              |                 | function | A d3 [scale function](https://github.com/hshoff/vx/tree/master/packages/vx-scale).                              |
| orient             |                 | string   | An orientation defined as 'top', 'bottom', 'left', or 'right'.                                                  |
| top                |                 | number   | A pixel value for the top margin.                                                                               |
| left               |                 | number   | A pixel value for the top margin.                                                                               |
| stroke             |                 | string   | The color for the stroke of the lines.                                                                          |
| strokeWidth        |                 | number   | The pixel value for the width of the lines.                                                                     |
| strokeDasharray    |                 | array    | The [pattern of dashes](https://mzl.la/1l7EiTQ) in the stroke.                                                  |
| label              | "default label" | string   | The text for the axis label.                                                                                    |
| numTicks           | 10              | number   | The number of ticks wanted for the axis.                                                                        |
| tickFormat         |                 | function | A [d3 formatter](https://github.com/d3/d3-scale/blob/master/README.md#continuous_tickFormat) for the tick text. |
| tickStroke         | black           | string   | The color for the tick's stroke value.                                                                          |
| tickK              | 1               | number   | A value that determines an offset in the tick position.                                                         |
| tickOffset         |                 | number   | A value that determines the y offset in the tick position.                                                      |
| tickTransform      |                 | string   | A custom SVG transform value to be applied to the ticks.                                                        |
| tickLength         | 8               | number   | The length of the tick lines.                                                                                   |
| tickPadding        | 2               | number   | The padding between the ticks and their labels.                                                                 |
| tickTextAnchor     | "start"         | string   | The textAnchor value for the tick's text.                                                                       |
| tickTextFontFamily | "Arial"         | string   | The font for the ticks.                                                                                         |
| tickTextFontSize   | 10              | number   | The font size for the ticks.                                                                                    |
| tickTextFill       | black           | string   | The text fill color for the tick's text.                                                                        |
| tickTextDy         |                 | number   | The y offset to the tick's text.                                                                                |
| tickTextDx         |                 | number   | The x offset to the tick's text.                                                                                |
| hideAxisLine       | false           | bool     | If true, will hide the axis line.                                                                               |
| hideTicks          | false           | bool     | If true, will hide the ticks.                                                                                   |
| hideZero           | false           | bool     | If true, will hide '0' values.                                                                                  |
| className          |                 | string   | The class name applied to the axis group element.                                                               |

## Source For Components

+ [`<Axis />`](https://github.com/hshoff/vx/blob/master/packages/vx-axis/src/axis/Axis.js)
+ [`<AxisLeft />`](https://github.com/hshoff/vx/blob/master/packages/vx-axis/src/axis/AxisLeft.js)
+ [`<AxisBottom />`](https://github.com/hshoff/vx/blob/master/packages/vx-axis/src/axis/AxisBottom.js)
+ [`<AxisTop />`](https://github.com/hshoff/vx/blob/master/packages/vx-axis/src/axis/AxisTop.js)
+ [`<AxisRight />`](https://github.com/hshoff/vx/blob/master/packages/vx-axis/src/axis/AxisRight.js)

## vx packages

- @vx/axis
- [@vx/curve](https://github.com/hshoff/vx/tree/master/packages/vx-curve)
- [@vx/demo](https://github.com/hshoff/vx/tree/master/packages/vx-demo)
- [@vx/glyph](https://github.com/hshoff/vx/tree/master/packages/vx-glyph)
- [@vx/grid](https://github.com/hshoff/vx/tree/master/packages/vx-grid)
- [@vx/group](https://github.com/hshoff/vx/tree/master/packages/vx-group)
- [@vx/marker](https://github.com/hshoff/vx/tree/master/packages/vx-marker)
- [@vx/mock-data](https://github.com/hshoff/vx/tree/master/packages/vx-mock-data)
- [@vx/point](https://github.com/hshoff/vx/tree/master/packages/vx-point)
- [@vx/responsive](https://github.com/hshoff/vx/tree/master/packages/vx-responsive)
- [@vx/scale](https://github.com/hshoff/vx/tree/master/packages/vx-scale)
- [@vx/shape](https://github.com/hshoff/vx/tree/master/packages/vx-shape)
