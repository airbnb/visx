import React from 'react';
import cx from 'classnames';
import Meta from './Meta';
import Nav from './Nav';
function Page(_a) {
    var children = _a.children, title = _a.title, className = _a.className, _b = _a.wrapper, wrapper = _b === void 0 ? true : _b;
    return (<div className={cx('main', { wrapper: wrapper }, className)}>
      <Meta title={title}/>
      <div className="nav-container">
        <Nav />
      </div>
      <div className="page-content">{children}</div>
      <style jsx>{"\n        .main {\n          width: 95vw;\n          margin: 0 auto;\n          overflow-x: hidden;\n        }\n        .page-content {\n          margin: 69px 0 40px;\n          color: #161616;\n          overflow-y: auto;\n          overflow-x: hidden;\n          -webkit-overflow-scrolling: touch;\n        }\n\n        .nav-container {\n          background: #ffffff;\n        }\n      "}</style>
    </div>);
}
export default Page;
