import { useRef, useLayoutEffect, useState, useCallback } from 'react';
import ResizeObserver from 'resize-observer-polyfill';

const useResizeObserver = () => {
  const [resizeEntry, setResizeEntry] = useState({});
  const [node, setNode] = useState(null);
  const observerRef = useRef(null);

  const disconnect = useCallback(() => {
    if (observerRef.current) observerRef.current.disconnect();
  }, []);

  const observe = useCallback(() => {
    observerRef.current = new ResizeObserver(([entry]) => setResizeEntry(entry));
    if (node) observerRef.current.observe(node);
  }, [node]);

  useLayoutEffect(() => {
    observe();
    // disconnect on disposal
    return () => disconnect();
  }, [disconnect, observe]);

  return [setNode, resizeEntry];
};

export default useResizeObserver;
