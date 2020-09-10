import React from 'react';
import { AppProps } from 'next/app';
import '../styles/index.css';
import 'prismjs/themes/prism.css';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
