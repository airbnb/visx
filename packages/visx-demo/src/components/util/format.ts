export function toExportName(displayName: string) {
  const isComponent = !!(displayName && displayName[0].toLowerCase() !== displayName[0]);
  if (isComponent) {
    return `\u003C${displayName} /\u003E`;
  }
  return `${displayName}()`;
}
