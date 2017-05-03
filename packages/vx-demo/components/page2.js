import Meta from './meta2';
import Nav from './nav2';

export default ({ children, title }) => (
  <div className="main">
    <Meta title={title} />
    <Nav />
    <div>
      {children}
    </div>
    <style jsx>{`
      .main {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: white;
        color: #161616;
      }
    `}</style>
  </div>
);
