import React from 'react';

/** Returns whether the React.ReactNode has props (and therefore is an `Element` versus primitive type) */
function isChildWithProps(child) {
  return !!child && typeof child === 'object' && 'props' in child && child.props != null;
}

/**
 * Returns children and grandchildren of type React.ReactNode.
 * Flattens children one level to support React.Fragments and Array type children.
 */
export default function getChildrenAndGrandchildrenWithProps(children) {
  return React.Children.toArray(children).flatMap(function (child) {
    if (typeof child === 'object' && 'props' in child && child.props.children) {
      return child.props.children;
    }
    return child;
  }).filter(function (child) {
    return isChildWithProps(child);
  });
}