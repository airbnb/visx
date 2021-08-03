// @ts-nocheck
import React from 'react';
import Link from 'next/link';
import { ParentSize } from '@visx/responsive';
import Page from '../components/Page';
import Footer from '../components/Footer';
import Dots from '../sandboxes/visx-dots/Example';
import Zoom from '../sandboxes/visx-zoom-i/Example';
import Radial from '../sandboxes/visx-shape-line-radial/Example';
import Bars from '../sandboxes/visx-bars/Example';

// @ts-ignore
const Button = React.forwardRef(({ onClick, href, children }, ref) => {
  return (
    // @ts-ignore
    <a href={href} onClick={onClick} ref={ref}>
      {children}
      <style jsx>{`
        a {
          display: block;
          width: 100%;
          font-size: 22px;
          border: none;
          background-color: #ebebeb;
          padding: 1rem 0;
          border-radius: 14px;
          font-weight: 500;
          text-align: center;
        }
        @media (max-width: 600px) {
          a {
            font-size: 20px;
          }
        }
      `}</style>
    </a>
  );
});

const Home = () => (
  <Page>
    <div className="home">
      <div className="wrapper home-hero-container">
        <div className="stack home-x" />
        <div className="stack home-guides" />
      </div>
      <div className="wrapper container">
        <div className="content">
          <h3>
            <strong>visx</strong> a collection of expressive, low-level visualization primitives for
            React
          </h3>
          <p>
            At Airbnb, we made it a goal to unify our visualization stack across the company and in
            the process, we created a new project that brings together the power of D3 with the joy
            of React.
          </p>
          <p>Here are the advantages of visx:</p>
          <ol>
            <li>
              <strong>Keep bundle sizes down.</strong> visx is split into multiple packages. Start
              small and use only what you need.
            </li>
            <li>
              <strong>Un-opinionated on purpose.</strong> Bring your own state management, animation
              library, or CSS-in-JS solution. Odds are good your React app already has an opinion on
              how animation, theming, or styling is done. visx is careful not to add another one and
              integrates with all of them.
            </li>
            <li>
              <strong>Not a charting library.</strong> As you start using visualization primitives,
              you’ll end up building your own charting library that’s optimized for your use case.
              You’re in control.
            </li>
          </ol>
          <p>
            And most importantly — it’s just React. If you know React, you can make visualizations.
            It’s all the same standard APIs and familiar patterns. visx should feel at home in any
            React codebase.
          </p>
        </div>
        <div className="links">
          <div className="buttons">
            <a href="https://github.com/airbnb/visx">
              <Button>View on GitHub</Button>
            </a>
          </div>
          <div className="link">
            <Link href="/zoom-i">
              <ParentSize>
                {(size) => {
                  return (
                    <div style={{ pointerEvents: 'none' }}>
                      <Zoom {...size} height={size.height > 0 ? size.height : 400} />
                    </div>
                  );
                }}
              </ParentSize>
            </Link>
          </div>
          <div className="link">
            <Link href="/dots">
              <ParentSize>
                {(size) => {
                  return <Dots {...size} showControls={false} />;
                }}
              </ParentSize>
            </Link>
          </div>
          <div className="link">
            <Link href="/bars">
              <ParentSize>
                {(size) => {
                  return <Bars {...size} />;
                }}
              </ParentSize>
            </Link>
          </div>
          <div className="link">
            <Link href="/lineradial">
              <ParentSize>
                {(size) => {
                  return <Radial animate={false} {...size} />;
                }}
              </ParentSize>
            </Link>
          </div>
          <div className="buttons">
            <Link href="/gallery" passHref>
              <Button>View Gallery</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    <style global jsx>{`
      .link .mini-map,
      .link .controls {
        display: none !important;
      }
    `}</style>
    <style jsx>{`
      .links {
        margin: 2rem 2rem 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
        grid-gap: 2rem;
      }
      .link {
        background-color: #ebebeb;
        height: 420px;
        overflow: hidden;
        border-radius: 14px;
      }
      .buttons,
      .link:first-child {
        grid-column: span 2;
      }
      .home-hero-container {
        max-width: 105rem;
        height: 60vh;
        min-height: 40vh;
        background-color: #ff1231;
        position: relative;
        border-radius: 14px;
      }
      .stack {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
      }
      .home-x {
        background-image: url('static/x-light.svg');
        background-size: 50% 50%;
        background-position: center;
        background-repeat: no-repeat;
      }
      .home-guides {
        background-image: url('static/x-guide.svg');
        background-size: contain;
        background-position: center;
        background-repeat: repeat;
      }
      strong {
        font-weight: 500;
      }
      .btn {
        padding: 8px 20px;
        background-color: #fc2e1c;
        border-radius: 30px;
        border-top-right-radius: 0;
        color: #ffffff;
        text-transform: uppercase;
        margin-right: 1rem;
      }

      .hero-x {
        background-color: #ff1231;
      }

      .btn-container {
        margin-top: 8rem;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
      }

      .home {
        align-self: center;
        background: white;
        min-height: 80vh;
        margin: 0 auto;
        padding-bottom: 1rem;
      }

      .home h1 {
        font-size: 95pt;
        line-height: 1em;
        margin: 0;
        padding: 0;
        color: #272727;
      }

      .home h3 {
        font-size: 36px;
        line-height: 1em;
        width: 80%;
        margin: 1rem 0;
        font-weight: 300;
        color: #767676;
      }

      .home h3 strong {
        font-size: 42px;
        color: #272727;
        font-weight: 600;
      }

      .hero {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        min-height: 60vh;
        background-size: 50%;
        background-repeat: no-repeat;
        background-position: center;
        background-image: url('static/tiger-gray.png');
        margin-bottom: 1rem;
      }

      .container {
        display: grid;
        align-items: flex-start;
        flex-direction: column;
        grid-template-columns: 1fr 1fr;
      }

      .content {
        color: #272727;
        margin: 1rem auto 0;
        padding: 0 1rem;
        max-width: 680px;
        display: flex;
        flex-direction: column;
        background-color: #fff;
      }

      blockquote {
        border-left: 2px solid #efefef;
        padding: 0.5rem 1rem;
        color: #777;
      }

      blockquote p {
        margin: 0;
      }

      .faq {
        min-width: 640px;
      }

      li {
        list-style-type: decimal;
        margin-bottom: 1rem;
        margin-left: 1.25rem;
      }
      li:last-child {
        margin-bottom: 0;
      }

      @media (max-width: 600px) {
        .hero h1 {
          font-size: 35pt;
          margin-top: 40px;
          padding: 0;
        }

        .home h3 {
          font-size: 24px;
          line-height: 1em;
          width: 100%;
          margin: 1rem 0 0.5rem;
          font-weight: 300;
          color: #767676;
        }

        .home h3 strong {
          font-size: 28px;
          color: #272727;
          font-weight: 600;
        }

        .home .content {
          font-size: 20px;
          line-height: 1.3em;
        }

        .btn {
          font-size: 12px;
          padding: 4px 20px;
          margin-top: 2rem;
        }

        .hero {
          height: 50vh;
          background-size: 90%;
          margin-bottom: 1rem;
        }

        .home {
          margin-top: 0.5rem;
          grid-template-columns: 1fr;
        }

        .content,
        .faq {
          min-width: 300px;
        }

        .container {
          display: block;
        }

        .links {
          display: flex;
          flex-direction: column;
          grid-gap: 0;
          margin: 0.5rem;
        }
        .link {
          height: 40vh;
          margin: 0.5rem 0;
        }
        .buttons:first-child {
          margin-bottom: 1rem;
        }
        .buttons:last-child {
          margin-top: 1rem;
        }
      }
    `}</style>
  </Page>
);

export default Home;
