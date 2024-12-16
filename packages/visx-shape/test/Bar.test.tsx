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
import { shallow } from 'enzyme';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Bar } from '../src';

const BarWrapper = (restProps = {}) => shallow(<Bar {...restProps} />);

describe('<Bar />', () => {
  test('it should be defined', () => {
    expect(Bar).toBeDefined();
  });

  test('it should have the .visx-bar class', () => {
    expect(
      BarWrapper({
        className: 'test',
      }).prop('className'),
    ).toBe('visx-bar test');
  });

  test('it should expose its ref via an innerRef prop', () => {
    const fakeRef = React.createRef<SVGRectElement>();
    const { container } = render(
      <svg>
        <Bar innerRef={fakeRef} />
      </svg>,
    );
    const RectElement = container.querySelector('rect');
    expect(fakeRef.current).toContainElement(RectElement);
  });
});
// MIGRATION STATUS: {"eslint":"pending","jest":{"passed":0,"failed":0,"total":0,"skipped":0,"successRate":0},"tsc":"pending","enyzme":"pending"}
