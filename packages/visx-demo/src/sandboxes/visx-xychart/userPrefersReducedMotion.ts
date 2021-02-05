export default function userPrefersReducedMotion() {
  const prefersReducedMotionQuery =
    typeof window === 'undefined' ? false : window.matchMedia('(prefers-reduced-motion: reduce)');
  return !prefersReducedMotionQuery || !!prefersReducedMotionQuery.matches;
}
