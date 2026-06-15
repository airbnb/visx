import { useRef } from 'react';

export default function useLatestRef<T>(value: T) {
  const valueRef = useRef(value);
  valueRef.current = value;
  return valueRef;
}
