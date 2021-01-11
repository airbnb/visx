/* react-spring cannot tween colors with url ids (patterns, gradients), these helpers detect and clean them. */
const neutralCleanColor = 'rgba(0,0,0,0.1)';
export const colorHasUrl = (color?: string) => Boolean(color?.includes('url('));
export const cleanColor = (color?: string) => (colorHasUrl(color) ? neutralCleanColor : color);
