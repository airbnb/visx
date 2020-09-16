import React from 'react';
import { Group } from '@vx/group';
import { geoGraticule, GeoGraticuleGenerator } from 'd3-geo';
// eslint-disable-next-line import/no-unresolved
import { LineString, MultiLineString, Polygon } from 'geojson';

export type GraticuleProps = {
  /**
   * Render function for graticules which is passed a GeoJSON MultiLineString geometry object
   * representing all meridians and parallels for the graticule.
   */
  graticule?: (multiLineString: MultiLineString) => string;
  /**
   * Render function for graticule lines, which is invoked once for each meridian or parallel for the graticule,
   * and is passed the GeoJSON LineString object representing said meridian or parallel.
   */
  lines?: (lineString: LineString) => string;
  /**
   * Render function for the outline of the graticule (i.e. along the meridians and parallels defining its extent).
   * It is passed a GeoJSON Polygon geometry object representing the outline.
   */
  outline?: (polygon: Polygon) => string;
  /** Override render function, which is passed the configured graticule generator. */
  children?: ({ graticule }: { graticule: GeoGraticuleGenerator }) => React.ReactNode;
  /** Sets the major and minor extents of the graticule generator, which defaults to ⟨⟨-180°, -80° - ε⟩, ⟨180°, 80° + ε⟩⟩. */
  extent?: [[number, number], [number, number]];
  /** Sets the major extent of the graticule generator, which defaults to ⟨⟨-180°, -90° + ε⟩, ⟨180°, 90° - ε⟩⟩. */
  extentMajor?: [[number, number], [number, number]];
  /** Sets the major extent of the graticule generator, which defaults to ⟨⟨-180°, -80° - ε⟩, ⟨180°, 80° + ε⟩⟩. */
  extentMinor?: [[number, number], [number, number]];
  /** Sets both the major and minor step of the graticule generator. */
  step?: [number, number];
  /** Sets the major step of the graticule generator, which defaults to ⟨90°, 360°⟩. */
  stepMajor?: [number, number];
  /** Sets the major step of the graticule generator, which defaults to ⟨10°, 10°⟩. */
  stepMinor?: [number, number];
  /** Sets the precision of the graticule generator, which defaults to 2.5°. */
  precision?: number;
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
}: GraticuleProps & Omit<React.SVGProps<SVGPathElement>, keyof GraticuleProps>) {
  const currGraticule = geoGraticule();

  if (extent) currGraticule.extent(extent);
  if (extentMajor) currGraticule.extentMajor(extentMajor);
  if (extentMinor) currGraticule.extentMinor(extentMinor);
  if (step) currGraticule.step(step);
  if (stepMajor) currGraticule.stepMajor(stepMajor);
  if (stepMinor) currGraticule.stepMinor(stepMinor);
  if (precision) currGraticule.precision(precision);

  if (children) return <>{children({ graticule: currGraticule })}</>;

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
