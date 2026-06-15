const TAU = Math.PI * 2;

export type PathBuilder = {
  arc(
    centerX: number,
    centerY: number,
    radius: number,
    startAngle: number,
    endAngle: number,
    counterclockwise?: boolean,
  ): PathBuilder;
  bezierCurveTo(
    controlX1: number,
    controlY1: number,
    controlX2: number,
    controlY2: number,
    x: number,
    y: number,
  ): PathBuilder;
  closePath(): PathBuilder;
  lineTo(x: number, y: number): PathBuilder;
  moveTo(x: number, y: number): PathBuilder;
  quadraticCurveTo(controlX: number, controlY: number, x: number, y: number): PathBuilder;
  rect(x: number, y: number, width: number, height: number): PathBuilder;
  toString(): string;
};

class PathBuilderImpl implements PathBuilder {
  private readonly commands: string[] = [];

  private readonly precision: number;

  constructor(precision: number) {
    this.precision = precision;
  }

  private number(value: number) {
    return Number(value.toFixed(this.precision)).toString();
  }

  private point(x: number, y: number) {
    return `${this.number(x)},${this.number(y)}`;
  }

  private append(command: string) {
    this.commands.push(command);
    return this;
  }

  moveTo(x: number, y: number) {
    return this.append(`M${this.point(x, y)}`);
  }

  lineTo(x: number, y: number) {
    return this.append(`L${this.point(x, y)}`);
  }

  closePath() {
    return this.append('Z');
  }

  quadraticCurveTo(controlX: number, controlY: number, x: number, y: number) {
    return this.append(`Q${this.point(controlX, controlY)},${this.point(x, y)}`);
  }

  bezierCurveTo(
    controlX1: number,
    controlY1: number,
    controlX2: number,
    controlY2: number,
    x: number,
    y: number,
  ) {
    return this.append(
      `C${this.point(controlX1, controlY1)},${this.point(controlX2, controlY2)},${this.point(
        x,
        y,
      )}`,
    );
  }

  rect(x: number, y: number, width: number, height: number) {
    return this.append(
      `M${this.point(x, y)}h${this.number(width)}v${this.number(height)}h${this.number(-width)}Z`,
    );
  }

  arc(
    centerX: number,
    centerY: number,
    radius: number,
    startAngle: number,
    endAngle: number,
    counterclockwise = false,
  ) {
    const delta = counterclockwise
      ? -((startAngle - endAngle + TAU) % TAU || TAU)
      : (endAngle - startAngle + TAU) % TAU || TAU;
    const sweep = counterclockwise ? 0 : 1;
    const drawArc = (from: number, to: number) => {
      const largeArc = Math.abs(to - from) > Math.PI ? 1 : 0;
      const x = centerX + radius * Math.cos(to);
      const y = centerY + radius * Math.sin(to);

      this.append(
        `A${this.number(radius)},${this.number(radius)},0,${largeArc},${sweep},${this.point(x, y)}`,
      );
    };
    const startX = centerX + radius * Math.cos(startAngle);
    const startY = centerY + radius * Math.sin(startAngle);

    if (this.commands.length === 0) this.moveTo(startX, startY);
    else this.lineTo(startX, startY);

    if (Math.abs(delta) >= TAU) {
      drawArc(startAngle, startAngle + delta / 2);
      drawArc(startAngle + delta / 2, startAngle + delta);
    } else {
      drawArc(startAngle, startAngle + delta);
    }

    return this;
  }

  toString() {
    return this.commands.join('');
  }
}

export default function createPath(precision = 3): PathBuilder {
  return new PathBuilderImpl(precision);
}
