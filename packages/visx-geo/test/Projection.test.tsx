import { vi } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { feature } from 'topojson-client';
import type { GeometryCollection } from 'geojson';
import Projection from '../src/projections/Projection';

const mockTopology = {
  type: 'Topology',
  objects: {
    collection: {
      type: 'GeometryCollection',
      geometries: [
        {
          type: 'Polygon',
          arcs: [[0, 1]],
        },
        {
          type: 'Polygon',
          arcs: [[2, 3]],
        },
      ],
    },
  },
  arcs: [
    [
      [0, 0],
      [0, 1],
    ],
    [
      [1, 1],
      [1, 0],
    ],
    [
      [0, 0],
      [1, 0],
    ],
    [
      [1, 1],
      [0, 1],
    ],
  ],
};

describe('<Projection />', () => {
  // Create valid test data
  const data = feature(mockTopology, mockTopology.objects.collection)
    .features as GeometryCollection[];

  const defaultProps = { data };

  const renderWithSvg = (ui: React.ReactElement) => render(<svg>{ui}</svg>);

  test('it should be defined', () => {
    expect(() => renderWithSvg(<Projection {...defaultProps} />)).not.toThrow();
  });

  test('it should pass className', () => {
    const { container } = renderWithSvg(<Projection className="visx-new" {...defaultProps} />);
    const path = container.querySelector('path');
    expect(path).toHaveClass('visx-geo-mercator');
    expect(path).toHaveClass('visx-new');
  });

  test('it should create two paths', () => {
    const { container } = renderWithSvg(<Projection {...defaultProps} />);
    const paths = container.querySelectorAll('path');
    expect(paths).toHaveLength(2);
  });

  test('it should pass prop to path', () => {
    const { container } = renderWithSvg(<Projection stroke="red" {...defaultProps} />);
    const paths = container.querySelectorAll('path');
    paths.forEach((path) => {
      expect(path).toHaveAttribute('stroke', 'red');
    });
  });

  test('it should call projectionFunc prop function', () => {
    const projectionFunc = vi.fn();
    renderWithSvg(<Projection projectionFunc={projectionFunc} {...defaultProps} />);
    expect(projectionFunc).toHaveBeenCalledTimes(1);
    // Verify projection is passed
    expect(projectionFunc.mock.calls[0]?.[0]).toBeDefined();
  });

  test('it should call centroid prop function', () => {
    const centroid = vi.fn();
    renderWithSvg(<Projection centroid={centroid} {...defaultProps} />);
    expect(centroid).toHaveBeenCalledTimes(2);
    // Verify centroid coordinates and feature are passed
    expect(centroid.mock.calls[0]?.[0]).toEqual(expect.any(Array));
    expect(centroid.mock.calls[0]?.[1]).toEqual(expect.any(Object));
  });

  test('zero clipAngle disables the orthographic clipping circle', () => {
    const point = { type: 'Point', coordinates: [180, 0] } as const;
    const { container } = renderWithSvg(
      <Projection projection="orthographic" data={[]} clipAngle={0}>
        {({ path }) => <path d={path({ ...point, coordinates: [180, 0] }) ?? ''} />}
      </Projection>,
    );
    expect(container.querySelector('path')?.getAttribute('d')).not.toBe('');
  });

  test('zero scale collapses projected points to the translation', () => {
    const { container } = renderWithSvg(
      <Projection data={[]} scale={0} translate={[30, 40]}>
        {({ projection }) => (
          <circle cx={projection([45, 30])?.[0]} cy={projection([45, 30])?.[1]} />
        )}
      </Projection>,
    );
    expect(container.querySelector('circle')).toHaveAttribute('cx', '30');
    expect(container.querySelector('circle')).toHaveAttribute('cy', '40');
  });

  test.each([0, 0.5, undefined])('respects the requested resampling precision %s', (precision) => {
    const { container } = renderWithSvg(
      <Projection data={[]} precision={precision}>
        {({ projection }) => <text>{projection.precision()}</text>}
      </Projection>,
    );
    expect(Number(container.querySelector('text')?.textContent)).toBeCloseTo(
      precision ?? Math.SQRT1_2,
    );
  });
});
