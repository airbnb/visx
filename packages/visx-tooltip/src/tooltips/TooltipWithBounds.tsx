import React from 'react';
import { withBoundingRects, WithBoundingRectsProps } from '@visx/bounds';

import Tooltip, { TooltipProps, TooltipForwardedRef, defaultStyles } from './Tooltip';

export type TooltipWithBoundsProps = TooltipForwardedRef &
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
    let placeTooltipLeft = false;
    let placeTooltipUp = false;

    if (parentBounds.width) {
      const rightPlacementClippedPx = left + offsetLeft + ownBounds.width - parentBounds.width;
      const leftPlacementClippedPx = ownBounds.width - left - offsetLeft;
      placeTooltipLeft =
        rightPlacementClippedPx > 0 && rightPlacementClippedPx > leftPlacementClippedPx;
    } else {
      const rightPlacementClippedPx = left + offsetLeft + ownBounds.width - window.innerWidth;
      const leftPlacementClippedPx = ownBounds.width - left - offsetLeft;
      placeTooltipLeft =
        rightPlacementClippedPx > 0 && rightPlacementClippedPx > leftPlacementClippedPx;
    }

    if (parentBounds.height) {
      const bottomPlacementClippedPx = top + offsetTop + ownBounds.height - parentBounds.height;
      const topPlacementClippedPx = ownBounds.height - top - offsetTop;
      placeTooltipUp =
        bottomPlacementClippedPx > 0 && bottomPlacementClippedPx > topPlacementClippedPx;
    } else {
      placeTooltipUp = top + offsetTop + ownBounds.height > window.innerHeight;
    }

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
