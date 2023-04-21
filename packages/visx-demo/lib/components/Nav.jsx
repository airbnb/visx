import React from 'react';
import Link from 'next/link';
import GithubButton from 'react-github-button';
import NavItem from './NavItem';
import Belo from './icons/Belo';
function Nav() {
    return (<div className="nav">
      <div className="nav-inner wrapper">
        <Link href="/">
          <div className="belo">
            <Belo />
          </div>
        </Link>
        <ul>
          <NavItem id="home" href="/">
            Home
          </NavItem>
          <NavItem href="/docs">Docs</NavItem>
          <NavItem href="/gallery">Gallery</NavItem>
        </ul>

        <GithubButton type="stargazers" namespace="airbnb" repo="visx"/>
      </div>

      <style jsx>{"\n        .belo {\n          width: 32px;\n          height: 32px;\n          margin: 0 0.5rem;\n        }\n        .nav-inner {\n          width: 95vw;\n          margin: 0 auto;\n          display: flex;\n          flex-direction: row;\n          align-items: center;\n          justify-content: center;\n        }\n        .nav {\n          display: flex;\n          flex-direction: row;\n          flex: 1;\n          align-items: center;\n          justify-content: center;\n          padding: 0.5rem 1rem;\n          font-size: 16px;\n          z-index: 3;\n          position: fixed;\n          top: 0;\n          left: 0;\n          right: 0;\n          margin: 0;\n          background: #ffffff;\n        }\n        ul {\n          list-style-type: none;\n          display: flex;\n          flex: 1;\n          flex-direction: row;\n          padding: 0;\n          margin: 0;\n          color: white;\n          justify-content: flex-start;\n          align-items: center;\n        }\n        .x-logo {\n          width: 36px;\n          height: 36px;\n          margin-right: 1rem;\n          background-image: url('static/x-24.svg');\n        }\n        @media (max-width: 600px) {\n          .github-buttons {\n            display: none;\n          }\n          .Item {\n            float: left;\n          }\n\n          .nav {\n            padding: 0;\n            padding-right: 1rem;\n          }\n\n          .nav-inner {\n            width: 99vw;\n          }\n        }\n      "}</style>
    </div>);
}
export default Nav;
