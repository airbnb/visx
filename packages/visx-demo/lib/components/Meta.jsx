import React from 'react';
import Head from 'next/head';
import Router from 'next/router';
import NProgress from 'nprogress';
Router.events.on('routeChangeStart', function () { return NProgress.start(); });
Router.events.on('routeChangeComplete', function () {
    NProgress.done();
});
Router.events.on('routeChangeError', function () { return NProgress.done(); });
function Meta(_a) {
    var _b = _a.title, title = _b === void 0 ? 'visualization components' : _b;
    return (<div>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta charSet="utf-8"/>
        <meta property="og:image" content="https://raw.githubusercontent.com/airbnb/visx/master/assets/x-hero.png"/>
        <meta property="og:image:type" content="image/png"/>
        <meta property="og:image:secure_url" content="https://raw.githubusercontent.com/airbnb/visx/master/assets/x-hero.png"/>
        <meta property="og:image:alt" content="a collection of expressive, low-level visualization primitives for React"/>
        <meta property="og:url" content="https://airbnb.io/visx/"/>
        <meta property="og:title" content={"visx | " + title}/>
        <meta property="og:description" content="a collection of expressive, low-level visualization primitives for React"/>
        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:site" content="@AirbnbEng"/>
        <meta name="twitter:creator" content="@hshoff"/>
        <meta name="twitter:title" content="visx"/>
        <meta name="twitter:description" content="a collection of expressive, low-level visualization primitives for React"/>
        <meta name="twitter:image" content="https://raw.githubusercontent.com/airbnb/visx/master/assets/x-hero.png"/>
        <meta name="twitter:image:alt" content="visx logo is an oversized X"/>
        <title>{"visx | " + title}</title>
        <link rel="shortcut icon" type="image/png" href="static/favicon.png"/>
        <link rel="stylesheet" href="static/prism/prism-funky.css"/>
        <link rel="stylesheet" href="static/prism/prism-line-numbers.css"/>
      </Head>
      <style jsx global>{"\n        body {\n          width: 100vw;\n          overflow-x: hidden;\n          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Oxygen', 'Ubuntu',\n            'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;\n          background: #ffffff;\n          display: flex;\n          color: white;\n          padding: 0;\n          margin: 0;\n          font-size: 22px;\n          line-height: 1.5em;\n        }\n        #__next,\n        .wrapper {\n          position: relative;\n          display: flex;\n          -webkit-box-align: center;\n          align-items: center;\n          -webkit-box-pack: center;\n          justify-content: center;\n          max-width: 105rem;\n          margin: 0 auto;\n        }\n\n        .tilt {\n          display: flex;\n          flex: 1;\n          min-width: 33%;\n        }\n\n        .page-left {\n          display: flex;\n          flex: 4;\n          flex-direction: column;\n          padding: 0 2rem 2rem;\n          margin-bottom: 50px;\n          margin-top: 140px;\n        }\n\n        .page-left h2:first-child {\n          margin-top: 0;\n          padding-top: 4px;\n        }\n\n        .page-right {\n          display: flex;\n          flex: 3;\n          flex-direction: column;\n          color: white;\n          padding: 10px 2rem 2rem;\n          margin-top: 140px;\n        }\n\n        .page-right > ul {\n          display: flex;\n          flex-direction: column;\n          flex: 1;\n          font-family: 'Karla';\n          color: #000;\n        }\n\n        .page-right a {\n          font-size: 14px;\n        }\n\n        ol,\n        ul {\n          padding-left: 0;\n        }\n\n        blockquote {\n          margin-left: 0;\n        }\n\n        li {\n          list-style-type: none;\n        }\n\n        p {\n          margin: 1rem 0;\n        }\n\n        code {\n          font-family: 'Menlo', monospace;\n          font-weight: bold;\n          padding: 0.2rem 0.3rem;\n          background-color: #ebebeb;\n          line-height: 1.8em;\n          font-size: 14px;\n        }\n\n        h1 {\n          font-size: 54px;\n          display: block;\n          margin-bottom: 3rem;\n        }\n\n        h2 {\n          font-size: 19px;\n          margin-bottom: 0.2rem;\n          margin-top: 2rem;\n          display: block;\n        }\n\n        a {\n          color: #272727;\n          font-weight: 400;\n          text-decoration: none;\n        }\n\n        a:hover {\n          text-decoration: underline;\n        }\n\n        .logo {\n          background-image: url('/visx/static/favicon.png');\n          background-position: center;\n          background-size: cover;\n          height: 24px;\n          width: 24px;\n          background-repeat: no-repeat;\n        }\n\n        .item-bottom .codeblock {\n          margin: 1em 0px 0;\n        }\n\n        .visx-brush:hover {\n          cursor: move;\n        }\n\n        /* loading progress bar styles */\n        #nprogress {\n          pointer-events: none;\n        }\n\n        #nprogress .bar {\n          background: #fc2e1c;\n          position: fixed;\n          z-index: 1031;\n          top: 0;\n          left: 0;\n          width: 100%;\n          height: 2px;\n        }\n\n        #nprogress .peg {\n          display: block;\n          position: absolute;\n          right: 0px;\n          width: 100px;\n          height: 100%;\n          box-shadow: 0 0 10px #ff9300, 0 0 5px #ff9300;\n          opacity: 1;\n          transform: rotate(3deg) translate(0px, -4px);\n        }\n\n        svg {\n          user-select: none;\n          cursor: pointer;\n        }\n\n        .visx-heatmap-circle:hover,\n        .visx-heatmap-rect:hover {\n          stroke: white;\n          stroke-width: 1;\n        }\n\n        @media (max-width: 960px) {\n          .tilt {\n            min-width: 45%;\n          }\n        }\n\n        @media (max-width: 600px) {\n          .tilt {\n            min-width: 100%;\n          }\n          #home {\n            display: none;\n          }\n        }\n      "}</style>
    </div>);
}
export default Meta;
