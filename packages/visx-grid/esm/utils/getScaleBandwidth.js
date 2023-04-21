export default function getScaleBandwidth(scale) {
  return 'bandwidth' in scale ? scale.bandwidth() : 0;
}