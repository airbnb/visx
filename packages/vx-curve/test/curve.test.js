import {
  curveBasis,
  curveBasisClosed,
  curveBasisOpen,
  curveStep,
  curveStepAfter,
  curveStepBefore,
  curveBundle,
  curveLinear,
  curveLinearClosed,
  curveCardinal,
  curveCardinalClosed,
  curveCardinalOpen,
  curveCatmullRom,
  curveCatmullRomClosed,
  curveCatmullRomOpen,
  curveMonotoneX,
  curveMonotoneY,
  curveNatural,
} from '../src';

describe('curves', () => {
  test('curveBasis', () => {
    expect(curveBasis).toBeDefined();
  });

  test('curveBasisClosed', () => {
    expect(curveBasisClosed).toBeDefined();
  });

  test('curveBasisOpen', () => {
    expect(curveBasisOpen).toBeDefined();
  });

  test('curveStep', () => {
    expect(curveStep).toBeDefined();
  });

  test('curveStepAfter', () => {
    expect(curveStepAfter).toBeDefined();
  });

  test('curveStepBefore', () => {
    expect(curveStepBefore).toBeDefined();
  });

  test('curveBundle', () => {
    expect(curveBundle).toBeDefined();
  });

  test('curveLinear', () => {
    expect(curveLinear).toBeDefined();
  });

  test('curveLinearClosed', () => {
    expect(curveLinearClosed).toBeDefined();
  });

  test('curveCardinal', () => {
    expect(curveCardinal).toBeDefined();
  });

  test('curveCardinalClosed', () => {
    expect(curveCardinalClosed).toBeDefined();
  });

  test('curveCardinalOpen', () => {
    expect(curveCardinalOpen).toBeDefined();
  });

  test('curveCatmullRom', () => {
    expect(curveCatmullRom).toBeDefined();
  });

  test('curveCatmullRomClosed', () => {
    expect(curveCatmullRomClosed).toBeDefined();
  });

  test('curveCatmullRomOpen', () => {
    expect(curveCatmullRomOpen).toBeDefined();
  });

  test('curveMonotoneX', () => {
    expect(curveMonotoneX).toBeDefined();
  });

  test('curveMonotoneY', () => {
    expect(curveMonotoneY).toBeDefined();
  });

  test('curveNatural', () => {
    expect(curveNatural).toBeDefined();
  });
});
