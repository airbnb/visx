import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Axis from './Axis';
import ORIENT from '../constants/orientation';

const propTypes = {
  axisClassName: PropTypes.string,
  axisLineClassName: PropTypes.string,
  hideAxisLine: PropTypes.bool,
  hideTicks: PropTypes.bool,
  hideZero: PropTypes.bool,
  label: PropTypes.string,
  labelClassName: PropTypes.string,
  labelOffset: PropTypes.number,
  labelProps: PropTypes.object,
  left: PropTypes.number,
  numTicks: PropTypes.number,
  rangePadding: PropTypes.number,
  scale: PropTypes.func.isRequired,
  stroke: PropTypes.string,
  strokeWidth: PropTypes.number,
  strokeDasharray: PropTypes.string,
  tickClassName: PropTypes.string,
  tickFormat: PropTypes.func,
  tickLabelProps: PropTypes.func,
  tickLength: PropTypes.number,
  tickStroke: PropTypes.string,
  tickTransform: PropTypes.string,
  tickValues: PropTypes.arrayOf(PropTypes.number),
  top: PropTypes.number,
};

export default function AxisRight({
  axisClassName,
  axisLineClassName,
  hideAxisLine,
  hideTicks,
  hideZero,
  label,
  labelClassName,
  labelOffset = 36,
  labelProps,
  left,
  numTicks,
  rangePadding,
  scale,
  stroke,
  strokeWidth,
  strokeDasharray,
  tickClassName,
  tickFormat,
  tickLabelProps = ({ tick, index }) => ({
    dx: '0.25em',
    dy: '0.25em',
    fill: 'black',
    fontFamily: 'Arial',
    fontSize: 10,
    textAnchor: 'start',
  }),
  tickLength = 8,
  tickStroke,
  tickTransform,
  tickValues,
  top,
}) {
  return (
    <Axis
      axisClassName={cx('vx-axis-right', axisClassName)}
      axisLineClassName={axisLineClassName}
      hideAxisLine={hideAxisLine}
      hideTicks={hideTicks}
      hideZero={hideZero}
      label={label}
      labelClassName={labelClassName}
      labelOffset={labelOffset}
      labelProps={labelProps}
      left={left}
      numTicks={numTicks}
      orientation={ORIENT.right}
      rangePadding={rangePadding}
      scale={scale}
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeDasharray={strokeDasharray}
      tickClassName={tickClassName}
      tickFormat={tickFormat}
      tickLabelProps={tickLabelProps}
      tickLength={tickLength}
      tickStroke={tickStroke}
      tickTransform={tickTransform}
      tickValues={tickValues}
      top={top}
    />
  );
}

AxisRight.propTypes = propTypes;
