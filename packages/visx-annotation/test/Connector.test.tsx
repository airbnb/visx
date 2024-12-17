import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Connector } from '../src';

describe('<Connector />', () => {
  it('should be defined', () => {
    expect(Connector).toBeDefined();
  });

  it('should render a path', () => {
    const { container } = render(
      <svg width={100} height={100}>
        <Connector />
      </svg>,
    );
    expect(container.querySelector('path')).toBeInTheDocument();
  });
});
