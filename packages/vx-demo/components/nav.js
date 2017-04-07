import Link from 'next/link';

export default () => (
  <div>
    <Link prefetch href="/">
      <div className="logo" />
    </Link>
    <div className="github-buttons">
      <a
        className="github-button"
        href="https://github.com/hshoff/vx"
        data-icon="octicon-star"
        data-count-href="/hshoff/vx/stargazers"
        data-count-api="/repos/hshoff/vx#stargazers_count"
        data-count-aria-label="# stargazers on GitHub"
        aria-label="Star hshoff/vx on GitHub"
      >
        Star
      </a>
    </div>
    <ul>
      <Item href="/">Home</Item>
      <Item href="/docs">Docs</Item>
      <Item href="/gallery">Gallery</Item>

      <Item href="https://github.com/hshoff/vx" className="github">
        github
      </Item>
    </ul>

    <style jsx>{`
      ul {
        list-style-type: none;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        padding-top: 20px;
      }

      .github-buttons {
        align-items: flex-end;
        display: flex;
        flex-direction: column;
        padding-right: 10px;
        margin-top: 1rem;
      }
    `}</style>
  </div>
)

const Item = ({ href, children, className }) => (
  <li className="Item">
    <Link prefetch href={href}>
      <a className={className}>{ children }</a>
    </Link>

    <style jsx>{`
      .Item a {
        display: inline-block;
        padding: 10px;
        text-decoration: none;
        color: #000;
        font-weight: 300;
      }
      .Item .github {
        margin-top: 1.5rem;
        font-weight: 600;
        color: #fc2e1c;
      }
    `}</style>
  </li>
)
