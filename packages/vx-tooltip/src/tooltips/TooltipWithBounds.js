import React from 'react';
import PropTypes from 'prop-types';
import { withBoundingRects } from '@vx/bounds';

import Tooltip from './Tooltip';

const rectShape = PropTypes.shape({
  top: PropTypes.number.isRequired,
  right: PropTypes.number.isRequired,
  bottom: PropTypes.number.isRequired,
  left: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
});

const withBoundingRectsProps = {
  getRects: PropTypes.func,
  rect: rectShape,
  parentRect: rectShape
};

const tooltipProps = {
  left: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  top: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.any
};

const propTypes = {
  ...withBoundingRectsProps,
  ...tooltipProps,
  offsetLeft: PropTypes.number,
  offsetTop: PropTypes.number
};

const defaultProps = {};

function TooltipWithBounds({
  left: initialLeft,
  top: initialTop,
  offsetLeft = 10,
  offsetTop = 10,
  rect,
  parentRect,
  getRects,
  children,
  style,
  ...otherProps
}) {
  let left = initialLeft;
  let top = initialTop;

  if (rect && parentRect) {
    left =
      offsetLeft + rect.right > parentRect.right || offsetLeft + rect.right > window.innerWidth
        ? left - rect.width - offsetLeft
        : left + offsetLeft;

    top =
      offsetTop + rect.bottom > parentRect.bottom || offsetTop + rect.bottom > window.innerHeight
        ? top - rect.height - offsetTop
        : top + offsetTop;
  }

  return (
    <Tooltip
      style={{ top: 0, transform: `translate(${left}px, ${top}px)`, ...style }}
      {...otherProps}
    >
      {children}
    </Tooltip>
  );
}

TooltipWithBounds.propTypes = propTypes;
TooltipWithBounds.defaultProps = defaultProps;

export default withBoundingRects(TooltipWithBounds);
