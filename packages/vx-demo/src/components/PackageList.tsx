import React from 'react';
import { VxPackage } from '../types';

export default function PackageList({
  emphasizePackage,
  compact,
  grid,
}: {
  emphasizePackage?: VxPackage;
  compact?: boolean;
  grid?: boolean;
}) {
  const HeaderElement = compact ? 'h6' : 'h3';
  return (
    <>
      <div className="categories">
        <div>
          <HeaderElement>Chart primitives</HeaderElement>
          <ul>
            <li>
              <a
                href="/docs/annotation"
                className={emphasizePackage === 'annotation' && 'emphasize'}
              >
                @vx/annotation
              </a>
              {!compact && <p>Annotate elements of a chart</p>}
            </li>
            <li>
              <a href="/docs/axis" className={emphasizePackage === 'axis' && 'emphasize'}>
                @vx/axis
              </a>
              {!compact && <p>Annotate your coordinate system</p>}
            </li>
            <li>
              <a href="/docs/curve" className={emphasizePackage === 'curve' && 'emphasize'}>
                @vx/curve
              </a>
              {!compact && <p>d3 line interpolators for @vx/shape</p>}
            </li>
            <li>
              <a href="/docs/glyph" className={emphasizePackage === 'glyph' && 'emphasize'}>
                @vx/glyph
              </a>
              {!compact && <p>Complex marks & symbols</p>}
            </li>
            <li>
              <a href="/docs/grid" className={emphasizePackage === 'grid' && 'emphasize'}>
                @vx/grid
              </a>
              {!compact && <p>Grid lines for a chart</p>}
            </li>
            <li>
              <a href="/docs/legend" className={emphasizePackage === 'legend' && 'emphasize'}>
                @vx/legend
              </a>
              {!compact && <p>Keys for reading your visual encodings</p>}
            </li>
            <li>
              <a href="/docs/marker" className={emphasizePackage === 'marker' && 'emphasize'}>
                @vx/marker
              </a>
              {!compact && <p>Annotation lines with text</p>}
            </li>
            <li>
              <a href="/docs/scale" className={emphasizePackage === 'scale' && 'emphasize'}>
                @vx/scale
              </a>
              {!compact && <p>d3 scales to map data to visual attributes</p>}
            </li>
            <li>
              <a href="/docs/shape" className={emphasizePackage === 'shape' && 'emphasize'}>
                @vx/shape
              </a>
              {!compact && <p>Fundamental visualization shape primatives</p>}
            </li>
            <li>
              <a href="/docs/threshold" className={emphasizePackage === 'threshold' && 'emphasize'}>
                @vx/threshold
              </a>
              {!compact && <p>Fundamental visualization shape primatives</p>}
            </li>
            <li>
              <a href="/docs/tooltip" className={emphasizePackage === 'tooltip' && 'emphasize'}>
                @vx/tooltip
              </a>
              {!compact && <p>Show details on demand</p>}
            </li>
          </ul>
        </div>
        <div>
          <HeaderElement>Layouts / Specialized</HeaderElement>
          <ul>
            <li>
              <a href="/docs/chord" className={emphasizePackage === 'chord' && 'emphasize'}>
                @vx/chord
              </a>
              {!compact && <p>Radial layout for matrix relationships</p>}
            </li>
            <li>
              <a href="/docs/geo" className={emphasizePackage === 'geo' && 'emphasize'}>
                @vx/geo
              </a>
              {!compact && <p>Geographic projections</p>}
            </li>
            <li>
              <a href="/docs/heatmap" className={emphasizePackage === 'heatmap' && 'emphasize'}>
                @vx/heatmap
              </a>
              {!compact && <p>Represent data values using color</p>}
            </li>
            <li>
              <a href="/docs/hierarchy" className={emphasizePackage === 'hierarchy' && 'emphasize'}>
                @vx/hierarchy
              </a>
              {!compact && <p>Multiple layouts for hierarchical or nested data</p>}
            </li>
            <li>
              <a href="/docs/network" className={emphasizePackage === 'network' && 'emphasize'}>
                @vx/network
              </a>
              {!compact && <p>Visualize nodes and links between them</p>}
            </li>
            <li>
              <a href="/docs/stats" className={emphasizePackage === 'stats' && 'emphasize'}>
                @vx/stats
              </a>
              {!compact && <p>Visualize distributions</p>}
            </li>
          </ul>
        </div>
        <div>
          <HeaderElement>Interactions</HeaderElement>
          <ul>
            <li>
              <a href="/docs/brush" className={emphasizePackage === 'brush' && 'emphasize'}>
                @vx/brush
              </a>
              {!compact && <p>Enable selection of a part of an interface</p>}
            </li>
            <li>
              <a href="/docs/drag" className={emphasizePackage === 'drag' && 'emphasize'}>
                @vx/drag
              </a>
              {!compact && <p>Make elements of an inteface draggable</p>}
            </li>
            <li>
              <a href="/docs/voronoi" className={emphasizePackage === 'voronoi' && 'emphasize'}>
                @vx/voronoi
              </a>
              {!compact && <p>Partition points in a chart to improve user interaction</p>}
            </li>
            <li>
              <a href="/docs/zoom" className={emphasizePackage === 'zoom' && 'emphasize'}>
                @vx/zoom
              </a>
              {!compact && <p>Apply transforms to a viewport</p>}
            </li>
          </ul>
        </div>
        <div>
          <HeaderElement>SVG utilities</HeaderElement>
          <ul>
            <li>
              <a href="/docs/clip-path" className={emphasizePackage === 'clip-path' && 'emphasize'}>
                @vx/clip-path
              </a>
              {!compact && <p>Utilities for clip-path elements</p>}
            </li>
            <li>
              <a href="/docs/group" className={emphasizePackage === 'group' && 'emphasize'}>
                @vx/group
              </a>
              {!compact && <p>Utility for g elements</p>}
            </li>
            <li>
              <a href="/docs/gradient" className={emphasizePackage === 'gradient' && 'emphasize'}>
                @vx/gradient
              </a>
              {!compact && <p>Utilities for making making color gradient definitions</p>}
            </li>
            <li>
              <a href="/docs/pattern" className={emphasizePackage === 'pattern' && 'emphasize'}>
                @vx/pattern
              </a>
              {!compact && <p>Utilities for making pattern definitions</p>}
            </li>
            <li>
              <a href="/docs/text" className={emphasizePackage === 'text' && 'emphasize'}>
                @vx/text
              </a>
              {!compact && <p>Utilities for styling & wrapping svg text</p>}
            </li>
          </ul>
        </div>
        <div>
          <HeaderElement>Data utilities</HeaderElement>
          <ul>
            <li>
              <a href="/docs/bounds" className={emphasizePackage === 'bounds' && 'emphasize'}>
                @vx/bounds
              </a>
              {!compact && <p>Detect the bounding box of an element & its parent</p>}
            </li>
            <li>
              <a href="/docs/mock-data" className={emphasizePackage === 'mock-data' && 'emphasize'}>
                @vx/mock-data
              </a>
              {!compact && <p>Lots of mock data sets to play with</p>}
            </li>
            <li>
              <a
                href="/docs/responsive"
                className={emphasizePackage === 'responsive' && 'emphasize'}
              >
                @vx/responsive
              </a>
              {!compact && <p>Utilities to make responsive visualizations easily</p>}
            </li>
            <li>
              <a href="/docs/point" className={emphasizePackage === 'point' && 'emphasize'}>
                @vx/point
              </a>
              {!compact && <p>A simple class to represent an x,y coordinate</p>}
            </li>
          </ul>
        </div>
      </div>
      <style jsx>{`
        .categories {
          display: ${grid ? 'grid' : 'unset'};
          grid-gap: 2em;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
        }
        h6 {
          margin: 0;
          font-weight: initial;
        }
        ul {
          padding: 0;
          margin-top: 0;
          margin-bottom: 0;
        }
        li {
          font-size: ${compact ? '14px' : undefined};
          line-height: 1.75em;
          background-color: ${compact ? undefined : '#f8f8f8'};
          padding: ${compact ? 0 : '0.5em'};
          margin-bottom: ${compact ? 0 : '1em'};
          width: 100%;
          overflow: ellipsis;
        }
        li p {
          margin: 0;
          font-size: 11px;
        }
        .emphasize {
          font-weight: bold;
        }
      `}</style>
    </>
  );
}
