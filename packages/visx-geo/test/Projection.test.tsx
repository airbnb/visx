/**
 * LLM-GENERATED REFACTOR
 *
 * This file was migrated from Enzyme to RTL using generative AI.
 * To make the migration as clean as possible, the LLM was instructed to
 * use testing patterns similar to Enzyme.
 *
 * If you are making changes to this file, please consider refactoring
 * to more idiomatic RTL (and then removing this banner!).
 */
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { feature } from 'topojson-client';
import { GeometryCollection } from 'geojson';
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
        }
      ]
    }
  },
  arcs: [
    [[0, 0], [0, 1]],
    [[1, 1], [1, 0]],
    [[0, 0], [1, 0]],
    [[1, 1], [0, 1]]
  ]
};

describe('<Projection />', () => {
  // Create valid test data
  const data = feature(
    mockTopology,
    mockTopology.objects.collection
  ).features as GeometryCollection[];

  const defaultProps = { data };

  const renderWithSvg = (ui: React.ReactElement) =>
    render(<svg>{ui}</svg>);

  test('it should be defined', () => {
    expect(() => renderWithSvg(<Projection {...defaultProps} />)).not.toThrow();
  });

  test('it should pass className', () => {
    const { container } = renderWithSvg(
      <Projection className="visx-new" {...defaultProps} />
    );
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
    const { container } = renderWithSvg(
      <Projection stroke="red" {...defaultProps} />
    );
    const paths = container.querySelectorAll('path');
    paths.forEach(path => {
      expect(path).toHaveAttribute('stroke', 'red');
    });
  });

  test('it should call projectionFunc prop function', () => {
    const projectionFunc = jest.fn();
    renderWithSvg(
      <Projection projectionFunc={projectionFunc} {...defaultProps} />
    );
    expect(projectionFunc).toHaveBeenCalledTimes(1);
    // Verify projection is passed
    expect(projectionFunc.mock.calls[0][0]).toBeDefined();
  });

  test('it should call centroid prop function', () => {
    const centroid = jest.fn();
    renderWithSvg(
      <Projection centroid={centroid} {...defaultProps} />
    );
    expect(centroid).toHaveBeenCalledTimes(2);
    // Verify centroid coordinates and feature are passed
    expect(centroid.mock.calls[0][0]).toEqual(expect.any(Array));
    expect(centroid.mock.calls[0][1]).toEqual(expect.any(Object));
  });
});
// MIGRATION STATUS: {"eslint":"pending","jest":{"passed":6,"failed":0,"total":6,"skipped":0,"successRate":100},"tsc":"pending","enyzme":"converted"}
