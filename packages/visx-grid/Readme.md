# @vx/grid

<a title="@vx/grid npm downloads" href="https://www.npmjs.com/package/@vx/grid">
  <img src="https://img.shields.io/npm/dm/@vx/grid.svg?style=flat-square" />
</a>

The `@vx/grid` package lets you create gridlines for charts. `<GridRows />` render horizontally,
`<GridColumns />` render vertically, or you can use a `<Grid />` to get them both at once!

## Usage

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

## Installation

```
npm install --save @vx/grid
```
