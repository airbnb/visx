# @vx/glyph

<a title="@vx/glyph npm downloads" href="https://www.npmjs.com/package/@vx/glyph">
  <img src="https://img.shields.io/npm/dm/@vx/glyph.svg?style=flat-square" />
</a>

Glyphs are small icons that you can use in your graphs. Some elements, like `LinePath`, can take a function that returns a glyph.

For example:

```js
import { LinePath } from '@vx/shape';
import { GlyphDot } from '@vx/glyph';

let line = (
  <LinePath
    ...
    glyph={(d, i) => {
      return (
        <GlyphDot
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

<GlyphDot ... >
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
</GlyphDot>
```
