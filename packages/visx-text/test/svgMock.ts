// @ts-ignore
let originalFn: typeof SVGElement.prototype.getComputedTextLength;

/**
 * JSDom does not implement getComputedTextLength()
 * so this function add mock implementation for testing.
 */
export function addMock() {
  // @ts-ignore
  originalFn = SVGElement.prototype.getComputedTextLength;

  // @ts-ignore
  SVGElement.prototype.getComputedTextLength = function getComputedTextLength() {
    // Make every character 10px wide
    return (this.textContent?.length ?? 0) * 10;
  };
}

/**
 * Remove mock from addMock()
 */
export function removeMock() {
  // @ts-ignore
  SVGElement.prototype.getComputedTextLength = originalFn;
}
