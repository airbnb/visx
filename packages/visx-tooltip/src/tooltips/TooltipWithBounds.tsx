import React from 'react';
import { withBoundingRects, WithBoundingRectsProps } from '@visx/bounds';

import Tooltip, { TooltipProps, defaultStyles } from './Tooltip';

export type TooltipWithBoundsProps = {
  offsetLeft?: number;
  offsetTop?: number;
} & TooltipProps &
  React.HTMLProps<HTMLDivElement> &
  WithBoundingRectsProps;

function TooltipWithBounds({
  left: initialLeft = 0,
  top: initialTop = 0,
  offsetLeft = 10,
  offsetTop = 10,
  children,
  rect: ownBounds,
  parentRect: parentBounds,
  getRects,
  style = defaultStyles,
  unstyled = false,
  ...otherProps
}: TooltipWithBoundsProps) {
  let left = initialLeft;
  let top = initialTop;

  if (ownBounds && parentBounds) {
    if (left > parentBounds.width / 2) {
      left = left - offsetLeft - ownBounds.width;

      if (left < 0) {
        left = 0;
      }
    } else if (left + offsetLeft + ownBounds.width > parentBounds.width) {
      left = parentBounds.width - ownBounds.width;
    }
    if (top > parentBounds.height / 2) {
      top = top - offsetTop - ownBounds.height;
      if (top < 0) {
        top = 0;
      }
    } else if (top + offsetTop + ownBounds.height > parentBounds.height) {
      top = parentBounds.height - ownBounds.height;
    }
  }

  left = Math.round(left);
  top = Math.round(top);

  return (
    <Tooltip
      style={{
        top: 0,
        left: 0,
        transform: `translate(${left}px, ${top}px)`,
        ...(!unstyled && style),
      }}
      unstyled={unstyled}
      {...otherProps}
    >
      {children}
    </Tooltip>
  );
}

export default withBoundingRects(TooltipWithBounds);
