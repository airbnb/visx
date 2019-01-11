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


## Installation

```
npm install --save @vx/glyph
```


## Components



  - [Glyph](#glyph-)
  - [GlyphCircle](#glyphcircle-)
  - [GlyphCross](#glyphcross-)
  - [GlyphDiamond](#glyphdiamond-)
  - [GlyphDot](#glyphdot-)
  - [GlyphSquare](#glyphsquare-)
  - [GlyphStar](#glyphstar-)
  - [GlyphTriangle](#glyphtriangle-)
  - [GlyphWye](#glyphwye-)

## API



<h3 id="glyph-">&lt;Glyph /&gt;</h3>



<a id="#Glyph__children" name="Glyph__children" href="#Glyph__children">#</a> *Glyph*.**children**&lt;any&gt;  

<a id="#Glyph__className" name="Glyph__className" href="#Glyph__className">#</a> *Glyph*.**className**&lt;string&gt;  

<a id="#Glyph__left" name="Glyph__left" href="#Glyph__left">#</a> *Glyph*.**left**&lt;number&gt;  <table><tr><td><strong>Default</strong></td><td>0</td></td></table>

<a id="#Glyph__top" name="Glyph__top" href="#Glyph__top">#</a> *Glyph*.**top**&lt;number&gt;  <table><tr><td><strong>Default</strong></td><td>0</td></td></table>

<h3 id="glyphcircle-">&lt;GlyphCircle /&gt;</h3>



<a id="#GlyphCircle__children" name="GlyphCircle__children" href="#GlyphCircle__children">#</a> *GlyphCircle*.**children**&lt;func&gt;  

<a id="#GlyphCircle__className" name="GlyphCircle__className" href="#GlyphCircle__className">#</a> *GlyphCircle*.**className**&lt;string&gt;  

<a id="#GlyphCircle__left" name="GlyphCircle__left" href="#GlyphCircle__left">#</a> *GlyphCircle*.**left**&lt;number&gt;  

<a id="#GlyphCircle__size" name="GlyphCircle__size" href="#GlyphCircle__size">#</a> *GlyphCircle*.**size**&lt;union(number|func)&gt;  

<a id="#GlyphCircle__top" name="GlyphCircle__top" href="#GlyphCircle__top">#</a> *GlyphCircle*.**top**&lt;number&gt;  

<h3 id="glyphcross-">&lt;GlyphCross /&gt;</h3>



<a id="#GlyphCross__children" name="GlyphCross__children" href="#GlyphCross__children">#</a> *GlyphCross*.**children**&lt;func&gt;  

<a id="#GlyphCross__className" name="GlyphCross__className" href="#GlyphCross__className">#</a> *GlyphCross*.**className**&lt;string&gt;  

<a id="#GlyphCross__left" name="GlyphCross__left" href="#GlyphCross__left">#</a> *GlyphCross*.**left**&lt;number&gt;  

<a id="#GlyphCross__size" name="GlyphCross__size" href="#GlyphCross__size">#</a> *GlyphCross*.**size**&lt;union(number|func)&gt;  

<a id="#GlyphCross__top" name="GlyphCross__top" href="#GlyphCross__top">#</a> *GlyphCross*.**top**&lt;number&gt;  

<h3 id="glyphdiamond-">&lt;GlyphDiamond /&gt;</h3>



<a id="#GlyphDiamond__children" name="GlyphDiamond__children" href="#GlyphDiamond__children">#</a> *GlyphDiamond*.**children**&lt;func&gt;  

<a id="#GlyphDiamond__className" name="GlyphDiamond__className" href="#GlyphDiamond__className">#</a> *GlyphDiamond*.**className**&lt;string&gt;  

<a id="#GlyphDiamond__left" name="GlyphDiamond__left" href="#GlyphDiamond__left">#</a> *GlyphDiamond*.**left**&lt;number&gt;  

<a id="#GlyphDiamond__size" name="GlyphDiamond__size" href="#GlyphDiamond__size">#</a> *GlyphDiamond*.**size**&lt;union(number|func)&gt;  

<a id="#GlyphDiamond__top" name="GlyphDiamond__top" href="#GlyphDiamond__top">#</a> *GlyphDiamond*.**top**&lt;number&gt;  

<h3 id="glyphdot-">&lt;GlyphDot /&gt;</h3>



<a id="#GlyphDot__children" name="GlyphDot__children" href="#GlyphDot__children">#</a> *GlyphDot*.**children**&lt;func&gt;  

<a id="#GlyphDot__className" name="GlyphDot__className" href="#GlyphDot__className">#</a> *GlyphDot*.**className**&lt;string&gt;  

<a id="#GlyphDot__left" name="GlyphDot__left" href="#GlyphDot__left">#</a> *GlyphDot*.**left**&lt;number&gt;  <table><tr><td><strong>Default</strong></td><td>0</td></td></table>

<a id="#GlyphDot__top" name="GlyphDot__top" href="#GlyphDot__top">#</a> *GlyphDot*.**top**&lt;number&gt;  <table><tr><td><strong>Default</strong></td><td>0</td></td></table>

<h3 id="glyphsquare-">&lt;GlyphSquare /&gt;</h3>



<a id="#GlyphSquare__children" name="GlyphSquare__children" href="#GlyphSquare__children">#</a> *GlyphSquare*.**children**&lt;func&gt;  

<a id="#GlyphSquare__className" name="GlyphSquare__className" href="#GlyphSquare__className">#</a> *GlyphSquare*.**className**&lt;string&gt;  

<a id="#GlyphSquare__left" name="GlyphSquare__left" href="#GlyphSquare__left">#</a> *GlyphSquare*.**left**&lt;number&gt;  

<a id="#GlyphSquare__size" name="GlyphSquare__size" href="#GlyphSquare__size">#</a> *GlyphSquare*.**size**&lt;union(number|func)&gt;  

<a id="#GlyphSquare__top" name="GlyphSquare__top" href="#GlyphSquare__top">#</a> *GlyphSquare*.**top**&lt;number&gt;  

<h3 id="glyphstar-">&lt;GlyphStar /&gt;</h3>



<a id="#GlyphStar__children" name="GlyphStar__children" href="#GlyphStar__children">#</a> *GlyphStar*.**children**&lt;func&gt;  

<a id="#GlyphStar__className" name="GlyphStar__className" href="#GlyphStar__className">#</a> *GlyphStar*.**className**&lt;string&gt;  

<a id="#GlyphStar__left" name="GlyphStar__left" href="#GlyphStar__left">#</a> *GlyphStar*.**left**&lt;number&gt;  

<a id="#GlyphStar__size" name="GlyphStar__size" href="#GlyphStar__size">#</a> *GlyphStar*.**size**&lt;union(number|func)&gt;  

<a id="#GlyphStar__top" name="GlyphStar__top" href="#GlyphStar__top">#</a> *GlyphStar*.**top**&lt;number&gt;  

<h3 id="glyphtriangle-">&lt;GlyphTriangle /&gt;</h3>



<a id="#GlyphTriangle__children" name="GlyphTriangle__children" href="#GlyphTriangle__children">#</a> *GlyphTriangle*.**children**&lt;func&gt;  

<a id="#GlyphTriangle__className" name="GlyphTriangle__className" href="#GlyphTriangle__className">#</a> *GlyphTriangle*.**className**&lt;string&gt;  

<a id="#GlyphTriangle__left" name="GlyphTriangle__left" href="#GlyphTriangle__left">#</a> *GlyphTriangle*.**left**&lt;number&gt;  

<a id="#GlyphTriangle__size" name="GlyphTriangle__size" href="#GlyphTriangle__size">#</a> *GlyphTriangle*.**size**&lt;union(number|func)&gt;  

<a id="#GlyphTriangle__top" name="GlyphTriangle__top" href="#GlyphTriangle__top">#</a> *GlyphTriangle*.**top**&lt;number&gt;  

<h3 id="glyphwye-">&lt;GlyphWye /&gt;</h3>



<a id="#GlyphWye__children" name="GlyphWye__children" href="#GlyphWye__children">#</a> *GlyphWye*.**children**&lt;func&gt;  

<a id="#GlyphWye__className" name="GlyphWye__className" href="#GlyphWye__className">#</a> *GlyphWye*.**className**&lt;string&gt;  

<a id="#GlyphWye__left" name="GlyphWye__left" href="#GlyphWye__left">#</a> *GlyphWye*.**left**&lt;number&gt;  

<a id="#GlyphWye__size" name="GlyphWye__size" href="#GlyphWye__size">#</a> *GlyphWye*.**size**&lt;union(number|func)&gt;  

<a id="#GlyphWye__top" name="GlyphWye__top" href="#GlyphWye__top">#</a> *GlyphWye*.**top**&lt;number&gt;  
