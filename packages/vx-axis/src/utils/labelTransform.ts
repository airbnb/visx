import { TextProps } from '@vx/text/lib/Text';
import ORIENT from '../constants/orientation';
import { AxisOrientation, ScaleOutput } from '../types';

export interface TransformArgs {
  labelOffset: number;
  labelProps: Partial<TextProps>;
  orientation: AxisOrientation;
  range: ScaleOutput[];
  tickLabelFontSize: number;
  tickLength: number;
}

export default function labelTransform({
  labelOffset,
  labelProps,
  orientation,
  range,
  tickLabelFontSize,
  tickLength,
}: TransformArgs) {
  const sign = orientation === ORIENT.left || orientation === ORIENT.top ? -1 : 1;

  let x;
  let y;
  let transform;

  if (orientation === ORIENT.top || orientation === ORIENT.bottom) {
    const yBottomOffset =
      orientation === ORIENT.bottom && typeof labelProps.fontSize === 'number'
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
