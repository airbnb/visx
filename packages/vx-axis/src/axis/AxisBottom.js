import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Axis from './Axis';
import ORIENT from '../constants/orientation';

const propTypes = {
  /**
   * The class name applied to the outermost axis group element.
   */
  axisClassName: PropTypes.string,
  /**
   * The class name applied to the axis line element.
   */
  axisLineClassName: PropTypes.string,
  /**
   * If true, will hide the axis line.
   */
  hideAxisLine: PropTypes.bool,
  /**
   * If true, will hide the ticks (but not the tick labels).
   */
  hideTicks: PropTypes.bool,
  /**
   * If true, will hide the '0' value tick and tick label.
   */
  hideZero: PropTypes.bool,
  /**
   * The text for the axis label.
   */
  label: PropTypes.string,
  /**
   * The class name applied to the axis label text element.
   */
  labelClassName: PropTypes.string,
  /**
   * Pixel offset of the axis label (does not include tick label font size, which is accounted for automatically)
   */
  labelOffset: PropTypes.number,
  /**
   * Props applied to the axis label component.
   */
  labelProps: PropTypes.object,
  /**
   * A left pixel offset applied to the entire axis.
   */
  left: PropTypes.number,
  /**
   * The number of ticks wanted for the axis (note this is approximate)
   */
  numTicks: PropTypes.number,
  /**
   * Pixel padding to apply to both sides of the axis.
   */
  rangePadding: PropTypes.number,
  /**
   * A [d3](https://github.com/d3/d3-scale) or [vx](https://github.com/hshoff/vx/tree/master/packages/vx-scale) scale function.
   */
  scale: PropTypes.func.isRequired,
  /**
   * The color for the stroke of the lines.
   */
  stroke: PropTypes.string,
  /**
   * The pixel value for the width of the lines.
   */
  strokeWidth: PropTypes.number,
  /**
   * The pattern of dashes in the stroke.
   */
  strokeDasharray: PropTypes.string,
  /**
   * The class name applied to each tick grou
   */
  tickClassName: PropTypes.string,
  /**
   * A [d3 formatter](https://github.com/d3/d3-scale/blob/master/README.md#continuous_tickFormat) for the tick text.
   */
  tickFormat: PropTypes.func,
  /**
   * A function that returns props for a given tick label.
   */
  tickLabelProps: PropTypes.func,
  /**
   * The length of the tick lines.
   */
  tickLength: PropTypes.number,
  /**
   * The color for the tick's stroke value.
   */
  tickStroke: PropTypes.string,
  /**
   * A custom SVG transform value to be applied to each tick group.
   */
  tickTransform: PropTypes.string,
  /**
   * An array of values that determine the number and values of the ticks. Falls back to `scale.ticks()` or `.domain()`.
   */
  tickValues: PropTypes.array,
  tickComponent: PropTypes.func,
  /**
   * A top pixel offset applied to the entire axis.
   */
  top: PropTypes.number,
  /**
   * For more control over rendering or to add event handlers to datum, pass a function as children.
   */
  children: PropTypes.func
};

export default function AxisBottom({
  children,
  axisClassName,
  axisLineClassName,
  hideAxisLine,
  hideTicks,
  hideZero,
  label,
  labelClassName,
  labelOffset = 8,
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
    dy: '0.25em',
    fill: 'black',
    fontFamily: 'Arial',
    fontSize: 10,
    textAnchor: 'middle'
  }),
  tickLength = 8,
  tickStroke,
  tickTransform,
  tickValues,
  tickComponent,
  top
}) {
  return (
    <Axis
      axisClassName={cx('vx-axis-bottom', axisClassName)}
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
      orientation={ORIENT.bottom}
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
      tickComponent={tickComponent}
      top={top}
      children={children}
    />
  );
}

AxisBottom.propTypes = propTypes;
