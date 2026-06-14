import { useRef } from 'react';
import shallowEqual from './shallowEqual';

export type StructuralMemoDepth = 0 | 1;

function isEqual(previous: unknown, next: unknown, depth: StructuralMemoDepth) {
  return depth === 0 ? Object.is(previous, next) : shallowEqual(previous, next);
}

export default function useStructuralMemo<T>(value: T, depth: StructuralMemoDepth = 1): T {
  const valueRef = useRef(value);

  if (!isEqual(valueRef.current, value, depth)) {
    valueRef.current = value;
  }

  return valueRef.current;
}
