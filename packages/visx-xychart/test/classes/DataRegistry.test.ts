import DataRegistry from '../../src/classes/DataRegistry';

const data = { key: 'visx', data: [], xAccessor: () => 'x', yAccessor: () => 'y' };

describe('DataRegistry', () => {
  it('should be defined', () => {
    expect(DataRegistry).toBeDefined();
  });

  it('should register one data', () => {
    const reg = new DataRegistry();
    reg.registerData(data);
    expect(reg.get('visx')).toBe(data);
    expect(reg.keys()).toEqual(['visx']);
  });

  it('should register multiple data', () => {
    const data2 = { key: 'd3', data: [], xAccessor: () => 'x2', yAccessor: () => 'y2' };
    const reg = new DataRegistry();
    reg.registerData([data, data2]);
    expect(reg.get('visx')).toBe(data);
    expect(reg.get('d3')).toBe(data2);
    expect(reg.keys()).toEqual(['visx', 'd3']);
  });

  it('should de-register data', () => {
    const reg = new DataRegistry();
    reg.registerData(data);
    expect(reg.get('visx')).toBe(data);
    reg.unregisterData('visx');
    expect(reg.get('visx')).toBeUndefined();
  });
});
