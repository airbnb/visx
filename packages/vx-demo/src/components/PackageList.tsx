import React from 'react';
import Link from 'next/link';
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
              <Link href="/docs/annotation">
                <a>@vx/annotation</a>
              </Link>
              {!compact && <p>Annotate elements of a chart</p>}
            </li>
            <li className={cx(cx(emphasizePackage === 'axis' && 'emphasize'))}>
              <Link href="/docs/axis">
                <a>@vx/axis</a>
              </Link>
              {!compact && <p>Annotate your coordinate system</p>}
            </li>
            <li className={cx(cx(emphasizePackage === 'curve' && 'emphasize'))}>
              <Link href="/docs/curve">
                <a>@vx/curve</a>
              </Link>
              {!compact && <p>d3 line interpolators for @vx/shape</p>}
            </li>
            <li className={cx(emphasizePackage === 'glyph' && 'emphasize')}>
              <Link href="/docs/glyph">
                <a>@vx/glyph</a>
              </Link>
              {!compact && <p>Complex marks & symbols to be used in visuals</p>}
            </li>
            <li className={cx(emphasizePackage === 'grid' && 'emphasize')}>
              <Link href="/docs/grid">
                <a>@vx/grid</a>
              </Link>
              {!compact && <p>Grid lines for a chart</p>}
            </li>
            <li className={cx(emphasizePackage === 'legend' && 'emphasize')}>
              <Link href="/docs/legend">
                <a>@vx/legend</a>
              </Link>
              {!compact && <p>Make your visual encodings readable</p>}
            </li>
            <li className={cx(emphasizePackage === 'marker' && 'emphasize')}>
              <Link href="/docs/marker">
                <a>@vx/marker</a>
              </Link>
              {!compact && <p>Annotation lines with text</p>}
            </li>
            <li className={cx(emphasizePackage === 'scale' && 'emphasize')}>
              <Link href="/docs/scale">
                <a>@vx/scale</a>
              </Link>
              {!compact && <p>Map data to visual dimensions</p>}
            </li>
            <li className={cx(emphasizePackage === 'shape' && 'emphasize')}>
              <Link href="/docs/shape">
                <a>@vx/shape</a>
              </Link>
              {!compact && <p>Fundamental visualization shape primatives, the core of vx</p>}
            </li>
            <li className={cx(emphasizePackage === 'tooltip' && 'emphasize')}>
              <Link href="/docs/tooltip">
                <a>@vx/tooltip</a>
              </Link>
              {!compact && <p>Show details on demand</p>}
            </li>
          </ul>
        </div>
        <div>
          <HeaderElement>Layouts & specialized</HeaderElement>
          <ul>
            <li className={cx(emphasizePackage === 'chord' && 'emphasize')}>
              <Link href="/docs/chord">
                <a>@vx/chord</a>
              </Link>
              {!compact && <p>Radial layout for matrix relationships</p>}
            </li>
            <li className={cx(emphasizePackage === 'geo' && 'emphasize')}>
              <Link href="/docs/geo">
                <a>@vx/geo</a>
              </Link>
              {!compact && <p>Geographic projections</p>}
            </li>
            <li className={cx(emphasizePackage === 'heatmap' && 'emphasize')}>
              <Link href="/docs/heatmap">
                <a>@vx/heatmap</a>
              </Link>
              {!compact && <p>Represent data values using color</p>}
            </li>
            <li className={cx(emphasizePackage === 'hierarchy' && 'emphasize')}>
              <Link href="/docs/hierarchy">
                <a>@vx/hierarchy</a>
              </Link>
              {!compact && <p>Components to visualize hierarchical or nested data</p>}
            </li>
            <li className={cx(emphasizePackage === 'network' && 'emphasize')}>
              <Link href="/docs/network">
                <a>@vx/network</a>
              </Link>
              {!compact && <p>Visualize nodes and links between them</p>}
            </li>
            <li className={cx(emphasizePackage === 'stats' && 'emphasize')}>
              <Link href="/docs/stats">
                <a>@vx/stats</a>
              </Link>
              {!compact && <p>Common ways to visualize distributions</p>}
            </li>
            <li className={cx(emphasizePackage === 'threshold' && 'emphasize')}>
              <Link href="/docs/threshold">
                <a>@vx/threshold</a>
              </Link>
              {!compact && <p>Difference charts to compare the delta between two time series</p>}
            </li>
          </ul>
        </div>
        <div>
          <HeaderElement>Interactions</HeaderElement>
          <ul>
            <li className={cx(emphasizePackage === 'brush' && 'emphasize')}>
              <Link href="/docs/brush">
                <a>@vx/brush</a>
              </Link>
              {!compact && <p>Enable selection of a part of an interface</p>}
            </li>
            <li className={cx(emphasizePackage === 'drag' && 'emphasize')}>
              <Link href="/docs/drag">
                <a>@vx/drag</a>
              </Link>
              {!compact && <p>Make elements of an interface draggable</p>}
            </li>
            <li className={cx(emphasizePackage === 'voronoi' && 'emphasize')}>
              <Link href="/docs/voronoi">
                <a>@vx/voronoi</a>
              </Link>
              {!compact && <p>Partition points in a chart to improve user interaction</p>}
            </li>
            <li className={cx(emphasizePackage === 'zoom' && 'emphasize')}>
              <Link href="/docs/zoom">
                <a>@vx/zoom</a>
              </Link>
              {!compact && <p>Apply transforms to a viewport</p>}
            </li>
          </ul>
        </div>
        <div>
          <HeaderElement>SVG utilities</HeaderElement>
          <ul>
            <li className={cx(emphasizePackage === 'clip-path' && 'emphasize')}>
              <Link href="/docs/clip-path">
                <a>@vx/clip-path</a>
              </Link>
              {!compact && <p>Utilities for clip-path elements</p>}
            </li>
            <li className={cx(emphasizePackage === 'event' && 'emphasize')}>
              <Link href="/docs/event">
                <a>@vx/event</a>
              </Link>
              {!compact && (
                <p>Utilities for computing svg coordinates from mouse or touch events</p>
              )}
            </li>
            <li className={cx(emphasizePackage === 'group' && 'emphasize')}>
              <Link href="/docs/group">
                <a>@vx/group</a>
              </Link>
              {!compact && <p>Simplified API for &lt;g /&gt; elements</p>}
            </li>
            <li className={cx(emphasizePackage === 'gradient' && 'emphasize')}>
              <Link href="/docs/gradient">
                <a>@vx/gradient</a>
              </Link>
              {!compact && <p>Utilities for making making color gradient definitions</p>}
            </li>
            <li className={cx(emphasizePackage === 'pattern' && 'emphasize')}>
              <Link href="/docs/pattern">
                <a>@vx/pattern</a>
              </Link>
              {!compact && <p>Utilities for creating pattern definitions</p>}
            </li>
            <li className={cx(emphasizePackage === 'text' && 'emphasize')}>
              <Link href="/docs/text">
                <a>@vx/text</a>
              </Link>
              {!compact && <p>An improved SVG Text component</p>}
            </li>
          </ul>
        </div>
        <div>
          <HeaderElement>Data utilities</HeaderElement>
          <ul>
            <li className={cx(emphasizePackage === 'bounds' && 'emphasize')}>
              <Link href="/docs/bounds">
                <a>@vx/bounds</a>
              </Link>
              {!compact && <p>Detect the bounding box of an element & its parent</p>}
            </li>
            <li className={cx(emphasizePackage === 'mock-data' && 'emphasize')}>
              <Link href="/docs/mock-data">
                <a>@vx/mock-data</a>
              </Link>
              {!compact && <p>Lots of mock data sets to play with</p>}
            </li>
            <li className={cx(emphasizePackage === 'responsive' && 'emphasize')}>
              <Link href="/docs/responsive">
                <a>@vx/responsive</a>
              </Link>
              {!compact && <p>Utilities to make responsive visualizations easy</p>}
            </li>
            <li className={cx(emphasizePackage === 'point' && 'emphasize')}>
              <Link href="/docs/point">
                <a>@vx/point</a>
              </Link>
              {!compact && <p>A simple class to represent an x,y coordinate</p>}
            </li>
          </ul>
        </div>
        {compact && (
          <div>
            <HeaderElement>Umbrella package</HeaderElement>
            <ul>
              <li className={cx(emphasizePackage === 'vx' && 'emphasize')}>
                <Link href="/docs/vx">
                  <a>@vx/vx</a>
                </Link>
              </li>
            </ul>
          </div>
        )}
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
