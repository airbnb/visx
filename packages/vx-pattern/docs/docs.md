# @vx/pattern

<a title="@vx/pattern npm downloads" href="https://www.npmjs.com/package/@vx/pattern">
  <img src="https://img.shields.io/npm/dm/@vx/pattern.svg?style=flat-square" />
</a>

Inspired by: http://riccardoscalco.github.io/textures/

## Example

```js
import { AreaClosed } from '@vx/shape';
import { PatternLines } from '@vx/pattern';

const PatternArea = () => {
  return (
    <svg>
      <PatternLines
        id="lines"
        height={5}
        width={5}
        stroke={'black'}
        strokeWidth={1}
        orientation={['diagonal']}
      />
      <AreaClosed fill="url('#lines')" />
    </svg>
  );
};
```

## The Definition Caveat

Like gradients, patterns are "defined." When you put down a `<PatternXYZ />`, it's putting a [`<pattern/>`](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Patterns) attribute in the SVG.

It's often better to think of these as variable definitions rather than true DOM elements. When you use `fill="url('#pattern')"` you're referencing the pattern's id: `pattern`.

## Pre-Made Patterns

### `PatternsCircles`

![circles example](http://i.imgur.com/jd9YGJi.png)

```js
<PatternCircles id="circles" height={6} width={6} stroke={'black'} strokeWidth={1} />
```

### `PatternsHexagons`

![hexagon example](http://i.imgur.com/3EL1Lza.png)

```js
<PatternHexagons id="hexagons" height={3} size={8} stroke={'red'} strokeWidth={1} />
```

### `PatternsLines`

![lines example](http://i.imgur.com/E3cTmLZ.png)

```js
<PatternLines
  id="lines"
  height={5}
  width={5}
  stroke={'black'}
  strokeWidth={1}
  orientation={['diagonal']}
/>
```

### `PatternsWaves`

![waves example](http://i.imgur.com/4fdwbhv.png)

```js
<PatternWaves id="waves" height={4} width={4} stroke={'blue'} strokeWidth={1} />
```


## Installation

```
npm install --save @vx/pattern
```


## Components



  - [Circles](#circles-)
  - [Hexagons](#hexagons-)
  - [Lines](#lines-)
  - [Path](#path-)
  - [Pattern](#pattern-)
  - [Waves](#waves-)

## API



### &lt;Circles /&gt;


<a name="Circles__background" href="#Circles__background">#</a> *Circles*.**background**&lt;string&gt;  

<a name="Circles__className" href="#Circles__className">#</a> *Circles*.**className**&lt;string&gt;  

<a name="Circles__complement" href="#Circles__complement">#</a> *Circles*.**complement**&lt;bool&gt;  <table><tr><td><strong>Default</strong></td><td>false</td></td></table>

<a name="Circles__fill" href="#Circles__fill">#</a> *Circles*.**fill**&lt;string&gt;  

<a name="Circles__height" href="#Circles__height">#</a> *Circles*.**height**&lt;number&gt; `required` 

<a name="Circles__id" href="#Circles__id">#</a> *Circles*.**id**&lt;string&gt; `required` 

<a name="Circles__radius" href="#Circles__radius">#</a> *Circles*.**radius**&lt;number&gt;  <table><tr><td><strong>Default</strong></td><td>2</td></td></table>

<a name="Circles__stroke" href="#Circles__stroke">#</a> *Circles*.**stroke**&lt;string&gt;  

<a name="Circles__strokeDasharray" href="#Circles__strokeDasharray">#</a> *Circles*.**strokeDasharray**&lt;string&gt;  

<a name="Circles__strokeWidth" href="#Circles__strokeWidth">#</a> *Circles*.**strokeWidth**&lt;number&gt;  

<a name="Circles__width" href="#Circles__width">#</a> *Circles*.**width**&lt;number&gt; `required` 

### &lt;Hexagons /&gt;


<a name="Hexagons__background" href="#Hexagons__background">#</a> *Hexagons*.**background**&lt;string&gt;  

<a name="Hexagons__className" href="#Hexagons__className">#</a> *Hexagons*.**className**&lt;string&gt;  

<a name="Hexagons__fill" href="#Hexagons__fill">#</a> *Hexagons*.**fill**&lt;string&gt;  

<a name="Hexagons__height" href="#Hexagons__height">#</a> *Hexagons*.**height**&lt;number&gt; `required` 

<a name="Hexagons__id" href="#Hexagons__id">#</a> *Hexagons*.**id**&lt;string&gt; `required` 

<a name="Hexagons__shapeRendering" href="#Hexagons__shapeRendering">#</a> *Hexagons*.**shapeRendering**&lt;string&gt;  

<a name="Hexagons__size" href="#Hexagons__size">#</a> *Hexagons*.**size**&lt;number&gt;  <table><tr><td><strong>Default</strong></td><td>3</td></td></table>

<a name="Hexagons__stroke" href="#Hexagons__stroke">#</a> *Hexagons*.**stroke**&lt;string&gt;  

<a name="Hexagons__strokeDasharray" href="#Hexagons__strokeDasharray">#</a> *Hexagons*.**strokeDasharray**&lt;string&gt;  

<a name="Hexagons__strokeLinecap" href="#Hexagons__strokeLinecap">#</a> *Hexagons*.**strokeLinecap**&lt;string&gt;  

<a name="Hexagons__strokeWidth" href="#Hexagons__strokeWidth">#</a> *Hexagons*.**strokeWidth**&lt;number&gt;  

<a name="Hexagons__width" href="#Hexagons__width">#</a> *Hexagons*.**width**&lt;number&gt; `required` 

### &lt;Lines /&gt;


<a name="Lines__background" href="#Lines__background">#</a> *Lines*.**background**&lt;string&gt;  

<a name="Lines__className" href="#Lines__className">#</a> *Lines*.**className**&lt;string&gt;  

<a name="Lines__height" href="#Lines__height">#</a> *Lines*.**height**&lt;number&gt; `required` 

<a name="Lines__id" href="#Lines__id">#</a> *Lines*.**id**&lt;string&gt; `required` 

<a name="Lines__orientation" href="#Lines__orientation">#</a> *Lines*.**orientation**&lt;array&gt;  <table><tr><td><strong>Default</strong></td><td>['vertical']</td></td></table>

<a name="Lines__shapeRendering" href="#Lines__shapeRendering">#</a> *Lines*.**shapeRendering**&lt;string&gt;  <table><tr><td><strong>Default</strong></td><td>'auto'</td></td></table>

<a name="Lines__stroke" href="#Lines__stroke">#</a> *Lines*.**stroke**&lt;string&gt; `required` 

<a name="Lines__strokeDasharray" href="#Lines__strokeDasharray">#</a> *Lines*.**strokeDasharray**&lt;string&gt;  

<a name="Lines__strokeLinecap" href="#Lines__strokeLinecap">#</a> *Lines*.**strokeLinecap**&lt;string&gt;  <table><tr><td><strong>Default</strong></td><td>'square'</td></td></table>

<a name="Lines__strokeWidth" href="#Lines__strokeWidth">#</a> *Lines*.**strokeWidth**&lt;number&gt; `required` 

<a name="Lines__width" href="#Lines__width">#</a> *Lines*.**width**&lt;number&gt; `required` 

### &lt;Path /&gt;


<a name="Path__background" href="#Path__background">#</a> *Path*.**background**&lt;string&gt;  

<a name="Path__className" href="#Path__className">#</a> *Path*.**className**&lt;string&gt;  

<a name="Path__fill" href="#Path__fill">#</a> *Path*.**fill**&lt;string&gt;  <table><tr><td><strong>Default</strong></td><td>'transparent'</td></td></table>

<a name="Path__height" href="#Path__height">#</a> *Path*.**height**&lt;number&gt; `required` 

<a name="Path__id" href="#Path__id">#</a> *Path*.**id**&lt;string&gt; `required` 

<a name="Path__path" href="#Path__path">#</a> *Path*.**path**&lt;string&gt;  

<a name="Path__shapeRendering" href="#Path__shapeRendering">#</a> *Path*.**shapeRendering**&lt;string&gt;  <table><tr><td><strong>Default</strong></td><td>'auto'</td></td></table>

<a name="Path__stroke" href="#Path__stroke">#</a> *Path*.**stroke**&lt;string&gt;  

<a name="Path__strokeDasharray" href="#Path__strokeDasharray">#</a> *Path*.**strokeDasharray**&lt;string&gt;  

<a name="Path__strokeLinecap" href="#Path__strokeLinecap">#</a> *Path*.**strokeLinecap**&lt;string&gt;  <table><tr><td><strong>Default</strong></td><td>'square'</td></td></table>

<a name="Path__strokeWidth" href="#Path__strokeWidth">#</a> *Path*.**strokeWidth**&lt;number&gt;  

<a name="Path__width" href="#Path__width">#</a> *Path*.**width**&lt;number&gt; `required` 

### &lt;Pattern /&gt;


<a name="Pattern__children" href="#Pattern__children">#</a> *Pattern*.**children**&lt;union(arrayOf|node)&gt; `required` 

<a name="Pattern__height" href="#Pattern__height">#</a> *Pattern*.**height**&lt;number&gt; `required` 

<a name="Pattern__id" href="#Pattern__id">#</a> *Pattern*.**id**&lt;string&gt; `required` 

<a name="Pattern__width" href="#Pattern__width">#</a> *Pattern*.**width**&lt;number&gt; `required` 

### &lt;Waves /&gt;


<a name="Waves__background" href="#Waves__background">#</a> *Waves*.**background**&lt;string&gt;  

<a name="Waves__className" href="#Waves__className">#</a> *Waves*.**className**&lt;string&gt;  

<a name="Waves__fill" href="#Waves__fill">#</a> *Waves*.**fill**&lt;string&gt;  

<a name="Waves__height" href="#Waves__height">#</a> *Waves*.**height**&lt;number&gt; `required` 

<a name="Waves__id" href="#Waves__id">#</a> *Waves*.**id**&lt;string&gt; `required` 

<a name="Waves__shapeRendering" href="#Waves__shapeRendering">#</a> *Waves*.**shapeRendering**&lt;string&gt;  

<a name="Waves__stroke" href="#Waves__stroke">#</a> *Waves*.**stroke**&lt;string&gt;  

<a name="Waves__strokeDasharray" href="#Waves__strokeDasharray">#</a> *Waves*.**strokeDasharray**&lt;string&gt;  

<a name="Waves__strokeLinecap" href="#Waves__strokeLinecap">#</a> *Waves*.**strokeLinecap**&lt;string&gt;  

<a name="Waves__strokeWidth" href="#Waves__strokeWidth">#</a> *Waves*.**strokeWidth**&lt;number&gt;  

<a name="Waves__width" href="#Waves__width">#</a> *Waves*.**width**&lt;number&gt; `required` 
