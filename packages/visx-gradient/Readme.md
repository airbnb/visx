# @visx/gradient

<a title="@visx/gradient npm downloads" href="https://www.npmjs.com/package/@visx/gradient">
  <img src="https://img.shields.io/npm/dm/@visx/gradient.svg?style=flat-square" />
</a>

Inspired by: https://dribbble.com/shots/3380672-Sketch-Gradients-Freebie

## Example

```js
import { AreaClosed } from '@visx/shape';
import { GradientPinkBlue } from '@visx/gradient';

const GradientArea = () => {
  return (
    <svg>
      <GradientPinkBlue id="gradient" />
      <AreaClosed fill="url('#gradient')" />
    </svg>
  );
};
```

## The Definition Caveat

Like patterns, gradients are "defined." When you render `<GradientPinkBlue />`, it's rendering a
[`<linearGradient/>`](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/linearGradient)
element inside a `<def>` in the SVG.

It's often better to think of these as variable definitions rather than true DOM elements. When you
use `fill="url('#gradient')"` you're referencing the gradient's id: `gradient`.

## Make your own!

In addition to the preset linear gradients, you can make any linear or radial gradient like so:

```js
import { LinearGradient, RadialGradient } from '@visx/gradient';

<LinearGradient from="#a18cd1" to="#fbc2eb" />;
<RadialGradient from="#a18cd1" to="#fbc2eb" />;
```

## Installation

```
npm install --save @visx/gradient
```
