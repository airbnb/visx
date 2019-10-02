import React from 'react';
import PropTypes from 'prop-types';
import { Group } from '@vx/group';
import { geoGraticule } from 'd3-geo';

Graticule.propTypes = {
  graticule: PropTypes.func,
  lines: PropTypes.func,
  outline: PropTypes.func,
  children: PropTypes.func,
  extent: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
  extentMajor: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
  extentMinor: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
  step: PropTypes.arrayOf(PropTypes.number),
  stepMajor: PropTypes.arrayOf(PropTypes.number),
  stepMinor: PropTypes.arrayOf(PropTypes.number),
  precision: PropTypes.number,
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
