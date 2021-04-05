/** Returns whether the React.ReactNode has props (and therefore is an `Element` versus primative type) */
export default function isChildWithProps(child) {
  return !!child && typeof child === 'object' && 'props' in child && child.props != null;
}