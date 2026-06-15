export type WarnCode = 'EMPTY_DATA' | 'NAN_IN_DATA';
export type WarnDetails = Readonly<Record<string, unknown>>;

export type KernelWarning<Code extends string = string> = {
  code: Code;
  details?: WarnDetails;
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
    if (warning.details) {
      console.warn(formatWarning(warning), warning.details);
    } else {
      console.warn(formatWarning(warning));
    }
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

function getDetailsKey(details?: WarnDetails) {
  if (!details) {
    return '';
  }

  try {
    return JSON.stringify(details);
  } catch {
    return '[unserializable]';
  }
}

export function devWarn<Code extends string>(
  code: Code,
  message: string,
  source?: string,
  details?: WarnDetails,
) {
  if (process.env.NODE_ENV === 'production') {
    return;
  }

  const warningSource = source ?? '@visx/kernel';
  const key = `${warningSource}:${code}:${message}:${getDetailsKey(details)}`;

  if (warnedMessages.has(key)) {
    return;
  }

  warnedMessages.add(key);
  warnHandler({ code, details, message, source: warningSource });
}
