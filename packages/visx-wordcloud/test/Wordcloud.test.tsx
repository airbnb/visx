import { vi } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import { Wordcloud } from '../src';
import type { WordcloudConfig } from '../src/types';

const mocked3Cloud = {
  size: vi.fn(),
  words: vi.fn(),
  random: vi.fn(),
  font: vi.fn(),
  padding: vi.fn(),
  fontSize: vi.fn(),
  fontStyle: vi.fn(),
  fontWeight: vi.fn(),
  rotate: vi.fn(),
  spiral: vi.fn(),
  on: vi.fn(),
  start: vi.fn(),
  stop: vi.fn(),
};

vi.mock('d3-cloud', () => ({ default: () => mocked3Cloud }));

describe('<Wordcloud />', () => {
  afterEach(() => {
    for (const mockFn of Object.values(mocked3Cloud)) {
      mockFn.mockReset();
    }
  });
  test('it returns early if width or height is zero', () => {
    const childrenSpy = vi.fn();

    const { rerender } = render(
      <Wordcloud width={100} height={0} words={[{ text: 'bla', value: 1 }]}>
        {childrenSpy}
      </Wordcloud>,
    );

    expect(childrenSpy).not.toHaveBeenCalled();

    rerender(
      <Wordcloud width={0} height={200} words={[{ text: 'bla', value: 1 }]}>
        {childrenSpy}
      </Wordcloud>,
    );
    expect(childrenSpy).not.toHaveBeenCalled();
  });

  test('it passes d3 cloud words to the children render function', () => {
    const mockWord = { text: 'myMockedWord' };
    mocked3Cloud.on.mockImplementation(
      (_: unknown, setWords: (words: { text: string }[]) => void) => setWords([mockWord]),
    );
    const childrenSpy = vi.fn();

    render(
      <Wordcloud width={100} height={100} words={[{ text: 'bla', value: 1 }]}>
        {childrenSpy}
      </Wordcloud>,
    );

    expect(childrenSpy).toHaveBeenLastCalledWith([mockWord]);
  });

  test('it sets the config on the d3 cloud', () => {
    const wordcloudConfig: WordcloudConfig<{ text: string }> = {
      font: 'Impact',
      fontSize: 14,
      fontStyle: 'normal',
      fontWeight: 'bold',
      height: 200,
      width: 300,
      padding: 4,
      random: () => 0.5,
      rotate: 0,
      spiral: 'archimedean',
      words: [{ text: 'myMockedWord' }],
    };

    render(<Wordcloud {...wordcloudConfig}>{vi.fn()}</Wordcloud>);

    expect(mocked3Cloud.size).toHaveBeenCalledWith([wordcloudConfig.width, wordcloudConfig.height]);
    expect(mocked3Cloud.font).toHaveBeenCalledWith(wordcloudConfig.font);
    expect(mocked3Cloud.fontSize).toHaveBeenCalledWith(wordcloudConfig.fontSize);
    expect(mocked3Cloud.fontStyle).toHaveBeenCalledWith(wordcloudConfig.fontStyle);
    expect(mocked3Cloud.fontWeight).toHaveBeenCalledWith(wordcloudConfig.fontWeight);
    expect(mocked3Cloud.padding).toHaveBeenCalledWith(wordcloudConfig.padding);
    expect(mocked3Cloud.random).toHaveBeenCalledWith(wordcloudConfig.random);
    expect(mocked3Cloud.rotate).toHaveBeenCalledWith(wordcloudConfig.rotate);
    expect(mocked3Cloud.spiral).toHaveBeenCalledWith(wordcloudConfig.spiral);
    expect(mocked3Cloud.words).toHaveBeenCalledWith(wordcloudConfig.words);
  });
});
