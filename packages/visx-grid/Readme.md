# @visx/grid

<a title="@visx/grid npm downloads" href="https://www.npmjs.com/package/@visx/grid">
  <img src="https://img.shields.io/npm/dm/@visx/grid.svg?style=flat-square" />
</a>

The `@visx/grid` package lets you create gridlines for charts. `<GridRows />` render horizontally,
`<GridColumns />` render vertically, or you can use a `<Grid />` to get them both at once!

## Usage

```js
import { Grid } from '@visx/grid';
// or
// import * as Grid from '@visx/grid';
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
npm install --save @visx/grid
```
