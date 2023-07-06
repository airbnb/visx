import dynamic from 'next/dynamic';
import React from 'react';

function NoSsr({ children }: { children: React.ReactNode }) {
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
}

export default dynamic(() => Promise.resolve(NoSsr), {
  ssr: false,
});
