import React from 'react';

import {Group} from '@vx/group';

import Graph from './Graph';

export default function Links({links, linkComponent}) {
  return (
    <Group>
      {links.map((link, i) => <Group className='links' key={`network-link-${i}`}>
        {React.createElement(linkComponent, {link})}
      </Group>)}
    </Group>
  );
}
