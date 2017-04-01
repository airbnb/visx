import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default ({
  children,
  title = 'vx | visualization components'
}) => (
  <div>
    <Head>
      <title>{ title }</title>
      <meta charSet='utf-8' />
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      <link rel="stylesheet" href="static/style.css" />
    </Head>
    <header>
      <h2>vx | <a href="https://github.com/hshoff/vx">https://github.com/hshoff/vx</a></h2>
    </header>
    { children }
  </div>
);
