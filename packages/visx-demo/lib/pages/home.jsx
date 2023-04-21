// @ts-nocheck
import React from 'react';
import Link from 'next/link';
import { ParentSize } from '@visx/responsive';
import Dots from '../sandboxes/visx-dots/Example';
import Zoom from '../sandboxes/visx-zoom-i/Example';
import Radial from '../sandboxes/visx-shape-line-radial/Example';
import Bars from '../sandboxes/visx-bars/Example';
import Footer from '../components/Footer';
import Page from '../components/Page';
var Button = React.forwardRef(function (_a, ref) {
    var onClick = _a.onClick, href = _a.href, children = _a.children;
    return (<a href={href} onClick={onClick} ref={ref}>
    {children}
    <style jsx>{"\n      a {\n        display: block;\n        width: 100%;\n        font-size: 22px;\n        border: none;\n        background-color: #ebebeb;\n        padding: 1rem 0;\n        border-radius: 14px;\n        font-weight: 500;\n        text-align: center;\n      }\n      @media (max-width: 600px) {\n        a {\n          font-size: 20px;\n        }\n      }\n    "}</style>
  </a>);
});
function Home() {
    return (<Page>
      <div className="home">
        <div className="wrapper home-hero-container">
          <div className="stack home-x"/>
          <div className="stack home-guides"/>
        </div>
        <div className="wrapper container">
          <div className="content">
            <h3>
              <strong>visx</strong> a collection of expressive, low-level visualization primitives
              for React
            </h3>
            <p>
              At Airbnb, we made it a goal to unify our visualization stack across the company and
              in the process, we created a new project that brings together the power of D3 with the
              joy of React.
            </p>
            <p>Here are the advantages of visx:</p>
            <ol>
              <li>
                <strong>Keep bundle sizes down.</strong> visx is split into multiple packages. Start
                small and use only what you need.
              </li>
              <li>
                <strong>Un-opinionated on purpose.</strong> Bring your own state management,
                animation library, or CSS-in-JS solution. Odds are good your React app already has
                an opinion on how animation, theming, or styling is done. visx is careful not to add
                another one and integrates with all of them.
              </li>
              <li>
                <strong>Not a charting library.</strong> As you start using visualization
                primitives, you’ll end up building your own charting library that’s optimized for
                your use case. You’re in control.
              </li>
            </ol>
            <p>
              And most importantly — it’s just React. If you know React, you can make
              visualizations. It’s all the same standard APIs and familiar patterns. visx should
              feel at home in any React codebase.
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
                  {function (size) { return (<div style={{ pointerEvents: 'none' }}>
                      <Zoom {...size} height={size.height > 0 ? size.height : 400}/>
                    </div>); }}
                </ParentSize>
              </Link>
            </div>
            <div className="link">
              <Link href="/dots">
                <ParentSize>{function (size) { return <Dots {...size} showControls={false}/>; }}</ParentSize>
              </Link>
            </div>
            <div className="link">
              <Link href="/bars">
                <ParentSize>{function (size) { return <Bars {...size}/>; }}</ParentSize>
              </Link>
            </div>
            <div className="link">
              <Link href="/lineradial">
                <ParentSize>{function (size) { return <Radial animate={false} {...size}/>; }}</ParentSize>
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
      <style global jsx>{"\n        .link .mini-map,\n        .link .controls {\n          display: none !important;\n        }\n      "}</style>
      <style jsx>{"\n        .links {\n          margin: 2rem 2rem 0;\n          display: grid;\n          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));\n          grid-gap: 2rem;\n        }\n        .link {\n          background-color: #ebebeb;\n          height: 420px;\n          overflow: hidden;\n          border-radius: 14px;\n        }\n        .buttons,\n        .link:first-child {\n          grid-column: span 2;\n        }\n        .home-hero-container {\n          max-width: 105rem;\n          height: 60vh;\n          min-height: 40vh;\n          background-color: #ff1231;\n          position: relative;\n          border-radius: 14px;\n        }\n        .stack {\n          position: absolute;\n          top: 0;\n          left: 0;\n          right: 0;\n          bottom: 0;\n        }\n        .home-x {\n          background-image: url('static/x-light.svg');\n          background-size: 50% 50%;\n          background-position: center;\n          background-repeat: no-repeat;\n        }\n        .home-guides {\n          background-image: url('static/x-guide.svg');\n          background-size: contain;\n          background-position: center;\n          background-repeat: repeat;\n        }\n        strong {\n          font-weight: 500;\n        }\n        .btn {\n          padding: 8px 20px;\n          background-color: #fc2e1c;\n          border-radius: 30px;\n          border-top-right-radius: 0;\n          color: #ffffff;\n          text-transform: uppercase;\n          margin-right: 1rem;\n        }\n\n        .hero-x {\n          background-color: #ff1231;\n        }\n\n        .btn-container {\n          margin-top: 8rem;\n          display: flex;\n          flex-direction: row;\n          align-items: center;\n          justify-content: center;\n        }\n\n        .home {\n          align-self: center;\n          background: white;\n          min-height: 80vh;\n          margin: 0 auto;\n          padding-bottom: 1rem;\n        }\n\n        .home h1 {\n          font-size: 95pt;\n          line-height: 1em;\n          margin: 0;\n          padding: 0;\n          color: #272727;\n        }\n\n        .home h3 {\n          font-size: 36px;\n          line-height: 1em;\n          width: 80%;\n          margin: 1rem 0;\n          font-weight: 300;\n          color: #767676;\n        }\n\n        .home h3 strong {\n          font-size: 42px;\n          color: #272727;\n          font-weight: 600;\n        }\n\n        .hero {\n          display: flex;\n          align-items: center;\n          justify-content: center;\n          flex-direction: column;\n          min-height: 60vh;\n          background-size: 50%;\n          background-repeat: no-repeat;\n          background-position: center;\n          background-image: url('static/tiger-gray.png');\n          margin-bottom: 1rem;\n        }\n\n        .container {\n          display: grid;\n          align-items: flex-start;\n          flex-direction: column;\n          grid-template-columns: 1fr 1fr;\n        }\n\n        .content {\n          color: #272727;\n          margin: 1rem auto 0;\n          padding: 0 1rem;\n          max-width: 680px;\n          display: flex;\n          flex-direction: column;\n          background-color: #fff;\n        }\n\n        blockquote {\n          border-left: 2px solid #efefef;\n          padding: 0.5rem 1rem;\n          color: #777;\n        }\n\n        blockquote p {\n          margin: 0;\n        }\n\n        .faq {\n          min-width: 640px;\n        }\n\n        li {\n          list-style-type: decimal;\n          margin-bottom: 1rem;\n          margin-left: 1.25rem;\n        }\n        li:last-child {\n          margin-bottom: 0;\n        }\n\n        @media (max-width: 600px) {\n          .hero h1 {\n            font-size: 35pt;\n            margin-top: 40px;\n            padding: 0;\n          }\n\n          .home h3 {\n            font-size: 24px;\n            line-height: 1em;\n            width: 100%;\n            margin: 1rem 0 0.5rem;\n            font-weight: 300;\n            color: #767676;\n          }\n\n          .home h3 strong {\n            font-size: 28px;\n            color: #272727;\n            font-weight: 600;\n          }\n\n          .home .content {\n            font-size: 20px;\n            line-height: 1.3em;\n          }\n\n          .btn {\n            font-size: 12px;\n            padding: 4px 20px;\n            margin-top: 2rem;\n          }\n\n          .hero {\n            height: 50vh;\n            background-size: 90%;\n            margin-bottom: 1rem;\n          }\n\n          .home {\n            margin-top: 0.5rem;\n            grid-template-columns: 1fr;\n          }\n\n          .content,\n          .faq {\n            min-width: 300px;\n          }\n\n          .container {\n            display: block;\n          }\n\n          .links {\n            display: flex;\n            flex-direction: column;\n            grid-gap: 0;\n            margin: 0.5rem;\n          }\n          .link {\n            height: 40vh;\n            margin: 0.5rem 0;\n          }\n          .buttons:first-child {\n            margin-bottom: 1rem;\n          }\n          .buttons:last-child {\n            margin-top: 1rem;\n          }\n        }\n      "}</style>
    </Page>);
}
export default Home;
