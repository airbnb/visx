import React from 'react';
import { AppProps } from 'next/app';
import 'prismjs/themes/prism.css';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
