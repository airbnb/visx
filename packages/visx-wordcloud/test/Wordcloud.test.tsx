import { render } from '@testing-library/react';
import React from 'react';
import { Wordcloud } from '../src';
import { WordcloudConfig } from '../src/useWordcloud';

const mockd3Cloud = {
  size: jest.fn(),
  words: jest.fn(),
  random: jest.fn(),
  font: jest.fn(),
  padding: jest.fn(),
  fontSize: jest.fn(),
  fontStyle: jest.fn(),
  fontWeight: jest.fn(),
  rotate: jest.fn(),
  spiral: jest.fn(),
  on: jest.fn(),
  start: jest.fn(),
  stop: jest.fn(),
};

jest.mock('d3-cloud', () => {
  return function d3cloud() {
    return mockd3Cloud;
  };
});

describe('<Wordcloud />', () => {
  afterEach(() => {
    for (const mockFn of Object.values(mockd3Cloud)) {
      mockFn.mockReset();
    }
  });
  test('it returns early if width or height is zero', () => {
    const childrenSpy = jest.fn();

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
    mockd3Cloud.on.mockImplementation((_, setWords) => setWords([mockWord]));
    const childrenSpy = jest.fn();

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

    render(<Wordcloud {...wordcloudConfig}>{jest.fn()}</Wordcloud>);

    expect(mockd3Cloud.size).toHaveBeenCalledWith([wordcloudConfig.width, wordcloudConfig.height]);
    expect(mockd3Cloud.font).toHaveBeenCalledWith(wordcloudConfig.font);
    expect(mockd3Cloud.fontSize).toHaveBeenCalledWith(wordcloudConfig.fontSize);
    expect(mockd3Cloud.fontStyle).toHaveBeenCalledWith(wordcloudConfig.fontStyle);
    expect(mockd3Cloud.fontWeight).toHaveBeenCalledWith(wordcloudConfig.fontWeight);
    expect(mockd3Cloud.padding).toHaveBeenCalledWith(wordcloudConfig.padding);
    expect(mockd3Cloud.random).toHaveBeenCalledWith(wordcloudConfig.random);
    expect(mockd3Cloud.rotate).toHaveBeenCalledWith(wordcloudConfig.rotate);
    expect(mockd3Cloud.spiral).toHaveBeenCalledWith(wordcloudConfig.spiral);
    expect(mockd3Cloud.words).toHaveBeenCalledWith(wordcloudConfig.words);
  });
});
