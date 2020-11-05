import React, { useRef } from 'react';
import { mount } from 'enzyme';
import { useDrag } from '../src';
import { UseDragOptions } from '../lib/useDrag';

describe('useDrag', () => {
  test('it should be defined', () => {
    expect(useDrag).toBeDefined();
  });
  test('should provide UseDrag', () => {
    expect.assertions(1);

    function Consumer() {
      const drag = useDrag({ x: 0, y: 0 });
      expect(drag).toMatchObject({
        x: 0,
        y: 0,
        dx: 0,
        dy: 0,
        isDragging: false,
        dragStart: expect.any(Function),
        dragMove: expect.any(Function),
        dragEnd: expect.any(Function),
      });

      return null;
    }

    mount(<Consumer />);
  });

  test('should update drag state when useDrag options change', () => {
    expect.assertions(3);

    const options1 = { x: 1, y: 2, dx: 3, dy: 4 };
    const options2 = { x: -1, y: -2, dx: -3, dy: -4 };

    function Consumer({ x, y, dx, dy }: Pick<UseDragOptions, 'x' | 'y' | 'dx' | 'dy'>) {
      const renderCount = useRef(0);
      const drag = useDrag({ x, y, dx, dy });

      // when this component's props change options1 => 2, it takes one
      // additional render for the `useDrag` state to update to options2
      expect(drag).toMatchObject(renderCount.current <= 1 ? options1 : options2);
      renderCount.current += 1;
      return null;
    }

    const wrapper = mount(<Consumer {...options1} />);
    wrapper.setProps(options2);
  });
});
