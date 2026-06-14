export type WarnCode = 'EMPTY_DATA' | 'NAN_IN_DATA';

export type KernelWarning<Code extends string = string> = {
  code: Code;
  message: string;
  source: string;
};

export type WarnHandler = (warning: KernelWarning) => void;

const warnedMessages = new Set<string>();

function formatWarning({ code, message, source }: KernelWarning) {
  return `${source} ${code}: ${message}`;
}

function defaultWarnHandler(warning: KernelWarning) {
  if (process.env.NODE_ENV !== 'production') {
    console.warn(formatWarning(warning));
  }
}

let warnHandler: WarnHandler = defaultWarnHandler;

export function setWarnHandler(handler?: WarnHandler | null) {
  const previousWarnHandler = warnHandler;

  warnHandler = handler ?? defaultWarnHandler;

  return () => {
    warnHandler = previousWarnHandler;
  };
}

export function resetWarnCache() {
  warnedMessages.clear();
}

export function devWarn<Code extends string>(code: Code, message: string, source = '@visx/kernel') {
  if (process.env.NODE_ENV === 'production') {
    return;
  }

  const key = `${source}:${code}:${message}`;

  if (warnedMessages.has(key)) {
    return;
  }

  warnedMessages.add(key);
  warnHandler({ code, message, source });
}
