/** @jest-environment jsdom */
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
import { scaleLinear } from '@visx/scale';
import { GridPolar } from '../src';
import GridAngle from '../src/grids/GridAngle';
import GridRadial from '../src/grids/GridRadial';

jest.mock('../src/grids/GridAngle', () => ({
  __esModule: true,
  default: jest.fn(() => null)
}));

jest.mock('../src/grids/GridRadial', () => ({
  __esModule: true,
  default: jest.fn(() => null)
}));

const gridProps = {
  innerRadius: 0,
  outerRadius: 10,
  scaleAngle: scaleLinear({ range: [1, 100], domain: [1, 10] }),
  scaleRadial: scaleLinear({ range: [1, 100], domain: [1, 10] }),
};

describe('<GridPolar />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(GridPolar).toBeDefined();
  });

  it('should render with class .visx-grid-polar', () => {
    const { container } = render(
      <svg>
        <GridPolar {...gridProps} />
      </svg>
    );
    expect(container.querySelector('.visx-grid-polar')).toBeInTheDocument();
  });

  it('should render both GridAngle & GridRadial', () => {
    render(
      <svg>
        <GridPolar {...gridProps} />
      </svg>
    );
    
    const mockGridAngle = GridAngle as jest.Mock;
    const mockGridRadial = GridRadial as jest.Mock;
    
    expect(mockGridAngle).toHaveBeenCalled();
    expect(mockGridRadial).toHaveBeenCalled();
  });
});
// MIGRATION STATUS: {"eslint":"pending","jest":{"passed":3,"failed":0,"total":3,"skipped":0,"successRate":100},"tsc":"pending","enyzme":"converted"}
