import React from 'react';
import PropTypes from 'prop-types';
import { Group } from '@vx/group';
import additionalProps from '../util/additionalProps';
import { geoGraticule } from 'd3-geo';

export default function Graticule({
  graticule,
  lines,
  outline,
  extent,
  extentMajor,
  extentMinor,
  step,
  stepMajor,
  stepMinor,
  precision,
  ...restProps
}) {
  const currGraticule = geoGraticule();

  if (extent) currGraticule.extent(extent);
  if (extentMajor) currGraticule.extentMajor(extentMajor);
  if (extentMinor) currGraticule.extentMinor(extentMinor);
  if (step) currGraticule.step(step);
  if (stepMajor) currGraticule.stepMajor(stepMajor);
  if (stepMinor) currGraticule.stepMinor(stepMinor);
  if (precision) currGraticule.stepMinor(precision);

  return (
    <Group className={`vx-geo-graticule`}>
      {graticule && (
        <path d={graticule(currGraticule())} fill="none" stroke="black" {...restProps} />
      )}
      {lines &&
        currGraticule.lines().map((line, i) => (
          <g key={i}>
            <path
              d={lines(line)}
              fill="none"
              stroke="black"
              {...additionalProps(restProps, {
                ...line,
                index: i
              })}
            />
          </g>
        ))}
      {outline && (
        <path d={outline(currGraticule.outline())} fill="none" stroke="black" {...restProps} />
      )}
    </Group>
  );
}

Graticule.propTypes = {
  graticule: PropTypes.func,
  lines: PropTypes.func,
  outline: PropTypes.func
};
