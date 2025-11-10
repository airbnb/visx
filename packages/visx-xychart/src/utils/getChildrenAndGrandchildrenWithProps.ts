import type { ReactElement, ReactNode } from 'react';
import { Children } from 'react';

/** Returns whether the ReactNode has props (and therefore is an `Element` versus primitive type) */
function isChildWithProps<P extends object>(child: ReactNode): child is ReactElement<P> {
  return !!child && typeof child === 'object' && 'props' in child && child.props != null;
}

/**
 * Returns children and grandchildren of type ReactNode.
 * Flattens children one level to support Fragments and Array type children.
 */
export default function getChildrenAndGrandchildrenWithProps<P extends object>(
  children: ReactNode,
): ReactElement<P>[] {
  return Children.toArray(children)
    .flatMap((child) => {
      if (isChildWithProps(child) && (child.props as any).children) {
        return (child.props as any).children;
      }
      return child;
    })
    .filter((child) => isChildWithProps<P>(child)) as unknown as ReactElement<P>[];
}
