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
                href="/static/docs/vx-annotation.html"
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
              <a
                href="/static/docs/vx-curve.html"
                className={emphasizePackage === 'curve' && 'emphasize'}
              >
                @vx/curve
              </a>
              {!compact && <p>d3 line interpolators for @vx/shape</p>}
            </li>
            <li>
              <a
                href="/static/docs/vx-glyph.html"
                className={emphasizePackage === 'glyph' && 'emphasize'}
              >
                @vx/glyph
              </a>
              {!compact && <p>Complex marks & symbols</p>}
            </li>
            <li>
              <a
                href="/static/docs/vx-grid.html"
                className={emphasizePackage === 'grid' && 'emphasize'}
              >
                @vx/grid
              </a>
              {!compact && <p>Grid lines for a chart</p>}
            </li>
            <li>
              <a
                href="/static/docs/vx-legend.html"
                className={emphasizePackage === 'legend' && 'emphasize'}
              >
                @vx/legend
              </a>
              {!compact && <p>Keys for reading your visual encodings</p>}
            </li>
            <li>
              <a
                href="/static/docs/vx-marker.html"
                className={emphasizePackage === 'marker' && 'emphasize'}
              >
                @vx/marker
              </a>
              {!compact && <p>Annotation lines with text</p>}
            </li>
            <li>
              <a
                href="/static/docs/vx-scale.html"
                className={emphasizePackage === 'scale' && 'emphasize'}
              >
                @vx/scale
              </a>
              {!compact && <p>d3 scales to map data to visual attributes</p>}
            </li>
            <li>
              <a
                href="/static/docs/vx-shape.html"
                className={emphasizePackage === 'shape' && 'emphasize'}
              >
                @vx/shape
              </a>
              {!compact && <p>Fundamental visualization shape primatives</p>}
            </li>
            <li>
              <a
                href="/static/docs/vx-threshold.html"
                className={emphasizePackage === 'threshold' && 'emphasize'}
              >
                @vx/threshold
              </a>
              {!compact && <p>Fundamental visualization shape primatives</p>}
            </li>
            <li>
              <a
                href="/static/docs/vx-tooltip.html"
                className={emphasizePackage === 'tooltip' && 'emphasize'}
              >
                @vx/tooltip
              </a>
              {!compact && <p>Show details on demand</p>}
            </li>
          </ul>
        </div>
        <div>
          <HeaderElement>Layouts & specialized</HeaderElement>
          <ul>
            <li>
              <a
                href="/static/docs/vx-chord.html"
                className={emphasizePackage === 'chord' && 'emphasize'}
              >
                @vx/chord
              </a>
              {!compact && <p>Radial layout for matrix relationships</p>}
            </li>
            <li>
              <a
                href="/static/docs/vx-geo.html"
                className={emphasizePackage === 'geo' && 'emphasize'}
              >
                @vx/geo
              </a>
              {!compact && <p>Geographic projections</p>}
            </li>
            <li>
              <a
                href="/static/docs/vx-heatmap.html"
                className={emphasizePackage === 'heatmap' && 'emphasize'}
              >
                @vx/heatmap
              </a>
              {!compact && <p>Represent data values using color</p>}
            </li>
            <li>
              <a
                href="/static/docs/vx-hierarchy.html"
                className={emphasizePackage === 'hierarchy' && 'emphasize'}
              >
                @vx/hierarchy
              </a>
              {!compact && <p>Multiple layouts for hierarchical or nested data</p>}
            </li>
            <li>
              <a
                href="/static/docs/vx-network.html"
                className={emphasizePackage === 'network' && 'emphasize'}
              >
                @vx/network
              </a>
              {!compact && <p>Visualize nodes and links between them</p>}
            </li>
            <li>
              <a
                href="/static/docs/vx-stats.html"
                className={emphasizePackage === 'stats' && 'emphasize'}
              >
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
              <a
                href="/static/docs/vx-brush.html"
                className={emphasizePackage === 'brush' && 'emphasize'}
              >
                @vx/brush
              </a>
              {!compact && <p>Enable selection of a part of an interface</p>}
            </li>
            <li>
              <a
                href="/static/docs/vx-drag.html"
                className={emphasizePackage === 'drag' && 'emphasize'}
              >
                @vx/drag
              </a>
              {!compact && <p>Make elements of an inteface draggable</p>}
            </li>
            <li>
              <a
                href="/static/docs/vx-voronoi.html"
                className={emphasizePackage === 'voronoi' && 'emphasize'}
              >
                @vx/voronoi
              </a>
              {!compact && <p>Partition points in a chart to improve user interaction</p>}
            </li>
            <li>
              <a
                href="/static/docs/vx-zoom.html"
                className={emphasizePackage === 'zoom' && 'emphasize'}
              >
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
              <a
                href="/static/docs/vx-clip-path.html"
                className={emphasizePackage === 'clip-path' && 'emphasize'}
              >
                @vx/clip-path
              </a>
              {!compact && <p>Utilities for clip-path elements</p>}
            </li>
            <li>
              <a
                href="/static/docs/vx-group.html"
                className={emphasizePackage === 'group' && 'emphasize'}
              >
                @vx/group
              </a>
              {!compact && <p>Utility for g elements</p>}
            </li>
            <li>
              <a
                href="/static/docs/vx-gradient.html"
                className={emphasizePackage === 'gradient' && 'emphasize'}
              >
                @vx/gradient
              </a>
              {!compact && <p>Utilities for making making color gradient definitions</p>}
            </li>
            <li>
              <a
                href="/static/docs/vx-pattern.html"
                className={emphasizePackage === 'pattern' && 'emphasize'}
              >
                @vx/pattern
              </a>
              {!compact && <p>Utilities for making pattern definitions</p>}
            </li>
            <li>
              <a
                href="/static/docs/vx-text.html"
                className={emphasizePackage === 'text' && 'emphasize'}
              >
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
              <a
                href="/static/docs/vx-bounds.html"
                className={emphasizePackage === 'bounds' && 'emphasize'}
              >
                @vx/bounds
              </a>
              {!compact && <p>Detect the bounding box of an element & its parent</p>}
            </li>
            <li>
              <a
                href="/static/docs/vx-mock-data.html"
                className={emphasizePackage === 'mock-data' && 'emphasize'}
              >
                @vx/mock-data
              </a>
              {!compact && <p>Lots of mock data sets to play with</p>}
            </li>
            <li>
              <a
                href="/static/docs/vx-responsive.html"
                className={emphasizePackage === 'responsive' && 'emphasize'}
              >
                @vx/responsive
              </a>
              {!compact && <p>Utilities to make responsive visualizations easily</p>}
            </li>
            <li>
              <a
                href="/static/docs/vx-point.html"
                className={emphasizePackage === 'point' && 'emphasize'}
              >
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
