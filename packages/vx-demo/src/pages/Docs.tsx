import React from 'react';
import Page from '../components/Page';
import Footer from '../components/Footer';
import PackageList from '../components/PackageList';

export default function Docs() {
  return (
    <Page title="documentation">
      <div className="container">
        <h1>Packages</h1>
        vx is a suite of several low-level standalone packages for building visual interfaces with
        react. Packages can be mixed and used together depending on your use case, and can be
        roughly categorized as follows:
        <PackageList grid />
      </div>
      <Footer />
      <style jsx>{`
        .container {
          margin-top: 24px;
          margin-bottom: 40px;
        }
      `}</style>
    </Page>
  );
}
