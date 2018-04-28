import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { Group } from '@vx/group';
import { LinePath } from '@vx/shape';

const identity = x => x;

LinePathAnnotation.propTypes = {
  top: PropTypes.number,
  left: PropTypes.number,
  points: PropTypes.array,
  stroke: PropTypes.string,
  strokeWidth: PropTypes.number,
  className: PropTypes.string,
  label: PropTypes.string,
  labelAnchor: PropTypes.oneOf(['start', 'middle', 'end']),
  labelOrientation: PropTypes.string,
  labelDx: PropTypes.number,
  labelDy: PropTypes.number,
  labelFill: PropTypes.string,
  labelFontSize: PropTypes.number,
  labelStroke: PropTypes.string,
  labelStrokeWidth: PropTypes.number,
  labelPaintOrder: PropTypes.string
};

export default function LinePathAnnotation({
  top = 0,
  left = 0,
  points = [],
  stroke = 'black',
  strokeWidth = 1,
  className,
  label,
  labelAnchor = 'middle',
  labelOrientation = 'horizontal',
  labelVerticalAlign = 'top',
  labelHorizontalAlign = 'right',
  labelDx = 0,
  labelDy = 0,
  labelFill,
  labelFontSize = 10,
  labelStroke = 'white',
  labelStrokeWidth = 3,
  labelPaintOrder = 'stroke'
}) {
  const endPoint = points[points.length - 1];
  return (
    <Group className="vx-line-path-annotation-group" top={top} left={left}>
      <LinePath
        className={cx('vx-line-path-annotation', className)}
        data={points}
        x={p => p.x}
        y={p => p.y}
        xScale={identity}
        yScale={identity}
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
      {label && (
        <text
          x={endPoint.x}
          y={endPoint.y}
          dx={labelDx}
          dy={labelDy}
          fontSize={labelFontSize}
          fill={labelFill || stroke}
          stroke={labelStroke}
          strokeWidth={labelStrokeWidth}
          textAnchor={labelAnchor}
          paintOrder={labelPaintOrder}
        >
          {label}
        </text>
      )}
    </Group>
  );
}
