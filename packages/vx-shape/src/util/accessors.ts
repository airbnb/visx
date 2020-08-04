import { $TSFIXME } from '../types';

export function getX(l?: { x?: unknown }) {
  return typeof l?.x === 'number' ? l?.x : 0;
}

export function getY(l?: { y?: unknown }) {
  return typeof l?.y === 'number' ? l?.y : 0;
}

export function getSource(l: $TSFIXME) {
  return l?.source;
}

export function getTarget(l: $TSFIXME) {
  return l?.target;
}
