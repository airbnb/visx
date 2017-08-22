import Point from '@vx/point/build/Point';

export default function genPhyllotaxis({ radius, width, height }) {
  const theta = Math.PI * (3 - Math.sqrt(5));
  return function(i) {
    const r = radius * Math.sqrt(i);
    const a = theta * i;
    return new Point({
      x: width / 2 + r * Math.cos(a),
      y: height / 2 + r * Math.sin(a),
    });
  };
}
