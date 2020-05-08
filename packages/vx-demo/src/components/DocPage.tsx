import React from 'react';
import { VxPackage } from '../types';
import PackageList from './PackageList';

export default function DocPage({
  currentPackage,
  children,
}: {
  currentPackage: VxPackage;
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="doc-container">
        <div className="doc-nav">
          <PackageList compact grid={false} emphasizePackage={currentPackage} />
        </div>
        <div className="doc-content">{children}</div>
      </div>
      <style jsx>{`
        .doc-container {
          display: flex;
          flex-direction: row;
        }
        .doc-nav {
          margin-top: 40px;
          margin-right: 5em;
          width: 165px;
        }
        @media (max-width: 600px) {
          .doc-container {
            flex-direction: column-reverse;
            min-width: 90vw;
            max-width: 90vw;
            margin: 0;
          }
        }
      `}</style>
    </>
  );
}
