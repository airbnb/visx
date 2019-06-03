export class Brush {
  constructor({ width = 1, height = 1, clamp = true }) {
    this.extentStart = [0, 0];
    this.extentEnd = [width, height];
    this.clamp = clamp;
  }

  get width() {
    if (!this.selection) {
      return null;
    }
    const [x1] = this.selectionEnd;
    const [x0] = this.selectionStart;
    return x1 - x0;
  }

  get height() {
    if (!this.selection) {
      return null;
    }
    const [x1, y1] = this.selectionEnd;
    const [x0, y0] = this.selectionStart;
    return y1 - y0;
  }

  move(x, y) {
    if (!this.selection) {
      return null;
    }
    this.moveStart(x, y);
    this.moveEnd(x, y);
  }

  moveStart(x, y) {
    const [start] = this.selection;
    this.selectionStart = start.map((s, i) => {
      const o = i === 0 ? x : y;
      return s + o;
    });
  }

  moveEnd(x, y) {
    const [start, end] = this.selection;
    this.selectionEnd = end.map((s, i) => {
      const o = i === 0 ? x : y;
      return s + o;
    });
  }

  clampPoint(point) {
    const [start, end] = this.extent;
    const [x0, y0] = start;
    const [x1, y1] = end;
    if (Array.isArray(point)) {
      const [x, y] = point;
      const nextX = Math.min(Math.max(x0, x), x1);
      const nextY = Math.min(Math.max(y0, y), y1);
      return [nextX, nextY];
    }
  }

  get extent() {
    return [this.extentStart, this.extentEnd];
  }

  set extent(extent) {
    this.extentStart = extent[0];
    this.extentEnd = extent[1];
  }

  get selection() {
    if (!this.selectionStart && !this.selectionEnd) {
      return null;
    }
    return [this.selectionStart, this.selectionEnd];
  }

  set selection(selection) {
    if (!selection) {
      this.selectionStart = null;
      this.selectionEnd = null;
      return;
    }
    this.selectionStart = selection[0];
    this.selectionEnd = selection[1];
  }

  set selectionStart(point) {
    if (this.clamp) {
      this.start = this.clampPoint(point);
      return;
    }
    this.start = point;
  }

  get selectionStart() {
    return this.start;
  }

  set selectionEnd(point) {
    if (this.clamp) {
      this.end = this.clampPoint(point);
      return;
    }
    this.end = point;
  }

  get selectionEnd() {
    return this.end;
  }
}
