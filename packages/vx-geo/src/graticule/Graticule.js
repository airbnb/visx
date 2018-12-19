import React from 'react';
import PropTypes from 'prop-types';
import { Group } from '@vx/group';
import { geoGraticule } from 'd3-geo';

Graticule.propTypes = {
  graticule: PropTypes.func,
  lines: PropTypes.func,
  outline: PropTypes.func,
  extent: PropTypes.array,
  extentMajor: PropTypes.array,
  extentMinor: PropTypes.array,
  step: PropTypes.array,
  stepMajor: PropTypes.array,
  stepMinor: PropTypes.array,
  precision: PropTypes.number,
  children: PropTypes.func
};

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
  children,
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

  if (children) return children({ graticule: currGraticule });

  return (
    <Group className="vx-geo-graticule">
      {graticule && (
        <path d={graticule(currGraticule())} fill="none" stroke="black" {...restProps} />
      )}
      {lines &&
        currGraticule.lines().map((line, i) => (
          <g key={i}>
            <path d={lines(line)} fill="none" stroke="black" {...restProps} />
          </g>
        ))}
      {outline && (
        <path d={outline(currGraticule.outline())} fill="none" stroke="black" {...restProps} />
      )}
    </Group>
  );
}
