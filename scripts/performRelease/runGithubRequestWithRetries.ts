const REQUEST_DELAY_MS = 1000;
const RETRY_DELAYS_MS = [60_000, 120_000];

function wait(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === 'string') {
    return error;
  }

  try {
    return JSON.stringify(error) ?? String(error);
  } catch {
    return String(error);
  }
}

function getErrorStatus(error: unknown) {
  const status =
    typeof error === 'object' && error !== null && 'status' in error ? error.status : null;

  return typeof status === 'number' ? status : null;
}

function isRetryableGitHubRequestError(error: unknown) {
  const status = getErrorStatus(error);
  const message = getErrorMessage(error);

  return (
    status === 429 ||
    status === 500 ||
    status === 502 ||
    status === 503 ||
    status === 504 ||
    /rate limit|secondary limit|premature close|socket hang up|econnreset|etimedout|eai_again|fetch failed/i.test(
      message,
    )
  );
}

export async function pauseBetweenGitHubRequests() {
  await wait(REQUEST_DELAY_MS);
}

export default async function runGithubRequestWithRetries<T>(
  label: string,
  request: () => Promise<T>,
  attempt = 0,
): Promise<T> {
  try {
    return await request();
  } catch (error) {
    const delayMs = RETRY_DELAYS_MS[attempt];

    if (!isRetryableGitHubRequestError(error) || delayMs === undefined) {
      throw error;
    }

    console.warn(
      `${label} hit a retryable GitHub request error. Retrying in ${
        delayMs / 1000
      }s: ${getErrorMessage(error)}`,
    );
    await wait(delayMs);
    return runGithubRequestWithRetries(label, request, attempt + 1);
  }
}
