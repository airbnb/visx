import React, { useContext } from 'react';
import { render } from '@testing-library/react';
import { EventEmitterProvider, EventEmitterContext } from '../../src';

describe('<EventEmitterProvider />', () => {
  it('should be defined', () => {
    expect(EventEmitterProvider).toBeDefined();
  });

  it('should provide an emitter for subscribing and emitting events', () => {
    expect.assertions(1);

    const EventEmitterConsumer = () => {
      const emitter = useContext(EventEmitterContext);
      expect(emitter).toMatchObject({ on: expect.any(Function), emit: expect.any(Function) });

      return null;
    };

    render(
      <EventEmitterProvider>
        <EventEmitterConsumer />
      </EventEmitterProvider>,
    );
  });
});
