import type { TextProps } from '@visx/text';
import type { OrientationType } from '../constants/orientation';
import Orientation from '../constants/orientation';
import type { AxisScaleOutput } from '../types';

export interface TransformArgs {
  labelOffset: number;
  labelProps: Partial<TextProps>;
  orientation: OrientationType;
  range: AxisScaleOutput[];
  tickLabelFontSize: number;
  tickLength: number;
}

export default function getLabelTransform({
  labelOffset,
  labelProps,
  orientation,
  range,
  tickLabelFontSize,
  tickLength,
}: TransformArgs) {
  const sign = orientation === Orientation.left || orientation === Orientation.top ? -1 : 1;

  let x;
  let y;
  let transform;

  if (orientation === Orientation.top || orientation === Orientation.bottom) {
    const yBottomOffset =
      orientation === Orientation.bottom && typeof labelProps.fontSize === 'number'
        ? labelProps.fontSize
        : 0;

    x = (Number(range[0]) + Number(range[range.length - 1])) / 2;
    y = sign * (tickLength + labelOffset + tickLabelFontSize + yBottomOffset);
  } else {
    x = sign * ((Number(range[0]) + Number(range[range.length - 1])) / 2);
    y = -(tickLength + labelOffset);
    transform = `rotate(${sign * 90})`;
  }

  return { x, y, transform };
}
