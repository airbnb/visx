# @vx/pattern

Inspired by: http://riccardoscalco.github.io/textures/

## Example

``` js
import Shape from '@vx/shape';
import Pattern from '@vx/pattern';

const PatternArea = () => {
    return (
      <svg>
        <Pattern.Lines
          id="lines"
          height={5}
          width={5}
          stroke={'black'}
          strokeWidth={1}
          orientation={['diagonal']}
        />
        <Shape.AreaClose fill="url('#lines')" />
      </svg>
    );
};
```

## The Definition Caveat

Like gradients, patterns are "defined." When you put down a `<Pattern.XYZ />`, it's putting a [`<pattern/>`](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Patterns) attribute in the SVG.

It's often better to think of these as variable definitions rather than true DOM elements. When you use `fill="url('#pattern')"` you're referencing the pattern's id: `pattern`.


## Pre-Made Patterns

### `Patterns.Circles`

![circles example](http://i.imgur.com/jd9YGJi.png)

``` js
<Pattern.Circles
  id="circles"
  height={6}
  width={6}
  stroke={'black'}
  strokeWidth={1}
/>
```

### `Patterns.Hexagons`

![hexagon example](http://i.imgur.com/3EL1Lza.png)

``` js
<Pattern.Hexagons
  id="hexagons"
  height={3}
  size={8}
  stroke={'red'}
  strokeWidth={1}
/>
```

### `Patterns.Lines`

![lines example](http://i.imgur.com/E3cTmLZ.png)

``` js
<Pattern.Lines
  id="lines"
  height={5}
  width={5}
  stroke={'black'}
  strokeWidth={1}
  orientation={['diagonal']}
/>
```

### `Patterns.Waves`

![waves example](http://i.imgur.com/4fdwbhv.png)

``` js
<Pattern.Waves
  id="waves"
  height={4}
  width={4}
  stroke={'blue'}
  strokeWidth={1}
/>
```

## Source For Components

+ [`<Pattern.Circles />`](https://github.com/hshoff/vx/blob/master/packages/vx-pattern/src/patterns/Circles.js)
+ [`<Pattern.Hexagons />`](https://github.com/hshoff/vx/blob/master/packages/vx-pattern/src/patterns/Hexagons.js)
+ [`<Pattern.Lines />`](https://github.com/hshoff/vx/blob/master/packages/vx-pattern/src/patterns/Lines.js)
+ [`<Pattern.Path />`](https://github.com/hshoff/vx/blob/master/packages/vx-pattern/src/patterns/Path.js)
+ [`<Pattern.Pattern />`](https://github.com/hshoff/vx/blob/master/packages/vx-pattern/src/patterns/Pattern.js)
+ [`<Pattern.Path />`](https://github.com/hshoff/vx/blob/master/packages/vx-pattern/src/patterns/Waves.js)
