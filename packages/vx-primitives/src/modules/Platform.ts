const { hasOwnProperty } = Object.prototype;

type PlatformType = {
  OS: string;
  Version: number;
};

const Platform: PlatformType & { select?: (Object) => void; inject?: (PlatformType) => void } = {
  OS: 'unknown',
  Version: 0,
  select: obj => {
    if (hasOwnProperty.call(obj, Platform.OS)) {
      return obj[Platform.OS];
    }
    return obj.default;
  },
  inject: platform => {
    // Use bracket accessor notation as workaround for
    // https://github.com/facebook/metro-bundler/issues/27
    Platform['OS'] = platform.OS; // eslint-disable-line dot-notation
    Platform['Version'] = platform.Version; // eslint-disable-line dot-notation
  },
};

export default Platform;
