# @vx/grid

<a title="@vx/grid npm downloads" href="https://www.npmjs.com/package/@vx/grid">
  <img src="https://img.shields.io/npm/dm/@vx/grid.svg?style=flat-square" />
</a>

The `@vx/grid` package lets you create rows and columns. Or, you can use a `<Grid />` to get them both at once!

## Example

![grid example](http://i.imgur.com/KPmq4XV.png)

```js
import { Grid } from '@vx/grid';
// or
// import * as Grid from '@vx/grid';
// <Grid.Grid />

const grid = (
  <Grid
    xScale={xScale}
    yScale={yScale}
    width={xMax}
    height={yMax}
    numTicksRows={numTicksForHeight(height)}
    numTicksColumns={numTicksForWidth(width)}
  />
);
```
