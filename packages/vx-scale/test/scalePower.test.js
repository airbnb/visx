import { scalePower } from '../src';

describe('scalePower', () => {
  test('it should be defined', () => {
    expect(scalePower).toBeDefined()
  })

  test('exponent param should set scale exponent', () => {
    const exponent = 2;
    const scale = scalePower({ exponent })
    expect(scale.exponent()).toEqual(exponent)
  })

  test('range param should set scale range', () => {
    const range = [2,3]
    const scale = scalePower({ range })
    expect(scale.range()).toEqual(range)
  })

  test('domain param should set scale domain', () => {
    const domain = [0, 350];
    const scale = scalePower({ domain })
    expect(scale.domain()).toEqual(domain)
  })

})
