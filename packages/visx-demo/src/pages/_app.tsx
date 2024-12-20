import React from 'react';
import type { AppProps } from 'next/app';
import 'prismjs/themes/prism.css';
import NoSsr from '../components/NoSsr';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NoSsr>
      <Component {...pageProps} />
    </NoSsr>
  );
}

export default MyApp;
