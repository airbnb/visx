import React from 'react';
import Link from 'next/link';
// @ts-ignore
import GithubButton from 'react-github-button';

import NavItem from './NavItem';
import Belo from './icons/Belo';

const Nav = () => (
  <div className="nav">
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

      <GithubButton type="stargazers" namespace="airbnb" repo="visx" />
    </div>

    <style jsx>{`
      .belo {
        width: 32px;
        height: 32px;
        margin: 0 0.5rem;
      }
      .nav-inner {
        width: 95vw;
        margin: 0 auto;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
      }
      .nav {
        display: flex;
        flex-direction: row;
        flex: 1;
        align-items: center;
        justify-content: center;
        padding: 0.5rem 1rem;
        font-size: 16px;
        z-index: 3;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        margin: 0;
        background: #ffffff;
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
      .x-logo {
        width: 36px;
        height: 36px;
        margin-right: 1rem;
        background-image: url('static/x-24.svg');
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
          padding-right: 1rem;
        }

        .nav-inner {
          width: 99vw;
        }
      }
    `}</style>
  </div>
);
export default Nav;
