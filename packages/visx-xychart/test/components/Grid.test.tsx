import * as React from 'react';
import { render } from '@testing-library/react';
import { Grid, AnimatedGrid, DataContext } from '../../src';
import getDataContext from '../mocks/getDataContext';

const mockContext = getDataContext();

describe('<Grid />', () => {
  it('should be defined', () => {
    expect(Grid).toBeDefined();
  });
  it('should render VxGridRows if rows=true', () => {
    const { container } = render(
      <DataContext.Provider value={mockContext}>
        <svg>
          <Grid rows columns={false} />
        </svg>
      </DataContext.Provider>,
    );
    expect(container.querySelectorAll('.visx-rows')).toHaveLength(1);
    expect(container.querySelectorAll('.visx-columns')).toHaveLength(0);
  });
  it('should render VxGridColumns if columns=true', () => {
    const { container } = render(
      <DataContext.Provider value={mockContext}>
        <svg>
          <Grid rows={false} columns />
        </svg>
      </DataContext.Provider>,
    );
    expect(container.querySelectorAll('.visx-rows')).toHaveLength(0);
    expect(container.querySelectorAll('.visx-columns')).toHaveLength(1);
  });
});

describe('<AnimatedGrid />', () => {
  it('should be defined', () => {
    expect(AnimatedGrid).toBeDefined();
  });
  it('should render VxAnimatedGridRows if rows=true', () => {
    const { container } = render(
      <DataContext.Provider value={mockContext}>
        <svg>
          <AnimatedGrid rows columns={false} />
        </svg>
      </DataContext.Provider>,
    );
    expect(container.querySelectorAll('.visx-rows')).toHaveLength(1);
    expect(container.querySelectorAll('.visx-columns')).toHaveLength(0);
  });
  it('should render VxAnimatedGridColumns if columns=true', () => {
    const { container } = render(
      <DataContext.Provider value={mockContext}>
        <svg>
          <AnimatedGrid rows={false} columns />
        </svg>
      </DataContext.Provider>,
    );
    expect(container.querySelectorAll('.visx-rows')).toHaveLength(0);
    expect(container.querySelectorAll('.visx-columns')).toHaveLength(1);
  });
});
