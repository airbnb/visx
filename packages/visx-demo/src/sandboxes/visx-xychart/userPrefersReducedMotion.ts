export default function userPrefersReducedMotion() {
  const prefersReducedMotionQuery = window?.matchMedia('(prefers-reduced-motion: reduce)');
  return !prefersReducedMotionQuery || !!prefersReducedMotionQuery.matches;
}
