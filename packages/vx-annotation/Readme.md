# @vx/annotation


## LinePathAnnotation

Line Path Annotations add a bit of text and a line coming from a point. They're useful for adding info to your graphs.

``` javascript
import { LinePathAnnotation } from '@vx/annotation';
// or
// import * as Annotation from '@vx/annotation'; 
// <Annotation.LinePathAnnotation />

const annotation = (
  <LinePathAnnotation
    label={'expected from deploy'}
    stroke={'white'}
    labelFill={'white'}
    labelStroke={'none'}
    labelStrokeWidth={2}
    points={[
      annotationPoint,
      new Point({
        x: annotationPoint.x + (width / allData.length),
        y: annotationPoint.y - (height / allData.length),
      })
    ]}
  />
);
```

![image output](http://i.imgur.com/o5jnHFS.png)

# Properties

|         Name         |  Default   |  Type  |                                              Description                                               |
|:-------------------- |:---------- |:------ |:------------------------------------------------------------------------------------------------------ |
| top                  | 0          | number | Margin on top                                                                                          |
| left                 | 0          | number | Margin on left                                                                                         |
| points               |            | array  | Points describing the line path                                                                        |
| stroke               | black      | string | The color of the line                                                                                  |
| strokeWidth          | 1          | number | The pixel width of the line                                                                            |
| className            |            | string | The class name associated of the LinePath shape                                                        |
| label                |            | string | The text for your label                                                                                |
| labelAnchor          | left       | string | The label's textAnchor                                                                                 |
| labelDx              | 0          | number | The x-coordinate shift to the label                                                                    |
| labelDy              | 0          | number | The y-coordinate shift to the label                                                                    |
| labelFill            | <stroke>   | string | The color of label. Defaults to the stroke color                                                       |
| labelFontSize        | 10         | number | The font size of the label text                                                                        |
| labelStroke          | white      | string | The color of the label                                                                                 |
| labelStrokeWidth     | 3          | number | The stroke width of the label text                                                                     |
| labelPaintOrder      | stroke     | string | The label's SVG [paint-order](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/paint-order). |


## vx packages

- @vx/annotation
- [@vx/axis](https://github.com/hshoff/vx/tree/master/packages/vx-axis)
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
