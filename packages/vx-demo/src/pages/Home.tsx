import React from 'react';
import Page from '../components/Page';
import Footer from '../components/Footer';

export default () => (
  <Page>
    <div className="home">
      <div className="hero">
        <h1>React + D3 = VX</h1>
        <div className="btn-container">
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
            href="https://github.com/hshoff/vx"
          >
            View on Github
          </a>
        </div>
      </div>
      <div className="container">
        <div className="content">
          <p>
            <code>vx</code> is collection of reusable low-level visualization components.{' '}
            <code>vx</code> combines the power of <code>d3</code> to generate your visualization
            with the benefits of <code>react</code> for updating the DOM.
          </p>
        </div>
        <div className="content">
          <h3>Goal</h3>
          <p>
            The goal is to create a library of components you can use to make both your own reusable
            chart library or your slick custom one-off chart. <code>vx</code> is largely
            unopinionated and is meant to be build on top of. Keep your bundle sizes down and use
            only the packages you need.
          </p>
        </div>
        <div className="content">
          <h3>How?</h3>
          <p>
            Under the hood, <code>vx</code> is using <code>d3</code> for the calculations and math.
            If you're creating your own awesome chart library ontop of vx, it's easy to create a
            component api that hides <code>d3</code> entirely. Meaning your team could create charts
            as easily as using reusable react components.
          </p>
        </div>
        <div className="content">
          <h3>But why?</h3>
          <p>
            Mixing two mental models for updating the DOM is never a good time. Copy and pasting d3
            code into <code>componentDidMount()</code> is just that. This collection of components
            lets you easily build your own reusable visualization charts or library without having
            to learn d3. No more selections or <code>enter()</code>/<code>exit()</code>/
            <code>update()</code>.
          </p>
        </div>
        <div className="content">
          <h3>FAQ</h3>
          <ol className="faq">
            <li>
              <p>
                What does <code>vx</code> stand for?
              </p>
              <blockquote>
                <p>vx stands for visualization components.</p>
              </blockquote>
            </li>
            <li>
              <p>Do you plan on supporting animation/transitions?</p>
              <blockquote>
                <p>yup!</p>
              </blockquote>
            </li>
            <li>
              <p>Do I have to use every package to make a chart?</p>
              <blockquote>
                <p>nope! pick and choose the packages you need.</p>
              </blockquote>
            </li>
            <li>
              <p>Can I use this to create my own library of charts for my team?</p>
              <blockquote>
                <p>Please do.</p>
              </blockquote>
            </li>
            <li>
              <p>
                I like using <code>d3</code>.
              </p>
              <blockquote>
                <p>Me too.</p>
              </blockquote>
            </li>
          </ol>
        </div>
      </div>
      <Footer />
    </div>

    <style jsx>{`
      .btn {
        padding: 8px 20px;
        background-color: #fc2e1c;
        border-radius: 30px;
        border-top-right-radius: 0;
        color: #ffffff;
        font-family: 'Montserrat';
        text-transform: uppercase;
        margin-right: 1rem;
      }

      .btn-container {
        margin-top: 8rem;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
      }

      .home {
        display: flex;
        flex-direction: column;
        background: white;
        padding: 1rem;
      }

      .home h1 {
        font-family: 'Montserrat';
        color: #fc2e1c;
        font-size: 95pt;
        line-height: 1em;
        margin: 0;
        padding: 0;
        opacity: 0.9;
        margin-top: 130px;
        letter-spacing: 20px;
        text-transform: uppercase;
        text-align: center;
      }

      .hero {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        min-height: 60vh;
        background-size: 50%;
        background-repeat: no-repeat;
        background-position: center;
        background-image: url('static/tiger-gray.png');
        margin-bottom: 1rem;
      }

      .container {
        display: flex;
        align-items: center;
        flex-direction: column;
      }

      .content {
        max-width: 640px;
        min-width: 640px;
        margin: 1rem auto 0;
        display: flex;
        flex-direction: column;
      }

      .content h3 {
        margin-bottom: 0;
      }

      blockquote {
        border-left: 2px solid #efefef;
        padding: 0.5rem 1rem;
        color: #777;
      }

      blockquote p {
        margin: 0;
      }

      .faq {
        min-width: 640px;
      }

      @media (max-width: 600px) {
        .hero h1 {
          font-size: 35pt;
          margin-top: 40px;
          padding: 0;
        }

        .btn {
          font-size: 12px;
          padding: 4px 20px;
          margin-top: 2rem;
        }

        .hero {
          height: 50vh;
          background-size: 90%;
          margin-bottom: 1rem;
        }

        .content,
        .faq {
          min-width: 300px;
        }
      }
    `}</style>
  </Page>
);
