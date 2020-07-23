import { scaleOrdinal } from '../src';

describe('scaleOrdinal', () => {
  it('should be defined', () => {
    expect(scaleOrdinal).toBeDefined();
  });
  it('set domain', () => {
    const domain = ['noodle', 'burger'];
    const scale = scaleOrdinal({ domain });
    expect(scale.domain()).toEqual(domain);
  });
  it('set range', () => {
    const range = ['red', 'green'];
    const scale = scaleOrdinal({ range });
    expect(scale.range()).toEqual(range);
  });
  it('set unknown', () => {
    const scale = scaleOrdinal({ domain: ['noodle', 'burger'], unknown: 'green' });
    expect(scale('sandwich')).toEqual('green');
  });
});
