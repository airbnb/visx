import React from 'react';
import { withBoundingRects, WithBoundingRectsProps } from '@vx/bounds';

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
    const placeTooltipLeft =
      offsetLeft + ownBounds.right > parentBounds.right ||
      offsetLeft + ownBounds.right > window.innerWidth;

    const placeTooltipUp =
      offsetTop + ownBounds.bottom > parentBounds.bottom ||
      offsetTop + ownBounds.bottom > window.innerHeight;

    left = placeTooltipLeft ? left - ownBounds.width - offsetLeft : left + offsetLeft;
    top = placeTooltipUp ? top - ownBounds.height - offsetTop : top + offsetTop;
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
