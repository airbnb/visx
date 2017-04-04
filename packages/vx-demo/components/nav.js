import Link from 'next/link';

export default () => (
  <div>
    <Link prefetch href="/">
      <div className="logo" />
    </Link>
    <ul>
      <Item href="/">Home</Item>
      <Item href="/docs">Docs</Item>
      <Item href="/gallery">Gallery</Item>

      <style jsx>{`
        ul {
          list-style-type: none;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          padding-top: 20px;
        }
      `}</style>
    </ul>
  </div>
)

const Item = ({ href, children }) => (
  <li>
    <Link prefetch href={href}>
      <a>{ children }</a>
    </Link>

    <style jsx>{`
      a {
        display: inline-block;
        padding: 10px;
        text-decoration: none;
        color: #000;
      }
    `}</style>
  </li>
)
