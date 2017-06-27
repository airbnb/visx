import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import LegendItem from './LegendItem';
import LegendLabel from './LegendLabel';
import LegendShape from './LegendShape';
import labelQuantile from '../labels/quantile';

Legend.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  scale: PropTypes.func.isRequired,
  labels: PropTypes.arrayOf(
    PropTypes.shape({
      extend: PropTypes.array,
      text: PropTypes.string,
      value: PropTypes.any,
    })
  ),
  shapeWidth: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  shapeHeight: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  shapeMargin: PropTypes.string,
  labelMargin: PropTypes.string,
  itemMargin: PropTypes.string,
  direction: PropTypes.string,
  itemDirection: PropTypes.string,
};

export default function Legend({
  className,
  style,
  scale,
  shape,
  labels,
  shapeWidth = 15,
  shapeHeight = 15,
  shapeMargin = '2px 4px 2px 0',
  labelAlign = 'left',
  labelMargin = '0 4px',
  itemMargin = '0',
  direction = 'column',
  itemDirection = 'row',
  ...restProps,
}) {
  return (
    <div
      className={cx('vx-legend', className)}
      style={style}
      style={{
        display: 'flex',
        flexDirection: direction,
      }}
    >
      {labels.map((label, i) => {
        const { text, value } = label;
        return (
          <LegendItem
            key={`legend-${label}-${i}`}
            margin={itemMargin}
            flexDirection={itemDirection}
          >
            <LegendShape
              shape={shape}
              value={value}
              height={shapeHeight}
              width={shapeWidth}
              margin={shapeMargin}
            />
            <LegendLabel
              label={text}
              margin={labelMargin}
              align={labelAlign}
            />
          </LegendItem>
        );
      })}
    </div>
  );
}