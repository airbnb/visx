import powerScale, { PowerConfig } from './power';

export type SquareRootConfig<Output> = Omit<PowerConfig<Output>, 'exponent'>;

export default function squareRootScale<Output>(scaleConfig: SquareRootConfig<Output>) {
  const scale = powerScale<Output>({ ...scaleConfig, exponent: 0.5 });

  // @ts-ignore
  scale.type = 'squareRoot';

  return scale;
}
