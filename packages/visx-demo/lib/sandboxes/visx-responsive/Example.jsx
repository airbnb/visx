import React, { useState } from 'react';
import ParentSize from '@visx/responsive/lib/components/ParentSize';
import Lines from './Lines';
function Nav() {
    return (<ul>
      <li>
        <span role="img" aria-label="robot">
          🤖
        </span>
      </li>
      <li>Home</li>
      <li>Profile</li>
      <li>Favorites</li>
      <li>Settings</li>
    </ul>);
}
export default function Example(_a) {
    var width = _a.width, height = _a.height;
    var _b = useState(true), showSidebar = _b[0], setShowSidebar = _b[1];
    return width < 20 || height < 20 ? null : (<div className="app" style={{ width: width, height: height }}>
      {showSidebar && (<div className="app-nav">
          <Nav />
        </div>)}
      <div className="app-content">
        <div>
          <button onClick={function (event) {
        // on gallery page, don't go to example
        event.preventDefault();
        event.stopPropagation();
        setShowSidebar(!showSidebar);
    }}>
            toggle nav
          </button>
        </div>
        <div className="app-graph">
          <ParentSize className="graph-container" debounceTime={10}>
            {function (_a) {
        var visWidth = _a.width, visHeight = _a.height;
        return (<Lines width={visWidth} height={visHeight}/>);
    }}
          </ParentSize>
        </div>
      </div>

      <style jsx>{"\n        .app {\n          display: flex;\n        }\n\n        .app-nav {\n          border: 1px solid lightgray;\n          border-right: none;\n          display: flex;\n          flex: 0.5;\n          padding: 1rem;\n        }\n\n        .app-content {\n          display: flex;\n          flex: 1;\n          flex-direction: column;\n          overflow: hidden;\n          padding: 1rem;\n          border: 1px solid lightgray;\n        }\n\n        .app-graph {\n          display: flex;\n          flex: 1;\n          overflow: hidden;\n          background: #222;\n        }\n      "}</style>
    </div>);
}
