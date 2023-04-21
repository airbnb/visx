var SVG_NAMESPACE_URL = 'http://www.w3.org/2000/svg';
export default function getOrCreateMeasurementElement(elementId) {
  var pathElement = document.getElementById(elementId);

  // create a single path element if not done already
  if (!pathElement) {
    var svg = document.createElementNS(SVG_NAMESPACE_URL, 'svg');

    // not visible
    svg.setAttribute('aria-hidden', 'true');
    svg.style.opacity = '0';
    svg.style.width = '0';
    svg.style.height = '0';
    // off screen
    svg.style.position = 'absolute';
    svg.style.top = '-100%';
    svg.style.left = '-100%';
    // no mouse events
    svg.style.pointerEvents = 'none';
    pathElement = document.createElementNS(SVG_NAMESPACE_URL, 'path');
    pathElement.setAttribute('id', elementId);
    svg.appendChild(pathElement);
    document.body.appendChild(svg);
  }
  return pathElement;
}