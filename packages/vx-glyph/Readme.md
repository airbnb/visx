# @vx/glyph

Glyphs are small icons that you can use in your graphs. Some elements, like `LinePath`, can take a function that returns a glyph.

For example:
```js
import { LinePath } from '@vx/shape';
import { Dot } from '@vx/glyph';

let line = (
  <LinePath
    ...
    glyph={(d, i) => {
      return (
        <Dot
          className={"glyph-dots"}
          key={'line-dot-{i}'}
          cx={xScale(x(d))}
          cy={yScale(y(d))}
          r={6}
          fill={"white"}
          stroke={"black"}
          strokeWidth={3} />
      )
    }}
  />
)
```

You also can incorporate child elements into your glyph to add labels and such.

```js
import { Dot } from '@vx/glyph';

<Dot ... >
  <text
    x={xScale(x(d))}
    y={yScale(y(d))}
    dx={10}
    fill={"white"}
    stroke={"black"}
    strokeWidth={6}
    fontSize={11}
  >
    {"Hi there!"}
  </text>
</Dot>
```

## `Glyph.Dot`

|      Name       | Default |  Type  |                    Description                    |
|:--------------- |:------- |:------ |:------------------------------------------------- |
| top             | 0       | number | Margin on top                                     |
| left            | 0       | number | Margin on left                                    |
| className       |         | string | The class name associated of the LinePath shape   |
| cx              |         | number | The x-axis coordinate at the center of the circle |
| cy              |         | number | The y-axis coordinate at the center of the circle |
| r               |         | number | The radius of the circle                          |
| fill            |         | string | The color of the circle's fill                    |
| stroke          |         | string | The color of the circle's stroke                  |
| strokeWidth     |         | number | The width of the circle's stroke                  |
| strokeDasharray |         | array  | An array that controls the pattern of dashes in the stroke. [See more here.](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray)                                                  |

## vx packages

- [@vx/axis](https://github.com/hshoff/vx/tree/master/packages/vx-axis)
- [@vx/curve](https://github.com/hshoff/vx/tree/master/packages/vx-curve)
- [@vx/demo](https://github.com/hshoff/vx/tree/master/packages/vx-demo)
- @vx/glyph
- [@vx/grid](https://github.com/hshoff/vx/tree/master/packages/vx-grid)
- [@vx/group](https://github.com/hshoff/vx/tree/master/packages/vx-group)
- [@vx/marker](https://github.com/hshoff/vx/tree/master/packages/vx-marker)
- [@vx/mock-data](https://github.com/hshoff/vx/tree/master/packages/vx-mock-data)
- [@vx/point](https://github.com/hshoff/vx/tree/master/packages/vx-point)
- [@vx/responsive](https://github.com/hshoff/vx/tree/master/packages/vx-responsive)
- [@vx/scale](https://github.com/hshoff/vx/tree/master/packages/vx-scale)
- [@vx/shape](https://github.com/hshoff/vx/tree/master/packages/vx-shape)
