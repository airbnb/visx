import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { scaleLinear } from '@visx/scale';

import { Legend } from '../src';

const defaultProps = {
  scale: scaleLinear<number>({
    range: [10, 0],
    round: true,
    domain: [0, 10],
  }),
};

describe('<Legend />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('it should be defined', () => {
    expect(Legend).toBeDefined();
  });

  test('it should default style to display: flex, flex-direction: column', () => {
    const { container } = render(<Legend {...defaultProps} />);
    const legend = container.firstChild as HTMLElement;
    expect(legend.style.display).toBe('flex');
    expect(legend.style.flexDirection).toBe('column');
  });

  test('it should extend style prop', () => {
    const { container } = render(<Legend {...defaultProps} style={{ display: 'block' }} />);
    const legend = container.firstChild as HTMLElement;
    expect(legend.style.display).toBe('block');
    expect(legend.style.flexDirection).toBe('column');
  });

  test('it should pass through direction prop to style prop', () => {
    const { container } = render(<Legend {...defaultProps} direction="row" />);
    const legend = container.firstChild as HTMLElement;
    expect(legend.style.display).toBe('flex');
    expect(legend.style.flexDirection).toBe('row');
  });

  test('it should pass through legendLabelProps to legend labels', () => {
    const style = { fontFamily: 'Comic Sans MS' };
    const { container } = render(<Legend {...defaultProps} legendLabelProps={{ style }} />);

    const labelElement = container.querySelector('[style*="font-family: Comic Sans MS"]');
    expect(labelElement).not.toBeNull();
    expect(labelElement).toBeInTheDocument();
  });
});
