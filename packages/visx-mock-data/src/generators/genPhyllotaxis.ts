export interface GenPhyllotaxis {
  radius: number;
  width: number;
  height: number;
}
export interface PhyllotaxisPoint {
  x: number;
  y: number;
}

export type GenPhyllotaxisFunction = (idx: number) => PhyllotaxisPoint;

export default function genPhyllotaxis({
  radius,
  width,
  height,
}: GenPhyllotaxis): GenPhyllotaxisFunction {
  const theta = Math.PI * (3 - Math.sqrt(5));
  return (idx) => {
    const r = radius * Math.sqrt(idx);
    const a = theta * idx;
    return {
      x: width / 2 + r * Math.cos(a),
      y: height / 2 + r * Math.sin(a),
    };
  };
}
