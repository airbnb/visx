import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Line, LineRadial } from '@vx/shape';
import { Point } from '@vx/point';
import { Group } from '@vx/group';
import { Text } from '@vx/text';
import { curveCardinal } from '@vx/curve';

import ORIENT from '../constants/orientation';
import polarToCartesian from '../utils/polarToCartesian';
import radialLabelTransform from '../utils/radialLabelTransform';
import radialTickLabelTransform from '../utils/radialTickLabelTransform';
import identity from '../utils/identity';

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
   * Pixel offset of the axis label (does not include tick length or
   * tick label font size, which is accounted for automatically)
   */
  labelOffset: PropTypes.number,
  /**
   * High-leevl positioning of axis label component. Can be
   * refined or customized further using labelProps.
   */
  labelOrientation: PropTypes.oneOf([
    ORIENT.top,
    ORIENT.right,
    ORIENT.bottom,
    ORIENT.left,
    ORIENT.center
  ]),
  /**
   * Props applied to the axis label component.
   */
  labelProps: PropTypes.object,
  /**
   * A left pixel offset applied to the entire axis.
   */
  left: PropTypes.number,
  /**
   * The number of ticks wanted for the axis (note this is approximate due to d3's algorithm)
   */
  numTicks: PropTypes.number,
  /**
   * The required pixel size of the radius of the radial axis
   * */
  radius: PropTypes.number.isRequired,
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
   * The class name applied to each tick group
   */
  tickClassName: PropTypes.string,
  /**
   * A [d3 formatter](https://github.com/d3/d3-scale/blob/master/README.md#continuous_tickFormat) for the tick text.
   */
  tickFormat: PropTypes.func,
  /**
   * A function that returns props for a given tick value and index.
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
   * An array of values that determine the number and values of the ticks.
   * Falls back to `scale.ticks()` or `.domain()`.
   */
  tickValues: PropTypes.array,
  /**
   * For more control over tick label rendering, pass a function
   */
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

export default function AxisRadial({
  children,
  axisClassName,
  axisLineClassName,
  hideAxisLine = false,
  hideTicks = false,
  hideZero = false,
  label = '',
  labelClassName,
  labelOffset = 14,
  labelOrientation = 'top',
  labelProps = {
    fontFamily: 'Arial',
    fontSize: 12,
    fontWeight: 'bold',
    fill: 'black'
  },
  left = 0,
  numTicks = 10,
  radius,
  scale,
  stroke = 'black',
  strokeWidth = 1,
  strokeDasharray,
  tickClassName,
  tickFormat,
  tickLabelProps = (tickValue, index) => ({
    fontFamily: 'Arial',
    fontSize: 10,
    fill: 'black'
  }),
  tickLength = 8,
  tickStroke = 'black',
  tickTransform,
  tickValues,
  tickComponent,
  top = 0
}) {
  let values = scale.ticks ? scale.ticks(numTicks) : scale.domain();
  if (tickValues) values = tickValues;
  let format = scale.tickFormat ? scale.tickFormat() : identity;
  if (tickFormat) format = tickFormat;

  let tickLabelFontSize = 10; // track the max tick label size to compute label offset

  const ticks = values
    .map((val, index) => {
      if (hideZero && val === 0) return null;

      const angle = scale(val) - Math.PI / 2;
      const tickFromPoint = new Point(polarToCartesian({ angle, radius }));
      const tickToPoint = new Point(polarToCartesian({ angle, radius: radius + tickLength }));

      const tickOrientationProps = radialTickLabelTransform(tickFromPoint, tickToPoint);
      const tickLabelPropsObj = { ...tickOrientationProps, ...tickLabelProps(val, index) };
      tickLabelFontSize = Math.max(tickLabelFontSize, tickLabelPropsObj.fontSize || 0);

      return tickLabelPropsObj;
    })
    .filter(defined => !!defined);

  const axisLineData = scale.ticks(50);
  const angle = d => scale(d);

  if (children) {
    return (
      <Group className={cx('vx-axis-radial', axisClassName)} top={top} left={left}>
        {children({
          angle,
          axisLineData,
          numTicks,
          label,
          radius,
          tickLength,
          tickFormat: format,
          ticks
        })}
      </Group>
    );
  }

  return (
    <Group className={cx('vx-axis-radial', axisClassName)} top={top} left={left}>
      {values.map((val, index) => {
        if (hideZero && val === 0) return null;

        const tickAngle = scale(val) - Math.PI / 2; // @TODO why is this off by 45°?
        const tickFromPoint = new Point(polarToCartesian({ angle: tickAngle, radius }));
        const tickToPoint = new Point(
          polarToCartesian({ angle: tickAngle, radius: radius + tickLength })
        );

        const tickOrientationProps = radialTickLabelTransform(tickFromPoint, tickToPoint);
        const tickLabelPropsObj = {
          ...tickOrientationProps,
          ...tickLabelProps(val, index)
        };
        const formattedValue = format(val, index);

        return (
          <Group
            key={`vx-tick-${val}-${index}`}
            className={cx('vx-axis-tick', tickClassName)}
            transform={tickTransform}
          >
            {!hideTicks && <Line from={tickFromPoint} to={tickToPoint} stroke={tickStroke} />}
            {tickComponent ? (
              tickComponent({
                formattedValue,
                ...tickLabelPropsObj
              })
            ) : (
              <Text {...tickLabelPropsObj}>{formattedValue}</Text>
            )}
          </Group>
        );
      })}

      {!hideAxisLine && (
        <LineRadial
          className={cx('vx-axis-line', axisLineClassName)}
          data={axisLineData}
          angle={angle}
          radius={radius}
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeDasharray={strokeDasharray}
          curve={curveCardinal}
        />
      )}

      {label && (
        <Text
          className={cx('vx-axis-label', labelClassName)}
          {...radialLabelTransform({
            labelOffset,
            labelOrientation,
            labelProps,
            radius,
            tickLabelFontSize,
            tickLength
          })}
          {...labelProps}
        >
          {label}
        </Text>
      )}
    </Group>
  );
}

AxisRadial.propTypes = propTypes;
