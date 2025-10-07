import React from 'react';
import Page from '../components/Page';
import Footer from '../components/Footer';
import PackageList from '../components/PackageList';

export default function Docs() {
  return (
    <Page title="documentation">
      <div className="container">
        <h1>Documentation</h1>
        <p>
          <code>visx</code> is a suite of several low-level standalone packages for building visual
          interfaces with <code>react</code>. Packages can be mixed and used together depending on
          your use case, or you can simply add the umbrella <a href="/visx/docs/visx">@visx/visx</a>{' '}
          package to use them all.
          <br /> <br />
          Individual packages can be roughly categorized as follows:
        </p>
        <PackageList grid />
      </div>
      <Footer />
      <style jsx>{`
        .container {
          margin-top: 24px;
          margin-bottom: 40px;
        }
        .container > p > pre {
          display: inline;
        }
        @media (min-width: 800px) {
          .container > p {
            max-width: 60vw;
          }
        }
      `}</style>
    </Page>
  );
}
