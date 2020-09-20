import React from 'react';

const icon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="7.5 4.21 12 6.81 16.5 4.21" />
    <polyline points="7.5 19.79 7.5 14.6 3 12" />
    <polyline points="21 12 16.5 14.6 16.5 19.79" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);

type Props = {
  branch?: string;
  exampleDirectoryName: string;
};

const CodeSandboxLink = ({ branch = 'master', exampleDirectoryName }: Props) => {
  return exampleDirectoryName ? (
    <>
      <a
        className="sandbox-link"
        href={`https://codesandbox.io/s/github/airbnb/visx/tree/${branch}/packages/visx-demo/src/sandboxes/${exampleDirectoryName}`}
        rel="nofollow noopener noreferrer"
        target="_blank"
      >
        {icon}&nbsp;Try it on CodeSandbox
      </a>
      <style jsx>{`
        .sandbox-link {
          display: flex;
          align-items: center;
          font-size: 12px;
          color: #222;
        }
      `}</style>
    </>
  ) : null;
};

export default CodeSandboxLink;
