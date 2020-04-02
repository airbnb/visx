import './core.native';

import VxPrimitives from './VxPrimitives';

VxPrimitives.inject({
  Platform: {
    OS: 'android',
    Version: 1,
  },
});
