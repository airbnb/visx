require('airbnb-js-shims/target/es2019');

// Global mock for getComputedTextLength
SVGElement.prototype.getComputedTextLength = () => 100;
