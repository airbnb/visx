import { devWarn, resetWarnCache, setWarnHandler } from '../src/warnings';

describe('devWarn', () => {
  afterEach(() => {
    setWarnHandler(null);
    resetWarnCache();
  });

  it('dedupes warnings by source, code, and message', () => {
    const warnings: string[] = [];
    setWarnHandler(({ code, message, source }) => {
      warnings.push(`${source}:${code}:${message}`);
    });

    devWarn('TEST_WARNING', 'first message', '[@visx/kernel/test]');
    devWarn('TEST_WARNING', 'first message', '[@visx/kernel/test]');
    devWarn('TEST_WARNING', 'second message', '[@visx/kernel/test]');

    expect(warnings).toEqual([
      '[@visx/kernel/test]:TEST_WARNING:first message',
      '[@visx/kernel/test]:TEST_WARNING:second message',
    ]);
  });

  it('restores the previous handler with the cleanup function', () => {
    const warnings: string[] = [];
    const restore = setWarnHandler(({ message }) => {
      warnings.push(`custom:${message}`);
    });

    devWarn('TEST_WARNING', 'custom handler', '[@visx/kernel/test]');
    restore();

    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    devWarn('SECOND_WARNING', 'default handler', '[@visx/kernel/test]');

    expect(warnings).toEqual(['custom:custom handler']);
    expect(warnSpy).toHaveBeenCalledWith('[@visx/kernel/test] SECOND_WARNING: default handler');

    warnSpy.mockRestore();
  });
});
