# @vx/curve

## Overview

A curve is a function that can be passed into other vx objects, mainly a LinePath to change the way the line is structured.

For example, checkout the difference between a `Curve.natural`:

![natural curve](https://raw.githubusercontent.com/d3/d3-shape/master/img/natural.png)

and a `Curve.step`:

![step curve](https://raw.githubusercontent.com/d3/d3-shape/master/img/step.png)

The `@vx/curve` package is a wrapper over [d3-shape](https://github.com/d3/d3-shape) curve functions.

Any function with the prefix `curve` in d3 can be used through `vx` like so:

``` javascript
import Curve from `@vx/curve`

let curve = Curve.catmullRomOpen //Corresponds to `d3.curveCatmullRomOpen`

let line = (<Shape.LinePath curve={curve} />)
```

## Functions

|        vx        |                                      d3                                       |
| ---------------- | ----------------------------------------------------------------------------- |
| basis            | [curveBasis](https://github.com/d3/d3-shape#curveBasis)                       |
| basisClose       | [curveBasisClosed](https://github.com/d3/d3-shape#curveBasisClosed)           |
| basisOpen        | [curveBasisOpen](https://github.com/d3/d3-shape#curveBasisOpen)               |
| step             | [curveStep](https://github.com/d3/d3-shape#curveStep)                         |
| stepAfter        | [curveStepAfter](https://github.com/d3/d3-shape#curveStepAfter)               |
| stepBefore       | [curveStepbefore](https://github.com/d3/d3-shape#curveStepBefore)             |
| bundle           | [curveBundle](https://github.com/d3/d3-shape#curveBundle)                     |
| linear           | [curveLinear](https://github.com/d3/d3-shape#curveLinear)                     |
| linearClosed     | [curveLinearClosed](https://github.com/d3/d3-shape#curveLinearClosed)         |
| monotoneX        | [curveMonotoneX](https://github.com/d3/d3-shape#curveMonotoneX)               |
| monotoneY        | [curveMonotoneY](https://github.com/d3/d3-shape#curveMonotoneY)               |
| cardinal         | [curveCardinal](https://github.com/d3/d3-shape#curveCardinal)                 |
| cardinalClosed   | [curveCardinalClosed](https://github.com/d3/d3-shape#curveCardinalClosed)     |
| cardinalOpen     | [curveCardinalOpen](https://github.com/d3/d3-shape#curveCardinalOpen)         |
| catmullRom       | [curveCatmullRom](https://github.com/d3/d3-shape#curveCatmullRom)             |
| catmullRomClosed | [curveCatmullRomClosed](https://github.com/d3/d3-shape#curveCatmullRomClosed) |
| catmullRomOpen   | [curveCatmullRomOpen](https://github.com/d3/d3-shape#curveCatmullRomOpen)     |
| natural          | [curveNatural](https://github.com/d3/d3-shape#curveNatural)                   |

## vx packages

- [@vx/axis](https://github.com/hshoff/vx/tree/master/packages/vx-axis)
- @vx/curve
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
