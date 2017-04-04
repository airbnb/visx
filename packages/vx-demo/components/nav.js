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

      <Item href="https://github.com/hshoff/vx" className="github">
        github
      </Item>

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

const Item = ({ href, children, className }) => (
  <li>
    <Link prefetch href={href}>
      <a className={className}>{ children }</a>
    </Link>

    <style jsx>{`
      a {
        display: inline-block;
        padding: 10px;
        text-decoration: none;
        color: #000;
        font-weight: 300;
      }
      .github {
        margin-top: 1.5rem;
        font-weight: 600;
        color: #fc2e1c;
      }
    `}</style>
  </li>
)
