/* This test verifies that these modules and types are exported correctly */
import {
  // @ts-expect-error Make sure invalid imports fail:
  INVALID_TYPE,
  color,
  cubehelix,
  lab,
  gray,
  hcl,
  HCLColor,
  LabColor,
  lch,
  RGBColor,
} from '@visx/vendor/d3-color';

describe('d3-color', () => {
  it('exports valid functions', () => {
    expect(color).toBeInstanceOf(Function);
  });
});
