import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Zoom, inverseMatrix } from '../src';
import { CreateGestureHandlers } from '../lib/types';

describe('<Zoom />', () => {
  it('should be defined', () => {
    expect(Zoom).toBeDefined();
  });

  it('should render the children and pass zoom params', () => {
    const initialTransform = {
      scaleX: 1.27,
      scaleY: 1.27,
      translateX: -211.62,
      translateY: 162.59,
      skewX: 0,
      skewY: 0,
    };

    render(
      <Zoom
        width={400}
        height={400}
        scaleXMin={1 / 2}
        scaleXMax={4}
        scaleYMin={1 / 2}
        scaleYMax={4}
        initialTransformMatrix={initialTransform}
      >
        {({ transformMatrix }) => {
          const { scaleX, scaleY, translateX, translateY } = transformMatrix;
          return (
            <div data-testid="zoom-child">{[scaleX, scaleY, translateX, translateY].join(',')}</div>
          );
        }}
      </Zoom>,
    );
    expect(screen.getByTestId('zoom-child').innerHTML).toBe('1.27,1.27,-211.62,162.59');
  });
  it('should accept custom gesture handlers', () => {
    const onClick = jest.fn();

    const createGestureHandlers: CreateGestureHandlers = () => ({ onClick });

    render(
      <Zoom<HTMLButtonElement>
        width={400}
        height={400}
        createGestureHandlers={createGestureHandlers}
      >
        {({ containerRef }) => <button type="button" ref={containerRef} />}
      </Zoom>,
    );

    const button = screen.getByRole('button');
    userEvent.click(button);
    expect(onClick.mock.calls).toHaveLength(1);
  });
});

describe('inverseMatrix', () => {
  it('should be defined', () => {
    expect(inverseMatrix).toBeDefined();
  });
});
