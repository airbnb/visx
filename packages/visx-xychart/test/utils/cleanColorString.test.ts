import { cleanColor } from '../../src/utils/cleanColorString';

describe('cleanColorString', () => {
  describe('cleanColor', () => {
    it('should be defined', () => {
      expect(cleanColor).toBeDefined();
    });
    it('should return input color for non-url colors', () => {
      expect(cleanColor('violet')).toBe('violet');
    });
    it('should return a neutral color for url-containing colors', () => {
      expect(cleanColor('url(#id)')).not.toBe('url(#id)');
    });
  });
});
