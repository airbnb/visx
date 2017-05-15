# @vx/gradient

Inspired by: https://dribbble.com/shots/3380672-Sketch-Gradients-Freebie

## Example

```js
import Shape from '@vx/shape';
import Gradient from '@vx/gradient';

const GradientArea = () => {
    return (
      <svg>
        <Gradient.PinkBlue id="gradient" />
        <Shape.AreaClose fill="url('#gradient')" />
      </svg>
    );
}
```

## The Definition Caveat

Like patterns, gradients are "defined." When you put down a `<Gradient.XYZ />`, it's putting a [`<linearGradient/>`](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/linearGradient) attribute in the SVG.

It's often better to think of these as variable definitions rather than true DOM elements. When you use `fill="url('#gradient')"` you're referencing the gradient's id: `gradient`.


## Premades
Vx comes with a couple pre-made gradients for you to use.

|    Gradients Available     |
| -------------------------- |
| `Gradient.DarkgreenGreen`  |
| `Gradient.LightgreenGreen` |
| `Gradient.OrangeRed`       |
| `Gradient.PinkBlue`        |
| `Gradient.PinkRed`         |
| `Gradient.PurpleOrange`    |
| `Gradient.PurpleTeal`      |
| `Gradient.SteelPurple`     |
| `Gradient.TealBlue`        |


## Make your own!

You can make any linear gradient like so:

``` js
<Gradient.LinearGradient
  from='#a18cd1'
  to='#fbc2eb'
/>
```
