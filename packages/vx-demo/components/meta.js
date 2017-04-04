import Head from 'next/head';
import Router from 'next/router';
import NProgress from 'nprogress';

Router.onRouteChangeStart = () => NProgress.start()
Router.onRouteChangeComplete = () => NProgress.done()
Router.onRouteChangeError = () => NProgress.done()

export default ({
  title = 'visualization components'
}) => (
  <div>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <title>{ `vx | ${title}` }</title>
      <link rel="shortcut icon" type="image/png" href="static/favicon.ico"/>
      <link href="https://fonts.googleapis.com/css?family=Roboto|Roboto+Mono|Inconsolata" rel="stylesheet" />
    </Head>
    <style jsx global>{`
      body {
        font-family: "Roboto", -apple-system, BlinkMacSystemFont, "Segoe UI", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
        background: #fff;
        display: flex;
      }

      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      li {
        list-style-type: none;
      }

       p {
         margin: 1rem 0;
       }

       code {
         font-family: 'Inconsolata', monospace;
         font-weight: bold;
         padding: .2rem .3rem;
         background-color: #fef052;
         border-radius: 3px;
       }

       h1 {
         font-size: 54px;
         display: block;
         margin-bottom: 3rem;
       }

       h2 {
         font-size: 19px;
         margin-bottom: .2rem;
         margin-top: 2rem;
         display: block;
         font-family: 'Roboto';
       }

       a {
         color: #eb4225;
         text-decoration: none;
       }

       .logo {
         background-image: url('static/tiger.png');
         background-position: 44px center;
         background-size: cover;
         height: 120px;
         width: 200px;
         background-repeat: no-repeat;
       }

      /* loading progress bar styles */
      #nprogress {
        pointer-events: none;
      }

      #nprogress .bar {
        background: #fe2a00;
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
        opacity: 1.0;
        transform: rotate(3deg) translate(0px, -4px);
      }
    `}</style>
  </div>
)
