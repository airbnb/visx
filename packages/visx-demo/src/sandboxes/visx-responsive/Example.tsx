import React, { useState } from 'react';
import ParentSize from '@visx/responsive/lib/components/ParentSize';

import Lines from './Lines';

export type ResponsiveProps = {
  width: number;
  height: number;
};

const Nav = () => (
  <ul>
    <li>
      <span role="img" aria-label="robot">
        🤖
      </span>
    </li>
    <li>Home</li>
    <li>Profile</li>
    <li>Favorites</li>
    <li>Settings</li>
  </ul>
);

export default function Example({ width, height }: ResponsiveProps) {
  const [showSidebar, setShowSidebar] = useState<boolean>(true);

  return width < 20 || height < 20 ? null : (
    <div className="app" style={{ width, height }}>
      {showSidebar && (
        <div className="app-nav">
          <Nav />
        </div>
      )}
      <div className="app-content">
        <div>
          <button
            onClick={(event) => {
              // on gallery page, don't go to example
              event.preventDefault();
              event.stopPropagation();
              setShowSidebar(!showSidebar);
            }}
          >
            toggle nav
          </button>
        </div>
        <div className="app-graph">
          <ParentSize className="graph-container" debounceTime={10}>
            {({ width: visWidth, height: visHeight }) => (
              <Lines width={visWidth} height={visHeight} />
            )}
          </ParentSize>
        </div>
      </div>

      <style jsx>{`
        .app {
          display: flex;
        }

        .app-nav {
          border: 1px solid lightgray;
          border-right: none;
          display: flex;
          flex: 0.5;
          padding: 1rem;
        }

        .app-content {
          display: flex;
          flex: 1;
          flex-direction: column;
          overflow: hidden;
          padding: 1rem;
          border: 1px solid lightgray;
        }

        .app-graph {
          display: flex;
          flex: 1;
          overflow: hidden;
          background: #222;
        }
      `}</style>
    </div>
  );
}
