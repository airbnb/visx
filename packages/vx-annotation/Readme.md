# @vx/annotation

**Status**

We recommend using [react-annotation](http://react-annotation.susielu.com/) by @susielu. This package is a work in progress. In the future we may make some helpers built on top of react-annotation.

```
npm install --save @vx/annotation
```

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

## Properties

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
