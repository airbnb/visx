import React from 'react';
import cx from 'classnames';
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
      <div className="container">
        <div>
          <HeaderElement>Chart primitives</HeaderElement>
          <ul>
            <li>
              <a
                href="/docs/annotation"
                className={cx(emphasizePackage === 'annotation' && 'emphasize')}
              >
                @vx/annotation
              </a>
              {!compact && <p>Annotate elements of a chart</p>}
            </li>
            <li>
              <a href="/docs/axis" className={cx(cx(emphasizePackage === 'axis' && 'emphasize'))}>
                @vx/axis
              </a>
              {!compact && <p>Annotate your coordinate system</p>}
            </li>
            <li>
              <a
                href="/static/docs/vx-curve.html"
                className={cx(cx(emphasizePackage === 'curve' && 'emphasize'))}
              >
                @vx/curve
              </a>
              {!compact && <p>d3 line interpolators for @vx/shape</p>}
            </li>
            <li>
              <a
                href="/static/docs/vx-glyph.html"
                className={cx(emphasizePackage === 'glyph' && 'emphasize')}
              >
                @vx/glyph
              </a>
              {!compact && <p>Complex marks & symbols</p>}
            </li>
            <li>
              <a
                href="/static/docs/vx-grid.html"
                className={cx(emphasizePackage === 'grid' && 'emphasize')}
              >
                @vx/grid
              </a>
              {!compact && <p>Grid lines for a chart</p>}
            </li>
            <li>
              <a
                href="/static/docs/vx-legend.html"
                className={cx(emphasizePackage === 'legend' && 'emphasize')}
              >
                @vx/legend
              </a>
              {!compact && <p>Keys for reading your visual encodings</p>}
            </li>
            <li>
              <a
                href="/static/docs/vx-marker.html"
                className={cx(emphasizePackage === 'marker' && 'emphasize')}
              >
                @vx/marker
              </a>
              {!compact && <p>Annotation lines with text</p>}
            </li>
            <li>
              <a
                href="/static/docs/vx-scale.html"
                className={cx(emphasizePackage === 'scale' && 'emphasize')}
              >
                @vx/scale
              </a>
              {!compact && <p>d3 scales to map data to visual attributes</p>}
            </li>
            <li>
              <a
                href="/static/docs/vx-shape.html"
                className={cx(emphasizePackage === 'shape' && 'emphasize')}
              >
                @vx/shape
              </a>
              {!compact && <p>Fundamental visualization shape primatives</p>}
            </li>
            <li>
              <a
                href="/static/docs/vx-threshold.html"
                className={cx(emphasizePackage === 'threshold' && 'emphasize')}
              >
                @vx/threshold
              </a>
              {!compact && <p>Fundamental visualization shape primatives</p>}
            </li>
            <li>
              <a
                href="/static/docs/vx-tooltip.html"
                className={cx(emphasizePackage === 'tooltip' && 'emphasize')}
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
                className={cx(emphasizePackage === 'chord' && 'emphasize')}
              >
                @vx/chord
              </a>
              {!compact && <p>Radial layout for matrix relationships</p>}
            </li>
            <li>
              <a
                href="/static/docs/vx-geo.html"
                className={cx(emphasizePackage === 'geo' && 'emphasize')}
              >
                @vx/geo
              </a>
              {!compact && <p>Geographic projections</p>}
            </li>
            <li>
              <a
                href="/static/docs/vx-heatmap.html"
                className={cx(emphasizePackage === 'heatmap' && 'emphasize')}
              >
                @vx/heatmap
              </a>
              {!compact && <p>Represent data values using color</p>}
            </li>
            <li>
              <a
                href="/static/docs/vx-hierarchy.html"
                className={cx(emphasizePackage === 'hierarchy' && 'emphasize')}
              >
                @vx/hierarchy
              </a>
              {!compact && <p>Multiple layouts for hierarchical or nested data</p>}
            </li>
            <li>
              <a
                href="/static/docs/vx-network.html"
                className={cx(emphasizePackage === 'network' && 'emphasize')}
              >
                @vx/network
              </a>
              {!compact && <p>Visualize nodes and links between them</p>}
            </li>
            <li>
              <a
                href="/static/docs/vx-stats.html"
                className={cx(emphasizePackage === 'stats' && 'emphasize')}
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
                className={cx(emphasizePackage === 'brush' && 'emphasize')}
              >
                @vx/brush
              </a>
              {!compact && <p>Enable selection of a part of an interface</p>}
            </li>
            <li>
              <a
                href="/static/docs/vx-drag.html"
                className={cx(emphasizePackage === 'drag' && 'emphasize')}
              >
                @vx/drag
              </a>
              {!compact && <p>Make elements of an inteface draggable</p>}
            </li>
            <li>
              <a
                href="/static/docs/vx-voronoi.html"
                className={cx(emphasizePackage === 'voronoi' && 'emphasize')}
              >
                @vx/voronoi
              </a>
              {!compact && <p>Partition points in a chart to improve user interaction</p>}
            </li>
            <li>
              <a
                href="/static/docs/vx-zoom.html"
                className={cx(emphasizePackage === 'zoom' && 'emphasize')}
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
                className={cx(emphasizePackage === 'clip-path' && 'emphasize')}
              >
                @vx/clip-path
              </a>
              {!compact && <p>Utilities for clip-path elements</p>}
            </li>
            <li>
              <a
                href="/static/docs/vx-group.html"
                className={cx(emphasizePackage === 'group' && 'emphasize')}
              >
                @vx/group
              </a>
              {!compact && <p>Utility for g elements</p>}
            </li>
            <li>
              <a
                href="/static/docs/vx-gradient.html"
                className={cx(emphasizePackage === 'gradient' && 'emphasize')}
              >
                @vx/gradient
              </a>
              {!compact && <p>Utilities for making making color gradient definitions</p>}
            </li>
            <li>
              <a
                href="/static/docs/vx-pattern.html"
                className={cx(emphasizePackage === 'pattern' && 'emphasize')}
              >
                @vx/pattern
              </a>
              {!compact && <p>Utilities for making pattern definitions</p>}
            </li>
            <li>
              <a
                href="/static/docs/vx-text.html"
                className={cx(emphasizePackage === 'text' && 'emphasize')}
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
              <a href="/docs/bounds" className={cx(emphasizePackage === 'bounds' && 'emphasize')}>
                @vx/bounds
              </a>
              {!compact && <p>Detect the bounding box of an element & its parent</p>}
            </li>
            <li>
              <a
                href="/static/docs/vx-mock-data.html"
                className={cx(emphasizePackage === 'mock-data' && 'emphasize')}
              >
                @vx/mock-data
              </a>
              {!compact && <p>Lots of mock data sets to play with</p>}
            </li>
            <li>
              <a
                href="/static/docs/vx-responsive.html"
                className={cx(emphasizePackage === 'responsive' && 'emphasize')}
              >
                @vx/responsive
              </a>
              {!compact && <p>Utilities to make responsive visualizations easily</p>}
            </li>
            <li>
              <a
                href="/static/docs/vx-point.html"
                className={cx(emphasizePackage === 'point' && 'emphasize')}
              >
                @vx/point
              </a>
              {!compact && <p>A simple class to represent an x,y coordinate</p>}
            </li>
          </ul>
        </div>
      </div>
      <style jsx>{`
        .container {
          display: ${grid ? 'grid' : 'unset'};
          grid-gap: 2em;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
        }
        h6 {
          margin: 0;
          font-weight: bold;
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
