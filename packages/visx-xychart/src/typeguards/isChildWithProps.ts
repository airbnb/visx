import React from 'react';

/** Returns whether the React.ReactNode has props (and therefore is an `Element` versus primative type) */
export default function isChildWithProps<P extends object>(
  child: React.ReactNode,
): child is React.ComponentType<P> {
  return !!child && typeof child === 'object' && 'props' in child && child.props != null;
}
