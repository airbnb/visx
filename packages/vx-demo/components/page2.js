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

    `}</style>
  </div>
);
