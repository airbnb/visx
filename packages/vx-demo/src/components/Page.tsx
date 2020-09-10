import React from 'react';
import cx from 'classnames';
import Meta from './Meta';
import Nav from './Nav';

const Page = ({
  children,
  title,
  className,
}: {
  children: React.ReactNode;
  title?: string;
  className?: string | boolean;
}) => (
  <div className={cx('main', className)}>
    <Meta title={title} />
    <div className="nav-container">
      <Nav />
    </div>
    <div className="page-content">{children}</div>
    <style jsx>{`
      .main {
        width: 100vw;
        margin: 0 auto;
        overflow-x: hidden;
      }
      .page-content {
        padding-top: var(--nav-height);
        height: 100vh;
        display: flex;
        flex-direction: row;
        box-sizing: border-box;
        color: #161616;
        overflow-y: auto;
        overflow-x: hidden;
        -webkit-overflow-scrolling: touch;
      }
    `}</style>
  </div>
);

export default Page;
