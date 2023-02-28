import { ScaleInput } from '@visx/scale';
import { TextProps } from '@visx/text';
import { TickLabelProps, AxisScale } from '../types';

export function getTickLabelProps<Scale extends AxisScale>(
  defaultTickLabelProps: Partial<TextProps>,
  tickLabelProps?: TickLabelProps<ScaleInput<Scale>>,
) {
  return typeof tickLabelProps === 'function'
    ? tickLabelProps
    : {
        ...defaultTickLabelProps,
        ...tickLabelProps,
      };
}
