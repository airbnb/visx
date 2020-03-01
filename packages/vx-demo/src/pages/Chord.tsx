import React from 'react';
import Show from '../components/Show';
import Chord from '../components/tiles/Chord';
import ChordSource from '!!raw-loader!../components/tiles/Chord';

export default () => {
  return (
    <Show
      component={Chord}
      title="Chords"
      margin={{
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      {ChordSource}
    </Show>
  );
};
