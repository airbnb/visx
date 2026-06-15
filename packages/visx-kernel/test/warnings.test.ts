import { devWarn, resetWarnCache, setWarnHandler } from '../src/warnings';

describe('devWarn', () => {
  afterEach(() => {
    setWarnHandler(null);
    resetWarnCache();
  });

  it('dedupes warnings by source, code, message, and details', () => {
    const warnings: string[] = [];
    setWarnHandler(({ code, details, message, source }) => {
      warnings.push(`${source}:${code}:${message}:${JSON.stringify(details)}`);
    });

    devWarn('TEST_WARNING', 'first message', '[@visx/kernel/test]', { count: 1 });
    devWarn('TEST_WARNING', 'first message', '[@visx/kernel/test]', { count: 1 });
    devWarn('TEST_WARNING', 'first message', '[@visx/kernel/test]', { count: 2 });

    expect(warnings).toEqual([
      '[@visx/kernel/test]:TEST_WARNING:first message:{"count":1}',
      '[@visx/kernel/test]:TEST_WARNING:first message:{"count":2}',
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

  it('passes details to the default console warning', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    devWarn('TEST_WARNING', 'with details', '[@visx/kernel/test]', { count: 3 });

    expect(warnSpy).toHaveBeenCalledWith('[@visx/kernel/test] TEST_WARNING: with details', {
      count: 3,
    });

    warnSpy.mockRestore();
  });
});
