import React from 'react';
import Link from 'next/link';
// @ts-ignore
import GithubButton from 'react-github-button';

import NavItem from './NavItem';

const Nav = () => (
  <div className="nav">
    <div className="nav-inner">
      <Link href="/">
        <div className="logo" />
      </Link>
    </div>
    {false && <GithubButton type="stargazers" namespace="hshoff" repo="vx" />}

    <style jsx>{`
      .stars {
        margin-left: 0.5rem;
        display: flex;
      }
      .nav-inner {
        flex: 1;
        margin: 0 1.75rem;
        display: flex;
        flex-direction: row;
        align-items: center;
        height: var(--nav-height);
      }
      .nav {
        display: flex;
        flex-direction: row;
        flex: 1;
        align-items: center;
        justify-content: center;
        padding: 0;
        font-size: 14px;
        z-index: 3;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        margin: 0;
      }
      ul {
        list-style-type: none;
        display: flex;
        flex: 1;
        flex-direction: row;
        padding: 0;
        margin: 0;
        color: white;
        justify-content: flex-start;
        align-items: center;
      }
      @media (max-width: 600px) {
        .github-buttons {
          display: none;
        }
        .Item {
          float: left;
        }

        .nav {
          padding: 0;
        }

        .nav-inner {
          width: 99vw;
        }
      }
    `}</style>
  </div>
);
export default Nav;
