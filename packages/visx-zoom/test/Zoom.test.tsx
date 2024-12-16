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
import { render } from 'enzyme';
import { Zoom, inverseMatrix } from '../src';

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

    const wrapper = render(
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
          return <div>{[scaleX, scaleY, translateX, translateY].join(',')}</div>;
        }}
      </Zoom>,
    );

    expect(wrapper.html()).toBe('1.27,1.27,-211.62,162.59');
  });
});

describe('inverseMatrix', () => {
  it('should be defined', () => {
    expect(inverseMatrix).toBeDefined();
  });
});
// MIGRATION STATUS: {"eslint":"pending","jest":{"passed":0,"failed":0,"total":0,"skipped":0,"successRate":0},"tsc":"pending","enyzme":"pending"}
