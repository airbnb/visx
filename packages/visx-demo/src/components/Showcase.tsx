import React from 'react';
import Tilt from 'react-tilt';
import GalleryTile from "../components/GalleryTile"
import sites from '../showcase/sites'


export type TileShowcaseProps = {
  width: number;
  height: number;
  url?: string
};

function getCardImage(url: string): string {
  // https://github.com/facebook/docusaurus/blob/main/website/src/pages/showcase/_components/ShowcaseCard/index.tsx
  // https://www.zachleat.com/web/screenshots/
  return (
    `https://slorber-api-screenshot.netlify.app/${encodeURIComponent(
      url,
    )}/opengraph/`
  );
}

function GenericImage({ url }: TileShowcaseProps){
  return (
    <>
      <img
        src={getCardImage(url)}
        className="showcase-image"
        height="100%"
        width="100%"
      />
      <style jsx>{`
        .showcase-image {
          object-fit: cover;
          object-position: center;
        }
      `}</style>
    </>
  )
}

const tileStyles = {
  background: '#eeeeee',
  borderRadius: 14,
  boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 6px',
};
const detailsStyles = {
  background: 'white',
  color: '#000000',
  borderRadius: '0 0 14px 14px'
};

const tiltOptions = { max: 8, scale: 1 };

export default function InTheWild() {

  return (
    <>
      <div className="in-the-wild">
        <div className="grid">
          {sites.map((tile, i) => {

            const GenericImageCoerced = () => {
              return <GenericImage height={null} width={null} url={tile.url} />
            }
            return (
              <Tilt key={`showcase-tile-${i}`} className="tilt" options={tiltOptions}>
                <GalleryTile<TileShowcaseProps>
                  title={tile.title}
                  description={tile.description}
                  exampleRenderer={GenericImageCoerced}
                  exampleUrl={tile.url}
                  tileStyles={tileStyles}
                  detailsStyles={detailsStyles}
                  tileShort={true}
                />
              </Tilt>
            )
          })}
        </div>
      </div>
      <style jsx>{`
        .gallery {
          display: flex;
          flex-direction: row;
        }
        .grid {
          width: 100%;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          overflow-x: hidden;
          padding-bottom: 40px;
        }
        .filters {
          margin-right: 24px;
          width: 150px;
          flex-shrink: 0;
        }
        h6 {
          margin: 0 4px 0 0;
        }
        .filter-label {
          font-size: 16;
          font-weight: 500;
        }
        .filter-button {
          display: block;
          cursor: pointer;
          border: none;
          outline: none;
          background: transparent;
          padding: 0;
          margin: 4px 4px 12px 0;
          font-size: 16px;
          line-height: 1em;
        }
        .emphasize {
          font-weight: bold;
        }
        .showcase-image {
         object-fit: cover;
         object-position: center;
        }
        @media (min-width: 800px) {
          .emphasize::before {
            content: '';
            padding-left: 4px;
            border-left: 2px solid #fc2e1c;
          }
        }
        @media (max-width: 800px) {
          .gallery {
            flex-direction: column;
            min-width: 90vw;
            max-width: 90vw;
            margin: 0;
          }
          .filters {
            display: flex;
            flex-wrap: wrap;
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </>
  );
}
