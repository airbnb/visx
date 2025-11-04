import { curveBasis, stackOrderDescending, stackOffsetExpand } from '@visx/vendor/d3-shape';
import { arc, area, pie, line, radialLine, stack } from '../../src/util/D3ShapeFactories';

describe('D3ShapeFactories', () => {
  describe('arc()', () => {
    it('innerRadius', () => {
      expect(arc({ innerRadius: 1 }).innerRadius()({})).toBe(1);
    });
    it('outerRadius', () => {
      expect(arc({ outerRadius: 1 }).outerRadius()({})).toBe(1);
    });
    it('cornerRadius', () => {
      expect(arc({ cornerRadius: 1 }).cornerRadius()({})).toBe(1);
    });
    it('startAngle', () => {
      expect(arc({ startAngle: 1 }).startAngle()({})).toBe(1);
    });
    it('endAngle', () => {
      expect(arc({ endAngle: 1 }).endAngle()({})).toBe(1);
    });
    it('padAngle', () => {
      expect(arc({ padAngle: 1 }).padAngle()({})).toBe(1);
    });
    it('padRadius', () => {
      expect(arc({ padRadius: 1 }).padRadius()!({})).toBe(1);
    });
  });

  describe('area()', () => {
    it('x', () => {
      expect(area({ x: 1 }).x()({}, 0, [])).toBe(1);
    });
    it('x0', () => {
      expect(area({ x0: 1 }).x0()({}, 0, [])).toBe(1);
    });
    it('x1', () => {
      expect(area({ x1: 1 }).x1()!({}, 0, [])).toBe(1);
    });
    it('y', () => {
      expect(area({ y: 1 }).y()({}, 0, [])).toBe(1);
    });
    it('y0', () => {
      expect(area({ y0: 1 }).y0()({}, 0, [])).toBe(1);
    });
    it('y1', () => {
      expect(area({ y1: 1 }).y1()!({}, 0, [])).toBe(1);
    });
    it('defined', () => {
      expect(area({ defined: () => true }).defined()({}, 0, [])).toBe(true);
    });
    it('curve', () => {
      expect(area({ curve: curveBasis }).curve()).toEqual(curveBasis);
    });
  });

  describe('line()', () => {
    it('x', () => {
      expect(line({ x: 1 }).x()({}, 0, [])).toBe(1);
    });
    it('y', () => {
      expect(line({ y: 1 }).y()({}, 0, [])).toBe(1);
    });
    it('defined', () => {
      expect(line({ defined: () => true }).defined()({}, 0, [])).toBe(true);
    });
    it('curve', () => {
      expect(line({ curve: curveBasis }).curve()).toEqual(curveBasis);
    });
  });

  describe('pie()', () => {
    it('startAngle', () => {
      expect(pie({ startAngle: 1 }).startAngle()([])).toBe(1);
    });
    it('endAngle', () => {
      expect(pie({ endAngle: 1 }).endAngle()([])).toBe(1);
    });
    it('padAngle', () => {
      expect(pie({ padAngle: 1 }).padAngle()([])).toBe(1);
    });
    it('value', () => {
      expect(pie({ value: () => 1 }).value()({}, 1, [])).toBe(1);
    });
    it('sort', () => {
      expect(pie({ sort: () => 1 }).sort()!({}, {})).toBe(1);
    });
    it('sortValues', () => {
      expect(pie({ sortValues: () => 1 }).sortValues()!(2, 1)).toBe(1);
    });
  });

  describe('radialLine()', () => {
    it('angle', () => {
      expect(radialLine({ angle: 1 }).angle()({}, 1, [])).toBe(1);
    });
    it('radius', () => {
      expect(radialLine({ radius: 1 }).radius()({}, 1, [])).toBe(1);
    });
    it('defined', () => {
      expect(radialLine({ defined: () => true }).defined()({}, 0, [])).toBe(true);
    });
    it('curve', () => {
      expect(radialLine({ curve: curveBasis }).curve()).toEqual(curveBasis);
    });
  });

  describe('stack()', () => {
    it('keys', () => {
      expect(stack({ keys: ['a', 'b', 'c'] }).keys()([])).toEqual(['a', 'b', 'c']);
    });
    it('value', () => {
      expect(stack({ value: () => 1 }).value()({}, '', 1, [])).toBe(1);
    });
    it('order', () => {
      expect(stack({ order: 'descending' }).order()).toEqual(stackOrderDescending);
    });
    it('offset', () => {
      expect(stack({ offset: 'expand' }).offset()).toEqual(stackOffsetExpand);
    });
  });
});
