# @vx/group

A Group is a container for other objects. It lets you pass in a top and left margin and a classname.

Example usage:

```js
import { Group } from '@vx/group';
const myGroup = (
  <Group top={50} left={20}>
    /* Children here */
  </Group>
)
```

## Properties

|   Name    | Default |  Type  |                     Description                     |
|:--------- |:------- |:------ |:--------------------------------------------------- |
| top       | 0       | number | Margin on top                                       |
| left      | 0       | number | Margin on left                                      |
| className |         | string | The class name associated with the svg `g` element. |

## Source For Components
+ [`<Group />`](https://github.com/hshoff/vx/blob/master/packages/vx-group/src/index.js)

## vx packages

- [@vx/axis](https://github.com/hshoff/vx/tree/master/packages/vx-axis)
- [@vx/curve](https://github.com/hshoff/vx/tree/master/packages/vx-curve)
- [@vx/demo](https://github.com/hshoff/vx/tree/master/packages/vx-demo)
- [@vx/glyph](https://github.com/hshoff/vx/tree/master/packages/vx-glyph)
- [@vx/grid](https://github.com/hshoff/vx/tree/master/packages/vx-grid)
- @vx/group
- [@vx/marker](https://github.com/hshoff/vx/tree/master/packages/vx-marker)
- [@vx/mock-data](https://github.com/hshoff/vx/tree/master/packages/vx-mock-data)
- [@vx/point](https://github.com/hshoff/vx/tree/master/packages/vx-point)
- [@vx/responsive](https://github.com/hshoff/vx/tree/master/packages/vx-responsive)
- [@vx/scale](https://github.com/hshoff/vx/tree/master/packages/vx-scale)
- [@vx/shape](https://github.com/hshoff/vx/tree/master/packages/vx-shape)
