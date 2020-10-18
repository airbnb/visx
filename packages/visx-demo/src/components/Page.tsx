import React from 'react';
import cx from 'classnames';
import Meta from './Meta';
import Nav from './Nav';

const Page = ({
  children,
  title,
  className,
  wrapper = true,
}: {
  children: React.ReactNode;
  title?: string;
  className?: string | boolean;
  wrapper?: boolean;
}) => (
  <div className={cx('main', { wrapper }, className)}>
    <Meta title={title} />
    <div className="nav-container">
      <Nav />
    </div>
    <div className="page-content">{children}</div>
    <style jsx>{`
      .main {
        width: 95vw;
        margin: 0 auto;
        overflow-x: hidden;
      }
      .page-content {
        margin: 69px 0 40px;
        color: #161616;
        overflow-y: auto;
        overflow-x: hidden;
        -webkit-overflow-scrolling: touch;
      }

      .nav-container {
        background: #ffffff;
      }
    `}</style>
  </div>
);
export default Page;
