import React from 'react';
import Head from 'next/head';
import Router from 'next/router';
import NProgress from 'nprogress';
import ReactGA from 'react-ga';

if (typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
  ReactGA.initialize('UA-96843800-1');
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
}

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => {
  NProgress.done();
  if (typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
    ReactGA.set({ page: window.location.pathname });
    ReactGA.pageview(window.location.pathname);
  }
});
Router.events.on('routeChangeError', () => NProgress.done());

export default ({ title = 'visualization components' }) => (
  <div>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@hshoff" />
      <meta name="twitter:title" content="vx | visualization components" />
      <meta name="twitter:description" content="react + d3 = vx" />
      <meta
        name="twitter:image"
        content="https://raw.githubusercontent.com/hshoff/vx/master/packages/vx-demo/static/tiger-twitter-card.jpg"
      />
      <meta name="twitter:image:alt" content="vx logo is a tiger leaper over the letters v and x" />
      <title>{`vx | ${title}`}</title>
      <link rel="shortcut icon" type="image/png" href="/static/favicon.ico" />
      <link rel="stylesheet" href="/static/prism/prism-funky.css" />
      <link rel="stylesheet" href="/static/prism/prism-line-numbers.css" />
      <link href="https://fonts.googleapis.com/css?family=Montserrat:800" rel="stylesheet" />
    </Head>
    <style jsx global>{`
      body {
        width: 100vw;
        overflow-x: hidden;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Oxygen', 'Ubuntu', 'Cantarell',
          'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
        background: #ffffff;
        display: flex;
        color: white;
        padding: 0;
        margin: 0;
        font-size: 18px;
        line-height: 1.8em;
      }

      .tilt {
        display: flex;
        flex: 1;
        min-width: 33%;
      }

      .page-left {
        display: flex;
        flex: 4;
        flex-direction: column;
        padding: 0 2rem 2rem;
        margin-bottom: 50px;
        margin-top: 140px;
      }

      .page-left h2:first-child {
        margin-top: 0;
        padding-top: 4px;
      }

      .page-right {
        display: flex;
        flex: 3;
        flex-direction: column;
        color: white;
        padding: 10px 2rem 2rem;
        margin-top: 140px;
      }

      .page-right > ul {
        display: flex;
        flex-direction: column;
        flex: 1;
        font-family: 'Karla';
        color: #000;
      }

      .page-right a {
        font-size: 14px;
      }

      ol,
      ul {
        padding-left: 0;
      }

      blockquote {
        margin-left: 0;
      }

      li {
        list-style-type: none;
      }

      p {
        margin: 1rem 0;
      }

      code {
        font-family: 'Menlo', monospace;
        font-weight: bold;
        padding: 0.2rem 0.3rem;
        background-color: #ebebeb;
        line-height: 1.8em;
        font-size: 14px;
      }

      h1 {
        font-size: 54px;
        display: block;
        margin-bottom: 3rem;
      }

      h2 {
        font-size: 19px;
        margin-bottom: 0.2rem;
        margin-top: 2rem;
        display: block;
      }

      a {
        color: #fc2e1c;
        text-decoration: none;
      }

      .logo {
        background-image: url('/static/favicon.ico');
        background-position: center;
        background-size: cover;
        height: 24px;
        width: 24px;
        background-repeat: no-repeat;
      }

      .item-bottom .codeblock {
        margin: 1em 0px 0;
      }

      .vx-brush:hover {
        cursor: move;
      }

      /* loading progress bar styles */
      #nprogress {
        pointer-events: none;
      }

      #nprogress .bar {
        background: #fc2e1c;
        position: fixed;
        z-index: 1031;
        top: 0;
        left: 0;
        width: 100%;
        height: 2px;
      }

      #nprogress .peg {
        display: block;
        position: absolute;
        right: 0px;
        width: 100px;
        height: 100%;
        box-shadow: 0 0 10px #ff9300, 0 0 5px #ff9300;
        opacity: 1;
        transform: rotate(3deg) translate(0px, -4px);
      }

      svg {
        user-select: none;
        cursor: pointer;
      }

      .vx-heatmap-circle:hover,
      .vx-heatmap-rect:hover {
        stroke: white;
        stroke-width: 1;
      }

      @media (max-width: 960px) {
        .tilt {
          min-width: 45%;
        }
      }

      @media (max-width: 600px) {
        .tilt {
          min-width: 100%;
        }
      }
    `}</style>
  </div>
);
