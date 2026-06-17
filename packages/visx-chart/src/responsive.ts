export function getResponsiveWidth(measuredWidth: number, fallbackWidth: number) {
  return Number.isFinite(measuredWidth) && measuredWidth > 0 ? measuredWidth : fallbackWidth;
}
