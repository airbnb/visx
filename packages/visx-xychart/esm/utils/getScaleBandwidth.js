export default function getScaleBandwidth(scale) {
  var _s$bandwidth;

  // Broaden type before using 'xxx' in s as typeguard.
  var s = scale;
  return s && 'bandwidth' in s ? (_s$bandwidth = s == null ? void 0 : s.bandwidth()) != null ? _s$bandwidth : 0 : 0;
}