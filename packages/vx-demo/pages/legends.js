import { Legend } from '@vx/legend';
import { scaleQuantize } from '@vx/scale';
import { format } from 'd3-format';

const scale = scaleQuantize({
  domain: [0, 0.15],
  range: new Array(9).fill(1).map((v,i) => `q${i}-9`)
});

export default () => {
  return (
    <svg>
      <Legend
        scale={scale}
        labelFormat={format('.2f')}
      />
    </svg>
  );
}