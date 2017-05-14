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
