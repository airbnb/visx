import type { CSSVarName } from './types';

export default function cssVar(name: CSSVarName, fallback?: string): string {
  return fallback == null ? `var(${name})` : `var(${name}, ${fallback})`;
}
