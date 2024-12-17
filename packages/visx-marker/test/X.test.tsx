import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { MarkerX } from '../src';

describe('<MarkerX />', () => {
  test('it should be defined', () => {
    expect(MarkerX).toBeDefined();
  });

  test('it should render marker with 45 degree rotation', () => {
    const { container } = render(
      <svg>
        <defs>
          <MarkerX id="marker-x-test" />
        </defs>
      </svg>,
    );

    const marker = container.querySelector('#marker-x-test');
    expect(marker).toBeInTheDocument();
    expect(marker).toHaveAttribute('orient', '45');
  });
});
