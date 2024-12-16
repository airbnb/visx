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

import { PatternLines } from '../src';
import { PatternOrientationType } from '../src/constants';
import { pathForOrientation } from '../src/patterns/Lines';

describe('<PatternLines />', () => {
  test('it should be defined', () => {
    expect(PatternLines).toBeDefined();
  });

  test('it should require an id prop', () => {
    // @ts-expect-error allow invalid props
    expect(() => shallow(<PatternLines width={4} height={4} />)).toThrow();
  });

  test('it should require a width prop', () => {
    // @ts-expect-error allow invalid props
    expect(() => shallow(<PatternLines id="test" height={4} />)).toThrow();
  });

  test('it should require a height prop', () => {
    // @ts-expect-error allow invalid props
    expect(() => shallow(<PatternLines id="test" width={4} />)).toThrow();
  });

  test('it should render a rect background if background prop defined', () => {
    const wrapper = shallow(<PatternLines id="test" height={4} width={4} background="blue" />);
    expect(wrapper.find('rect')).toHaveLength(1);
  });

  test('it should not render a rect background if no background prop', () => {
    const wrapper = shallow(<PatternLines id="test" height={4} width={4} />);
    expect(wrapper.find('rect')).toHaveLength(0);
  });

  test('it should render only the specified pattern lines', () => {
    const size = 4;
    const orientation: PatternOrientationType[] = ['diagonal', 'diagonalRightToLeft'];
    const renderedPaths = orientation.map((o) =>
      pathForOrientation({ orientation: o, height: size }),
    );
    const wrapper = shallow(
      <PatternLines id="test" height={size} width={size} orientation={orientation} />,
    );
    expect(wrapper.find('path')).toHaveLength(2);
    expect(wrapper.find('path').map((path) => path.prop('d'))).toEqual(renderedPaths);
  });
});
// MIGRATION STATUS: {"eslint":"pending","jest":{"passed":7,"failed":0,"total":7,"skipped":0,"successRate":100},"tsc":"pending","enyzme":"pending"}
