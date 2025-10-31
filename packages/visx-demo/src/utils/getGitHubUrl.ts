/**
 * Generate a GitHub URL for a source file
 * @param filePath - Relative file path from packages/ (e.g., "visx-legend/src/legends/Linear.tsx")
 * @param lineNumber - Line number in the file
 * @returns GitHub URL to the source file
 */
export function getGitHubUrl(filePath?: string, lineNumber?: number): string | undefined {
  if (!filePath) return undefined;

  const baseUrl = 'https://github.com/airbnb/visx/blob/master/packages';
  const url = `${baseUrl}/${filePath}`;

  return lineNumber ? `${url}#L${lineNumber}` : url;
}
