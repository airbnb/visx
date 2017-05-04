import Link from 'next/link';

export default () => (
  <div className='nav'>
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
    </ul>

    <style jsx>{`
      .nav {
        display: flex;
        flex-direction: row;
        flex: 1;
        align-items: center;
        padding: 0 10px;
        font-size: 14px;
        position: relative;
        z-index: 3;
      }
      ul {
        list-style-type: none;
        display: flex;
        flex: 1;
        flex-direction: row;
        padding: 0;
        margin: 0;
        color: white;
        justify-content: flex-end;
      }
      @media (max-width: 600px) {
        .github-buttons {
          display: none;
        }
        .Item {
          float: left;
        }
      }
    `}</style>
  </div>
)

const Item = ({ href, children, className }) => (
  <li className="Item">
    <Link href={href}>
      <a className={className}>{ children }</a>
    </Link>

    <style jsx>{`
      .Item a {
        display: inline-block;
        padding: 10px;
        text-decoration: none;
        color: #fc2e1c;
        font-weight: 600;
      }
      .Item .github {
        font-weight: 600;
        color: #fc2e1c;
      }

      @media (max-width: 600px) {
        .Item {
          display: block;
          float: left;
        }

        .Item .github {
          margin-top: 0;
        }
      }
    `}</style>
  </li>
)
