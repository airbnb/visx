export default function polarToCartesian({ radius, angle }) {
  return {
    x: radius * Math.cos(angle),
    y: radius * Math.sin(angle)
  };
}
