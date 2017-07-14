import React from 'react';
import { compose, withState, withHandlers } from 'recompose';

export default compose(
  withState('brush', 'updateBrush', {
    start: undefined,
    end: undefined,
    domain: undefined,
    isBrushing: false,
  }),
  withHandlers({
    onBrushStart: ({ updateBrush }) => ({ x, y }) => {
      updateBrush(prevState => ({
        ...prevState,
        start: { x, y },
        isBrushing: true,
        end: undefined,
        domain: undefined,
      }));
    },
    onBrushDrag: ({ updateBrush }) => ({ x, y }) => {
      updateBrush(prevState => ({
        ...prevState,
        end: { x, y },
        domain: undefined,
      }));
    },
    onBrushEnd: ({ updateBrush }) => ({ x, y }) => {
      updateBrush((prevState) => {
        const { start } = prevState;
        return {
          ...prevState,
          isBrushing: false,
          domain: {
            x0: Math.min(start.x, x),
            x1: Math.max(start.x, x),
            y0: Math.min(start.y, y),
            y1: Math.max(start.y, y),
          },
        };
      });
    },
    onBrushReset: ({ updateBrush }) => (event) => {
      updateBrush(prevState => ({
        start: undefined,
        end: undefined,
        domain: undefined,
        isBrushing: false,
      }));
    },
  }),
);
