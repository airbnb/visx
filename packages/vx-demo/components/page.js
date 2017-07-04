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
        width: 100vw;
        margin: 0 auto;
        overflow-x: hidden;
      }
      .page-content {
        width: 95vw;
        margin: 55px auto 40px;
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
