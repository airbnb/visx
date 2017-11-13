import React from 'react';
import Show from '../components/show';
import Responsive from '../components/tiles/responsive';

export default () => {
  return (
    <Show component={Responsive} title="Responsive">
      {`import React from 'react';
import { ParentSize } from '@vx/responsive';
import Treemap from './treemap';

function Nav() {
  return (
    <ul>
      <li>🤖</li>
      <li>Home</li>
      <li>Profile</li>
      <li>Favorites</li>
      <li>Settings</li>
    </ul>
  );
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showNav: true };
    this.toggleNav = this.toggleNav.bind(this);
  }
  toggleNav() {
    this.setState(prevState => {
      return {
        showNav: !prevState.showNav,
      };
    });
  }
  render() {
    const { width, height } = this.props;
    return (
      <div className="app" style={{ width, height }}>
        <div
          className="app-nav"
          style={{
            display: this.state.showNav ? 'flex' : 'none',
          }}
        >
          <Nav />
        </div>
        <div className="app-content">
          <div>
            <button onClick={this.toggleNav}>toggle nav</button>
          </div>
          <div className="app-graph">
            <ParentSize className="graph-container">
              {({ width: w, height: h }) => {
                return (
                  <Treemap
                    width={w}
                    height={h}
                    margin={{
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                    }}
                  />
                );
              }}
            </ParentSize>
          </div>
        </div>

        <style jsx>{\`
          .app {
            display: flex;
          }

          .app-nav {
            border: 1px solid lightgray;
            border-right: none;
            display: flex;
            flex: 0.5;
            padding: 1rem;
          }

          .app-content {
            display: flex;
            flex: 1;
            flex-direction: column;
            overflow: hidden;
            padding: 1rem;
            border: 1px solid lightgray;
            border-top-right-radius: 14px;
            border-bottom-right-radius: 14px;
          }

          .app-graph {
            display: flex;
            flex: 1;
          }
        \`}</style>
      </div>
    );
  }
}`}
    </Show>
  );
};
