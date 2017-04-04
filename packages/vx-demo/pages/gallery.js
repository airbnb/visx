import React from 'react';
import Page from '../components/page';

export default () => (
  <Page title="gallery">
    <div className="gallery">
      <div className="item">
      </div>
      <div className="item">
      </div>
      <div className="item">
      </div>
      <div className="item">
      </div>
    </div>

    <style jsx>{`
      .gallery {
        margin-top: 120px;
        display: flex;
        flex: 1;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-around;
      }

      .item {
        background-color: #efefef;
        width: 520px;
        height: 400px;
        margin: 2rem;
      }
    `}</style>
  </Page>
)
