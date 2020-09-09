import { scaleBand, scalePoint, scaleOrdinal } from '@visx/scale';
import getBandwidth from '../../src/util/getBandwidth';

describe('getBandwidth()', () => {
  it('returns bandwidth for scales that natively supports', () => {
    const scale1 = scaleBand({ domain: ['bacon', 'egg'], range: [0, 100] });
    expect(getBandwidth(scale1)).toEqual(50);
    const scale2 = scalePoint({ domain: ['bacon', 'egg'], range: [0, 100] });
    expect(getBandwidth(scale2)).toEqual(0);
  });
  it('otherwise compute band from domain and range', () => {
    const scale = scaleOrdinal({ domain: ['bacon', 'egg'], range: [0, 100] });
    expect(getBandwidth(scale)).toEqual(50);
  });
});
