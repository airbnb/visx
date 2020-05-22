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
            <li className={cx(emphasizePackage === 'annotation' && 'emphasize')}>
              <a href="/docs/annotation">@vx/annotation</a>
              {!compact && <p>Annotate elements of a chart</p>}
            </li>
            <li className={cx(cx(emphasizePackage === 'axis' && 'emphasize'))}>
              <a href="/docs/axis">@vx/axis</a>
              {!compact && <p>Annotate your coordinate system</p>}
            </li>
            <li className={cx(cx(emphasizePackage === 'curve' && 'emphasize'))}>
              <a href="/docs/curve">@vx/curve</a>
              {!compact && <p>d3 line interpolators for @vx/shape</p>}
            </li>
            <li className={cx(emphasizePackage === 'glyph' && 'emphasize')}>
              <a href="/static/docs/vx-glyph.html">@vx/glyph</a>
              {!compact && <p>Complex marks & symbols</p>}
            </li>
            <li className={cx(emphasizePackage === 'grid' && 'emphasize')}>
              <a href="/static/docs/vx-grid.html">@vx/grid</a>
              {!compact && <p>Grid lines for a chart</p>}
            </li>
            <li className={cx(emphasizePackage === 'legend' && 'emphasize')}>
              <a href="/static/docs/vx-legend.html">@vx/legend</a>
              {!compact && <p>Keys for reading your visual encodings</p>}
            </li>
            <li className={cx(emphasizePackage === 'marker' && 'emphasize')}>
              <a href="/static/docs/vx-marker.html">@vx/marker</a>
              {!compact && <p>Annotation lines with text</p>}
            </li>
            <li className={cx(emphasizePackage === 'scale' && 'emphasize')}>
              <a href="/static/docs/vx-scale.html">@vx/scale</a>
              {!compact && <p>d3 scales to map data to visual attributes</p>}
            </li>
            <li className={cx(emphasizePackage === 'shape' && 'emphasize')}>
              <a href="/static/docs/vx-shape.html">@vx/shape</a>
              {!compact && <p>Fundamental visualization shape primatives</p>}
            </li>
            <li className={cx(emphasizePackage === 'threshold' && 'emphasize')}>
              <a href="/static/docs/vx-threshold.html">@vx/threshold</a>
              {!compact && <p>Fundamental visualization shape primatives</p>}
            </li>
            <li className={cx(emphasizePackage === 'tooltip' && 'emphasize')}>
              <a href="/static/docs/vx-tooltip.html">@vx/tooltip</a>
              {!compact && <p>Show details on demand</p>}
            </li>
          </ul>
        </div>
        <div>
          <HeaderElement>Layouts & specialized</HeaderElement>
          <ul>
            <li className={cx(emphasizePackage === 'chord' && 'emphasize')}>
              <a href="/docs/chord">@vx/chord</a>
              {!compact && <p>Radial layout for matrix relationships</p>}
            </li>
            <li className={cx(emphasizePackage === 'geo' && 'emphasize')}>
              <a href="/static/docs/vx-geo.html">@vx/geo</a>
              {!compact && <p>Geographic projections</p>}
            </li>
            <li className={cx(emphasizePackage === 'heatmap' && 'emphasize')}>
              <a href="/static/docs/vx-heatmap.html">@vx/heatmap</a>
              {!compact && <p>Represent data values using color</p>}
            </li>
            <li className={cx(emphasizePackage === 'hierarchy' && 'emphasize')}>
              <a href="/static/docs/vx-hierarchy.html">@vx/hierarchy</a>
              {!compact && <p>Multiple layouts for hierarchical or nested data</p>}
            </li>
            <li className={cx(emphasizePackage === 'network' && 'emphasize')}>
              <a href="/static/docs/vx-network.html">@vx/network</a>
              {!compact && <p>Visualize nodes and links between them</p>}
            </li>
            <li className={cx(emphasizePackage === 'stats' && 'emphasize')}>
              <a href="/static/docs/vx-stats.html">@vx/stats</a>
              {!compact && <p>Visualize distributions</p>}
            </li>
          </ul>
        </div>
        <div>
          <HeaderElement>Interactions</HeaderElement>
          <ul>
            <li className={cx(emphasizePackage === 'brush' && 'emphasize')}>
              <a href="/docs/brush">@vx/brush</a>
              {!compact && <p>Enable selection of a part of an interface</p>}
            </li>
            <li className={cx(emphasizePackage === 'drag' && 'emphasize')}>
              <a href="/static/docs/vx-drag.html">@vx/drag</a>
              {!compact && <p>Make elements of an inteface draggable</p>}
            </li>
            <li className={cx(emphasizePackage === 'voronoi' && 'emphasize')}>
              <a href="/static/docs/vx-voronoi.html">@vx/voronoi</a>
              {!compact && <p>Partition points in a chart to improve user interaction</p>}
            </li>
            <li className={cx(emphasizePackage === 'zoom' && 'emphasize')}>
              <a href="/static/docs/vx-zoom.html">@vx/zoom</a>
              {!compact && <p>Apply transforms to a viewport</p>}
            </li>
          </ul>
        </div>
        <div>
          <HeaderElement>SVG utilities</HeaderElement>
          <ul>
            <li className={cx(emphasizePackage === 'clip-path' && 'emphasize')}>
              <a href="/docs/clip-path">@vx/clip-path</a>
              {!compact && <p>Utilities for clip-path elements</p>}
            </li>
            <li className={cx(emphasizePackage === 'event' && 'emphasize')}>
              <a href="/static/docs/vx-event.html">@vx/event</a>
              {!compact && (
                <p>Utilities for computing svg coordinates from mouse or touch events</p>
              )}
            </li>
            <li className={cx(emphasizePackage === 'group' && 'emphasize')}>
              <a href="/static/docs/vx-group.html">@vx/group</a>
              {!compact && <p>Utility for g elements</p>}
            </li>
            <li className={cx(emphasizePackage === 'gradient' && 'emphasize')}>
              <a href="/static/docs/vx-gradient.html">@vx/gradient</a>
              {!compact && <p>Utilities for making making color gradient definitions</p>}
            </li>
            <li className={cx(emphasizePackage === 'pattern' && 'emphasize')}>
              <a href="/static/docs/vx-pattern.html">@vx/pattern</a>
              {!compact && <p>Utilities for making pattern definitions</p>}
            </li>
            <li className={cx(emphasizePackage === 'text' && 'emphasize')}>
              <a href="/static/docs/vx-text.html">@vx/text</a>
              {!compact && <p>Utilities for styling & wrapping svg text</p>}
            </li>
          </ul>
        </div>
        <div>
          <HeaderElement>Data utilities</HeaderElement>
          <ul>
            <li className={cx(emphasizePackage === 'bounds' && 'emphasize')}>
              <a href="/docs/bounds">@vx/bounds</a>
              {!compact && <p>Detect the bounding box of an element & its parent</p>}
            </li>
            <li className={cx(emphasizePackage === 'mock-data' && 'emphasize')}>
              <a href="/static/docs/vx-mock-data.html">@vx/mock-data</a>
              {!compact && <p>Lots of mock data sets to play with</p>}
            </li>
            <li className={cx(emphasizePackage === 'responsive' && 'emphasize')}>
              <a href="/static/docs/vx-responsive.html">@vx/responsive</a>
              {!compact && <p>Utilities to make responsive visualizations easily</p>}
            </li>
            <li className={cx(emphasizePackage === 'point' && 'emphasize')}>
              <a href="/static/docs/vx-point.html">@vx/point</a>
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
          margin: 0.25em 0 0;
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
          padding: ${compact ? '0.1em' : '0.5em'};
          margin-bottom: ${compact ? 0 : '1em'};
          width: 100%;
          overflow: ellipsis;
        }
        li p {
          margin: 0;
          font-size: 11px;
          line-height: 1.5em;
        }
        .emphasize {
          font-weight: bold;
        }
        .emphasize::before {
          content: '';
          padding-left: 4px;
          border-left: 2px solid #fc2e1c;
        }
      `}</style>
    </>
  );
}
