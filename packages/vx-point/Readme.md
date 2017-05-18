# @vx/point

A simple class to represent an x, y coordinate.

## Example Usage

```js
import { Point } from '@vx/point';

let point  = new Point({ x: 2, y: 3 });
let {x, y} = point.value()   // Get the cords from the point
let array  = point.toArray() // Convert point to array
```

## Methods

### `point.value()`

Returns an `{x, y}` object with the x and y coordinates.

### `point.toArray()`

Returns the coordinates as an array `[x, y]`.

## vx packages

- [@vx/axis](https://github.com/hshoff/vx/tree/master/packages/vx-axis)
- [@vx/curve](https://github.com/hshoff/vx/tree/master/packages/vx-curve)
- [@vx/demo](https://github.com/hshoff/vx/tree/master/packages/vx-demo)
- [@vx/glyph](https://github.com/hshoff/vx/tree/master/packages/vx-glyph)
- [@vx/grid](https://github.com/hshoff/vx/tree/master/packages/vx-grid)
- [@vx/group](https://github.com/hshoff/vx/tree/master/packages/vx-group)
- [@vx/marker](https://github.com/hshoff/vx/tree/master/packages/vx-marker)
- [@vx/mock-data](https://github.com/hshoff/vx/tree/master/packages/vx-mock-data)
- @vx/point
- [@vx/responsive](https://github.com/hshoff/vx/tree/master/packages/vx-responsive)
- [@vx/scale](https://github.com/hshoff/vx/tree/master/packages/vx-scale)
- [@vx/shape](https://github.com/hshoff/vx/tree/master/packages/vx-shape)
