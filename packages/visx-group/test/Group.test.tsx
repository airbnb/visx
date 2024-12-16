/** @jest-environment jsdom */
/**
 * LLM-GENERATED REFACTOR
 *
 * This file was migrated from Enzyme to RTL using generative AI.
 * To make the migration as clean as possible, the LLM was instructed to
 * use testing patterns similar to Enzyme.
 *
 * If you are making changes to this file, please consider refactoring
 * to more idiomatic RTL (and then removing this banner!).
 */
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
      </svg>
    );
    const group = container.querySelector('.visx-group');
    expect(group).toBeInTheDocument();
    expect(group?.getAttribute('class')).toBe('visx-group');
  });

  test('it should default props top=0 left=0', () => {
    const { container } = render(
      <svg>
        <Group />
      </svg>
    );
    const group = container.querySelector('.visx-group');
    expect(group?.getAttribute('transform')).toBe('translate(0, 0)');
  });

  test('it should set props top, left, className', () => {
    const { container } = render(
      <svg>
        <Group className="test" top={3} left={4} />
      </svg>
    );
    const group = container.querySelector('.visx-group');
    expect(group?.getAttribute('transform')).toBe('translate(4, 3)');
    expect(group?.getAttribute('class')).toBe('visx-group test');
  });

  test('it should set restProps', () => {
    const { container } = render(
      <svg>
        <Group clipPath="url(#myClip)" stroke="mapleSyrup" />
      </svg>
    );
    const group = container.querySelector('.visx-group');
    expect(group?.getAttribute('clip-path')).toBe('url(#myClip)');
    expect(group?.getAttribute('stroke')).toBe('mapleSyrup');
  });
});
// MIGRATION STATUS: {"eslint":"pending","jest":{"passed":5,"failed":0,"total":5,"skipped":0,"successRate":100},"tsc":"pending","enyzme":"converted"}
