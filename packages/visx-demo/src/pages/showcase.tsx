import React from 'react';
import Page from '../components/Page';
import Showcase from '../components/Showcase';

function InTheWildPage() {
  return (
    <Page wrapper={false} title="in the wild">
      <Showcase />
    </Page>
  );
}

export default InTheWildPage;
