const CENTER_ALIGN_THRESHOLD = 1;

function radialTickLabelTransform(fromPoint, toPoint) {
    let textAnchor = 'middle';
    let verticalAnchor = 'middle';
    const dx = toPoint.x - fromPoint.x;
    const dy = toPoint.y - fromPoint.y;
  
    // offset the label in the same direction as the tick orientation
    const x = toPoint.x + dx;
    const y = toPoint.y + dy;
  
    // positive dx means tick points right
    if (dx > CENTER_ALIGN_THRESHOLD) {
      textAnchor = 'start';
    } else if (dx < -CENTER_ALIGN_THRESHOLD) {
      textAnchor = 'end';
    }
  
    // positive dy means tick points up
    if (dy > CENTER_ALIGN_THRESHOLD) {
      verticalAnchor = 'start';
    } else if (dy < -CENTER_ALIGN_THRESHOLD) {
      verticalAnchor = 'end';
    }
  
    return { textAnchor, verticalAnchor, x, y };
  }