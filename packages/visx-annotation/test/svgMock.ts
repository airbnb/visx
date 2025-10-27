// @ts-expect-error
let originalFn: typeof SVGElement.prototype.getComputedTextLength;

/**
 * JSDom does not implement getComputedTextLength()
 * so this function add mock implementation for testing.
 */
export function addMock() {
  // @ts-expect-error
  originalFn = SVGElement.prototype.getComputedTextLength;

  // @ts-expect-error
  SVGElement.prototype.getComputedTextLength = function getComputedTextLength() {
    // Make every character 10px wide
    return (this.textContent?.length ?? 0) * 10;
  };
}

/**
 * Remove mock from addMock()
 */
export function removeMock() {
  // @ts-expect-error
  SVGElement.prototype.getComputedTextLength = originalFn;
}
