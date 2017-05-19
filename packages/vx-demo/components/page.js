import Meta from './meta';
import Nav from './nav';
import cx from 'classnames';

export default ({ children, title, className }) => (
  <div className={cx("main", className)}>
    <Meta title={title} />
    <div className="nav-container">
      <Nav />
    </div>
    <div className="page-content">
      {children}
    </div>
    <style jsx>{`
      .main {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        color: #161616;
        overflow-x: hidden;
      }

      .nav-container {
        background: #ffffff;
      }
    `}</style>
  </div>
);
