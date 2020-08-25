import { Scale, PartialBrushStartEnd, Point } from './types';

export function scaleInvert(scale: Scale, value: number) {
  // Test if the scale is an ordinalScale or not,
  // Since an ordinalScale doesn't support invert function.
  if (!scale.invert) {
    const [start, end] = scale.range();
    let i = 0;
    // ordinal should have step
    const width = (scale.step!() * (end - start)) / Math.abs(end - start);
    if (width > 0) {
      while (value > start + width * (i + 1)) {
        i += 1;
      }
    } else {
      while (value < start + width * (i + 1)) {
        i += 1;
      }
    }

    return i;
  }

  return scale.invert(value);
}

export function getDomainFromExtent(
  scale: Scale,
  start: number,
  end: number,
  tolerentDelta: number,
) {
  let domain;
  const invertedStart = scaleInvert(scale, start + (start < end ? -tolerentDelta : tolerentDelta));
  const invertedEnd = scaleInvert(scale, end + (end < start ? -tolerentDelta : tolerentDelta));
  const minValue = Math.min(invertedStart, invertedEnd);
  const maxValue = Math.max(invertedStart, invertedEnd);
  if (scale.invert) {
    domain = {
      start: minValue,
      end: maxValue,
    };
  } else {
    const values = [];
    const scaleDomain = scale.domain();
    for (let i = minValue; i <= maxValue; i += 1) {
      values.push(scaleDomain[i]);
    }
    domain = {
      values,
    };
  }

  return domain;
}

export function shouldUpdateInitialBrushPosition(
  initialBrushPosition: PartialBrushStartEnd | undefined,
  prevInitialBrushPosition: PartialBrushStartEnd | undefined,
  currStart: Point,
  currEnd: Point,
) {
  const initialBrushPositionDidChange =
    initialBrushPosition?.start?.x !== prevInitialBrushPosition?.start?.x ||
    initialBrushPosition?.start?.y !== prevInitialBrushPosition?.start?.y ||
    initialBrushPosition?.end?.x !== prevInitialBrushPosition?.end?.x ||
    initialBrushPosition?.end?.y !== prevInitialBrushPosition?.end?.y;

  const brushPositionIsDifferentFromCurrentPosition =
    initialBrushPosition?.start?.x !== currStart.x ||
    initialBrushPosition?.start?.y !== currStart.y ||
    initialBrushPosition?.end?.x !== currEnd.x ||
    initialBrushPosition?.end?.y !== currEnd.y;

  return initialBrushPositionDidChange && brushPositionIsDifferentFromCurrentPosition;
}
