import getXAndYFromEvent from '../src/getXAndYFromEvent';

describe('getXAndYFromEvent()', () => {
  it('should return { x: 0, y: 0 } if no event argument', () => {
    const result = getXAndYFromEvent();
    // @ts-ignore
    const result2 = getXAndYFromEvent(null);
    expect(result).toEqual({ x: 0, y: 0 });
    expect(result2).toEqual({ x: 0, y: 0 });
  });

  it('should return { x, y } for mouse events', () => {
    const e = { clientX: 0, clientY: 0 };
    const result = getXAndYFromEvent(e as MouseEvent);
    expect(result).toEqual({ x: e.clientX, y: e.clientY });
  });

  it('should return { x, y } for touch events with changedTouches', () => {
    const touch0 = { clientX: 0, clientY: 0 };
    const touch1 = { clientX: 1, clientY: 1 };
    const e = { changedTouches: [touch0, touch1] };
    const result = getXAndYFromEvent(e as unknown as TouchEvent);
    expect(result).toEqual({ x: touch0.clientX, y: touch0.clientY });
  });

  it('should return { x: 0, y: 0 } for touch events with no changedTouches', () => {
    const e = { changedTouches: [] };
    const result = getXAndYFromEvent(e as unknown as TouchEvent);
    expect(result).toEqual({ x: 0, y: 0 });
  });

  it('should return the middle of an element for focus events', () => {
    const e = { target: { getBoundingClientRect: () => ({ x: 5, y: 5, width: 10, height: 2 }) } };
    const result = getXAndYFromEvent(e as unknown as FocusEvent);
    expect(result).toEqual({ x: 10, y: 6 });
  });
});
