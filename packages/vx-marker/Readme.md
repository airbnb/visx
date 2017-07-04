# @vx/marker

```
npm install --save @vx/marker
```

A Marker is a line with a piece of text attached to it. It's great for highlighting locations in your graph.  

## Example

![marker example](http://i.imgur.com/vbW3Ysa.png)

``` js
<Marker
  from={markerFrom}
  to={markerTo}
  stroke={'white'}
  label={'deploy'}
  labelStroke={'none'}
  labelDx={6}
  labelDy={15}
/>
```

## Properties

|       Name       | Default  |  Type  |                                              Description                                               |
|:---------------- |:-------- |:------ |:------------------------------------------------------------------------------------------------------ |
| top              | 0        | number | The margin on top.                                                                                     |
| left             | 0        | number | The margin on the left.                                                                                |
| from             |          | point  | The start point for the line.                                                                          |
| to               |          | point  | The end point for the line.                                                                            |
| stroke           | magenta  | string | The color of the stroke for the line.                                                                  |
| strokeWidth      | 2        | number | The width of the stroke for the line.                                                                  |
| strokeDasharray  |          | array  | The [pattern of dashes](https://mzl.la/1l7EiTQ) in the stroke.                                         |
| fill             |          | string | The color for the fill of the line.                                                                    |
| transform        |          | string | An [SVG transform](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/transform).              |
| label            |          | string | The text for the label.                                                                                |
| labelAnchor      | left     | string | The label's `textAnchor`                                                                               |
| labelDx          | 0        | number | The x-coordinate shift to the label.                                                                   |
| labelDy          | 0        | number | The y-coordinate shift to the label.                                                                   |
| labelFill        | <stroke> | string | The fill color for the label.                                                                          |
| labelFontSize    | 10       | number | The font size for the label text.                                                                      |
| labelStroke      | white    | string | The color for the label's stroke.                                                                      |
| labelStrokeWidth | 3        | number | The width of the label's stroke.                                                                       |
| labelPaintOrder  | stroke   | string | The label's SVG [paint-order](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/paint-order). |
| className        |          | string | The class name for the line.                                                                           |

## Source For Components

+ [`<Marker />`](https://github.com/hshoff/vx/blob/master/packages/vx-marker/src/markers/Marker.js)
