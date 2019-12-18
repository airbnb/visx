import React from 'react';
import Show from '../components/show';
import BrushChart from '../components/tiles/brush';

export default () => {
  return (
    <Show
      component={BrushChart}
      title="BrushChart"
      margin={{
        top: 50,
        left: 50,
        right: 20,
        bottom: 50,
      }}
    >
      {`import React from 'react';`}
    </Show>
  );
};
