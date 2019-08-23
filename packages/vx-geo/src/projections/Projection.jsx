import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Group } from '@vx/group';
import {
  geoOrthographic,
  geoAlbers,
  geoAlbersUsa,
  geoMercator,
  geoNaturalEarth1,
  geoEqualEarth,
  geoPath,
} from 'd3-geo';
import Graticule from '../graticule/Graticule';

// TODO: Implement all projections of d3-geo
const projectionMapping = {
  orthographic: () => geoOrthographic(),
  albers: () => geoAlbers(),
  albersUsa: () => geoAlbersUsa(),
  mercator: () => geoMercator(),
  naturalEarth: () => geoNaturalEarth1(),
  equalEarth: () => geoEqualEarth(),
};

Projection.propTypes = {
  data: PropTypes.array.isRequired,
  projection: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  projectionFunc: PropTypes.func,
  clipAngle: PropTypes.number,
  clipExtent: PropTypes.array,
  scale: PropTypes.number,
  translate: PropTypes.array,
  center: PropTypes.array,
  rotate: PropTypes.array,
  precision: PropTypes.number,
  fitExtent: PropTypes.array,
  fitSize: PropTypes.array,
  centroid: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.func,
  innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  graticule: PropTypes.object,
  graticuleLines: PropTypes.object,
  graticuleOutline: PropTypes.object,
  pointRadius: PropTypes.number,
};

/**
 * Component for all projections.
 */
export default function Projection({
  data,
  projection = 'mercator',
  projectionFunc,
  clipAngle,
  clipExtent,
  scale,
  translate,
  center,
  rotate,
  precision,
  fitExtent,
  fitSize,
  centroid,
  graticule,
  graticuleLines,
  graticuleOutline,
  className,
  innerRef,
  pointRadius,
  children,
  ...restProps
}) {
  const maybeCustomProjection = projectionMapping[projection] || projection;
  const currProjection = maybeCustomProjection();

  if (clipAngle) currProjection.clipAngle(clipAngle);
  if (clipExtent) currProjection.clipExtent(clipExtent);
  if (scale) currProjection.scale(scale);
  if (translate) currProjection.translate(translate);
  if (center) currProjection.center(center);
  if (rotate) currProjection.rotate(rotate);
  if (precision) currProjection.rotate(precision);
  if (fitExtent) currProjection.fitExtent(...fitExtent);
  if (fitSize) currProjection.fitSize(...fitSize);

  const path = geoPath().projection(currProjection);

  if (pointRadius) path.pointRadius(pointRadius);

  const features = data.map((feature, i) => {
    return {
      feature,
      type: projection,
      projection: currProjection,
      index: i,
      centroid: path.centroid(feature),
      path: path(feature),
    };
  });

  if (children) return children({ path, features });

  return (
    <Group className="vx-geo">
      {graticule && !graticule.foreground && <Graticule graticule={g => path(g)} {...graticule} />}
      {graticuleLines && !graticuleLines.foreground && (
        <Graticule lines={g => path(g)} {...graticuleLines} />
      )}
      {graticuleOutline && !graticuleOutline.foreground && (
        <Graticule outline={g => path(g)} {...graticuleOutline} />
      )}

      {features.map((feature, i) => {
        return (
          <g key={`${projection}-${i}`}>
            <path
              className={cx(`vx-geo-${projection}`, className)}
              d={feature.path}
              ref={innerRef && innerRef(feature, i)}
              {...restProps}
            />
            {centroid && centroid(feature.centroid, feature)}
          </g>
        );
      })}
      {/* TODO: Maybe find a different way to pass projection function to use for example invert */}
      {projectionFunc && projectionFunc(currProjection)}

      {graticule && graticule.foreground && <Graticule graticule={g => path(g)} {...graticule} />}
      {graticuleLines && graticuleLines.foreground && (
        <Graticule lines={g => path(g)} {...graticuleLines} />
      )}
      {graticuleOutline && graticuleOutline.foreground && (
        <Graticule outline={g => path(g)} {...graticuleOutline} />
      )}
    </Group>
  );
}
