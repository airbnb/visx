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
});
