import React, { useContext } from 'react';
import { mount } from 'enzyme';
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

    mount(
      <EventEmitterProvider>
        <EventEmitterConsumer />
      </EventEmitterProvider>,
    );
  });
});
