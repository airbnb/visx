import { browserUsage } from '../src';

describe('mocks/browserUsage', () => {
  test('it should be defined', () => {
    expect(browserUsage).toBeDefined();
  });

  test('it should be an array', () => {
    expect(browserUsage.length).toBeDefined();
  });

  test('it should return [{ date, browser names }]', () => {
    const data = browserUsage;
    expect(data[0].date).toBeDefined();
    expect(data[0]['Google Chrome']).toBeDefined();
    expect(data[0]['Microsoft Edge']).toBeDefined();
    expect(data[0]['Internet Explorer']).toBeDefined();
    expect(data[0].Safari).toBeDefined();
    expect(data[0].Opera).toBeDefined();
    expect(data[0].Mozilla).toBeDefined();
    expect(data[0].Firefox).toBeDefined();
    expect(data[0]['Other/Unknown']).toBeDefined();
  });
});
