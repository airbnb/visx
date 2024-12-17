import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Group } from '../src';

describe('<Group />', () => {
  test('it should be defined', () => {
    expect(Group).toBeDefined();
  });

  test("it should have class='visx-group'", () => {
    const { container } = render(
      <svg>
        <Group />
      </svg>,
    );
    const group = container.querySelector('.visx-group');
    expect(group).toBeInTheDocument();
  });

  test('it should default props top=0 left=0', () => {
    const { container } = render(
      <svg>
        <Group />
      </svg>,
    );
    const group = container.querySelector('.visx-group');
    expect(group?.getAttribute('transform')).toBe('translate(0, 0)');
  });

  test('it should set props top, left, className', () => {
    const { container } = render(
      <svg>
        <Group className="test" top={3} left={4} />
      </svg>,
    );
    const group = container.querySelector('.visx-group');
    expect(group?.getAttribute('transform')).toBe('translate(4, 3)');
    expect(group?.getAttribute('class')).toBe('visx-group test');
  });

  test('it should set restProps', () => {
    const { container } = render(
      <svg>
        <Group clipPath="url(#myClip)" stroke="mapleSyrup" />
      </svg>,
    );
    const group = container.querySelector('.visx-group');
    expect(group?.getAttribute('clip-path')).toBe('url(#myClip)');
    expect(group?.getAttribute('stroke')).toBe('mapleSyrup');
  });
});
