import ORIENT from '../constants/orientation';

export default function labelTransform({
  labelOffset,
  labelProps,
  orientation,
  range,
  tickLabelFontSize,
  tickLength,
}) {
  const sign = orientation === ORIENT.left || orientation === ORIENT.top ? -1 : 1;

  let x, y, transform = null;
  if (orientation === ORIENT.top || orientation === ORIENT.bottom) {
    x = Math.max(...range) / 2;
    y = sign * (tickLength + labelOffset + tickLabelFontSize +
      (orientation === ORIENT.bottom ? labelProps.fontSize : 0));
  } else {
    x = sign * (Math.max(...range) / 2);
    y = -(tickLength + labelOffset);
    transform = `rotate(${sign * 90})`;
  }

  return { x, y, transform };
}
