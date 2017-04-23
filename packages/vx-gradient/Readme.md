# @vx/gradient

Inspired by: https://dribbble.com/shots/3380672-Sketch-Gradients-Freebie

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
