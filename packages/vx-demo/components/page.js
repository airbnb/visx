import Meta from './meta';
import Nav from './nav';

export default ({ children, title }) => (
  <div className="main">
    <Meta title={title} />
    <div className="left">
      <Nav />
    </div>
    <div className="right">
      {children}
    </div>

    <style jsx>{`
      .main {
        display: flex;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        font-size: 16px;
      }

      .left {
        display: flex;
        flex: 1;
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
      }

      .right {
        display: flex;
        flex: 5;
        line-height: 2rem;
        font-family: 'Roboto Mono';
        margin-left: 250px;
      }
    `}</style>
  </div>
);
