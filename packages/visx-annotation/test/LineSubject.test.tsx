import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LineSubject } from '../src';

describe('<LineSubject />', () => {
  it('should be defined', () => {
    expect(LineSubject).toBeDefined();
  });

  it('should render a line', () => {
    const { container } = render(
      <svg width={100} height={100}>
        <LineSubject min={0} max={100} x={50} y={50} />
      </svg>,
    );
    const lineElement = container.querySelector('line');
    expect(lineElement).toBeInTheDocument();
  });
});
