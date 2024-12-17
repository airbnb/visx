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
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

import { withTooltip } from '../src';

const DummyComponent = () => null;

const DummyComponentWithDefaultTooltip = withTooltip(DummyComponent);
const DummyComponentWithCustomContainerPropsTooltip = withTooltip(DummyComponent, {
  style: { position: 'static' },
});
const DummyComponentWithNoContainerTooltip = withTooltip(
  DummyComponent,
  undefined,
  (children) => children,
);

describe('withTooltip()', () => {
  afterEach(cleanup);

  test('it should be defined', () => {
    expect(withTooltip).toBeDefined();
  });

  test('it should render a default container', () => {
    const { container } = render(<DummyComponentWithDefaultTooltip />);
    const div = container.querySelector('div');

    expect(div).toBeInTheDocument();
    expect(div).toHaveStyle({
      position: 'relative',
      width: 'inherit',
      height: 'inherit'
    });
  });

  test('it should pass custom props to the container', () => {
    const { container } = render(<DummyComponentWithCustomContainerPropsTooltip />);
    const div = container.querySelector('div');

    expect(div).toBeInTheDocument();
    expect(div).toHaveStyle({
      position: 'static'
    });
  });

  test('it should render with a custom container', () => {
    const { container } = render(<DummyComponentWithNoContainerTooltip />);
    const div = container.querySelector('div');

    expect(div).not.toBeInTheDocument();
  });
});
// MIGRATION STATUS: {"eslint":"pending","jest":{"passed":4,"failed":0,"total":4,"skipped":0,"successRate":100},"tsc":"pending","enyzme":"converted"}
