import React from 'react';
import { withBoundingRects, WithBoundingRectsProps } from '@visx/bounds';

import Tooltip, { TooltipProps, defaultStyles } from './Tooltip';
import { TooltipPositionProvider } from '../context/TooltipPositionContext';

export type TooltipWithBoundsProps = TooltipProps &
  React.HTMLAttributes<HTMLDivElement> &
  WithBoundingRectsProps & {
    nodeRef?: React.Ref<HTMLDivElement>;
    /**
     * When the tooltip is in a portal, this is the position of the portal
     * container to be used for offsetting calculations around bounds as a consequence.
     */
    portalContainerPosition?: { left: number; top: number };
    /**
     * When the tooltip is in a portal, the portal container becomes the direct parent of the tooltip.
     * Often the portal is not what we want the tooltip to be bound to. Another visual parent can be specified
     * by specifying its dimensions here.
     */
    visualParentRect?: { width: number; height: number; left: number; top: number };
  };

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
  nodeRef,
  portalContainerPosition,
  visualParentRect: visualParentBounds = parentBounds,
  ...otherProps
}: TooltipWithBoundsProps) {
  let transform: React.CSSProperties['transform'];
  let placeTooltipLeft = false;
  let placeTooltipUp = false;

  if (ownBounds && visualParentBounds) {
    let left = initialLeft;
    let top = initialTop;

    if (visualParentBounds.width) {
      const leftInVisualParent =
        left +
        (portalContainerPosition?.left || 0) -
        (portalContainerPosition ? visualParentBounds.left : 0);
      const rightPlacementClippedPx =
        leftInVisualParent + offsetLeft + ownBounds.width - visualParentBounds.width;
      const leftPlacementClippedPx = ownBounds.width - leftInVisualParent - offsetLeft;
      placeTooltipLeft =
        rightPlacementClippedPx > 0 && rightPlacementClippedPx > leftPlacementClippedPx;
    } else {
      const rightPlacementClippedPx = left + offsetLeft + ownBounds.width - window.innerWidth;
      const leftPlacementClippedPx = ownBounds.width - left - offsetLeft;
      placeTooltipLeft =
        rightPlacementClippedPx > 0 && rightPlacementClippedPx > leftPlacementClippedPx;
    }

    if (visualParentBounds.height) {
      const topInVisualParent =
        top +
        (portalContainerPosition?.top || 0) -
        (portalContainerPosition ? visualParentBounds.top : 0);
      const bottomPlacementClippedPx =
        topInVisualParent + offsetTop + ownBounds.height - visualParentBounds.height;
      const topPlacementClippedPx = ownBounds.height - topInVisualParent - offsetTop;
      placeTooltipUp =
        bottomPlacementClippedPx > 0 && bottomPlacementClippedPx > topPlacementClippedPx;
    } else {
      placeTooltipUp = top + offsetTop + ownBounds.height > window.innerHeight;
    }

    left = placeTooltipLeft ? left - ownBounds.width - offsetLeft : left + offsetLeft;
    top = placeTooltipUp ? top - ownBounds.height - offsetTop : top + offsetTop;

    left = Math.round(left);
    top = Math.round(top);

    transform = `translate(${left}px, ${top}px)`;
  }

  return (
    <Tooltip
      ref={nodeRef}
      style={{
        left: 0,
        top: 0,
        transform,
        ...(!unstyled && style),
      }}
      {...otherProps}
    >
      <TooltipPositionProvider
        value={{ isFlippedVertically: !placeTooltipUp, isFlippedHorizontally: !placeTooltipLeft }}
      >
        {children}
      </TooltipPositionProvider>
    </Tooltip>
  );
}

export default withBoundingRects(TooltipWithBounds);
