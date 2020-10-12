import React from 'react';
import { withBoundingRects, WithBoundingRectsProps } from '@visx/bounds';

import Tooltip, { TooltipProps, defaultStyles } from './Tooltip';

export type TooltipWithBoundsProps = TooltipProps &
  React.HTMLProps<HTMLDivElement> &
  WithBoundingRectsProps;

function TooltipWithBounds({
  children,
  getRects,
  left: initialLeft = 0,
  offsetLeft = 10,
  offsetTop = 10,
  parentRect: parentBounds,
  rect: ownBounds,
  style = defaultStyles,
  top: initialTop = 0,
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
        left: 0,
        top: 0,
        transform: `translate(${left}px, ${top}px)`,
        ...(!unstyled && style),
      }}
      {...otherProps}
    >
      {children}
    </Tooltip>
  );
}

export default withBoundingRects(TooltipWithBounds);
