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
          margin-top: 24px;
          display: flex;
          flex-direction: row;
        }
        .doc-content :global(h1) {
          margin-bottom: 1.2em;
          line-height: 0;
          font-size: 2em;
        }
        .doc-nav {
          margin-right: 5em;
          width: 140px;
          flex-shrink: 0;
        }
        @media (max-width: 600px) {
          .doc-container {
            flex-direction: column-reverse;
            min-width: 90vw;
            max-width: 90vw;
            margin: 0;
          }
        }
        .doc-container :global(code) {
          font-family: 'Menlo', monospace;
          font-weight: bold;
          padding: 0.2rem 0.3rem;
          background-color: #ebebeb;
          line-height: 1.8em;
          font-size: 0.8em;
        }
        .doc-container :global(code[class*='language-']) {
          background-color: transparent;
          font-weight: 300;
          color: #222;
          box-shadow: none;
        }
        .doc-container :global(pre) {
          background-color: #f7f9fa;
          display: inline-block;
          padding: 0.5em;
          min-width: 33vw;
          border-radius: 3px;
        }
        .doc-container :global(table) {
          border-collapse: collapse;
          font-size: 12px;
          font-family: monospace;
          border-color: #efefef;
          margin-top: 0.25rem;
        }
      `}</style>
    </>
  );
}
