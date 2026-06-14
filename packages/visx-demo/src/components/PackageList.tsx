import React from 'react';
import Link from 'next/link';
import cx from 'classnames';
import type { VisxPackage } from '../types';

export default function PackageList({
  emphasizePackage,
  compact,
  grid,
}: {
  emphasizePackage?: VisxPackage;
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
              <Link href="/docs/annotation">annotation</Link>
              {!compact && <p>Annotate elements of a chart</p>}
            </li>
            <li className={cx(cx(emphasizePackage === 'axis' && 'emphasize'))}>
              <Link href="/docs/axis">axis</Link>
              {!compact && <p>Annotate your coordinate system</p>}
            </li>
            <li className={cx(cx(emphasizePackage === 'curve' && 'emphasize'))}>
              <Link href="/docs/curve">curve</Link>
              {!compact && <p>d3 line interpolators for @visx/shape</p>}
            </li>
            <li className={cx(emphasizePackage === 'glyph' && 'emphasize')}>
              <Link href="/docs/glyph">glyph</Link>
              {!compact && <p>Complex marks & symbols to be used in visuals</p>}
            </li>
            <li className={cx(emphasizePackage === 'grid' && 'emphasize')}>
              <Link href="/docs/grid">grid</Link>
              {!compact && <p>Grid lines for a chart</p>}
            </li>
            <li className={cx(emphasizePackage === 'legend' && 'emphasize')}>
              <Link href="/docs/legend">legend</Link>
              {!compact && <p>Make your visual encodings readable</p>}
            </li>
            <li className={cx(emphasizePackage === 'marker' && 'emphasize')}>
              <Link href="/docs/marker">marker</Link>
              {!compact && <p>Annotation lines with text</p>}
            </li>
            <li className={cx(emphasizePackage === 'scale' && 'emphasize')}>
              <Link href="/docs/scale">scale</Link>
              {!compact && <p>Map data to visual dimensions</p>}
            </li>
            <li className={cx(emphasizePackage === 'shape' && 'emphasize')}>
              <Link href="/docs/shape">shape</Link>
              {!compact && <p>Fundamental visualization shape primatives, the core of visx</p>}
            </li>
            <li className={cx(emphasizePackage === 'tooltip' && 'emphasize')}>
              <Link href="/docs/tooltip">tooltip</Link>
              {!compact && <p>Show details on demand</p>}
            </li>
          </ul>
        </div>
        <div>
          <HeaderElement>Layouts & specialized</HeaderElement>
          <ul>
            <li className={cx(emphasizePackage === 'chord' && 'emphasize')}>
              <Link href="/docs/chord">chord</Link>
              {!compact && <p>Radial layout for matrix relationships</p>}
            </li>
            <li className={cx(emphasizePackage === 'geo' && 'emphasize')}>
              <Link href="/docs/geo">geo</Link>
              {!compact && <p>Geographic projections</p>}
            </li>
            <li className={cx(emphasizePackage === 'heatmap' && 'emphasize')}>
              <Link href="/docs/heatmap">heatmap</Link>
              {!compact && <p>Represent data values using color</p>}
            </li>
            <li className={cx(emphasizePackage === 'hierarchy' && 'emphasize')}>
              <Link href="/docs/hierarchy">hierarchy</Link>
              {!compact && <p>Components to visualize hierarchical or nested data</p>}
            </li>
            <li className={cx(emphasizePackage === 'network' && 'emphasize')}>
              <Link href="/docs/network">network</Link>
              {!compact && <p>Visualize nodes and links between them</p>}
            </li>
            <li className={cx(emphasizePackage === 'react-spring' && 'emphasize')}>
              <Link href="/docs/react-spring">react-spring</Link>
              {!compact && <p>Animated visx primitives</p>}
            </li>
            <li className={cx(emphasizePackage === 'sankey' && 'emphasize')}>
              <Link href="/docs/sankey">sankey</Link>
              {!compact && <p>Components to visualize sankey charts</p>}
            </li>
            <li className={cx(emphasizePackage === 'stats' && 'emphasize')}>
              <Link href="/docs/stats">stats</Link>
              {!compact && <p>Common ways to visualize distributions</p>}
            </li>
            <li className={cx(emphasizePackage === 'threshold' && 'emphasize')}>
              <Link href="/docs/threshold">threshold</Link>
              {!compact && <p>Difference charts to compare the delta between two time series</p>}
            </li>
            <li className={cx(emphasizePackage === 'wordcloud' && 'emphasize')}>
              <Link href="/docs/wordcloud">wordcloud</Link>
              {!compact && <p>Visualize word frequency</p>}
            </li>
            <li className={cx(emphasizePackage === 'xychart' && 'emphasize')}>
              <Link href="/docs/xychart">xychart</Link>
              {!compact && (
                <p>
                  A chart-level API built on & integrated with several other visx building blocks
                </p>
              )}
            </li>
          </ul>
        </div>
        <div>
          <HeaderElement>Interactions</HeaderElement>
          <ul>
            <li className={cx(emphasizePackage === 'brush' && 'emphasize')}>
              <Link href="/docs/brush">brush</Link>
              {!compact && <p>Enable selection of a part of an interface</p>}
            </li>
            <li className={cx(emphasizePackage === 'delaunay' && 'emphasize')}>
              <Link href="/docs/delaunay">delaunay</Link>
              {!compact && <p>Partition points in a chart to improve user interaction</p>}
            </li>
            <li className={cx(emphasizePackage === 'drag' && 'emphasize')}>
              <Link href="/docs/drag">drag</Link>
              {!compact && <p>Make elements of an interface draggable</p>}
            </li>
            <li className={cx(emphasizePackage === 'voronoi' && 'emphasize')}>
              <Link href="/docs/voronoi">voronoi</Link>
              {!compact && <p>Partition points in a chart to improve user interaction</p>}
            </li>
            <li className={cx(emphasizePackage === 'zoom' && 'emphasize')}>
              <Link href="/docs/zoom">zoom</Link>
              {!compact && <p>Apply transforms to a viewport</p>}
            </li>
          </ul>
        </div>
        <div>
          <HeaderElement>SVG utilities</HeaderElement>
          <ul>
            <li className={cx(emphasizePackage === 'clip-path' && 'emphasize')}>
              <Link href="/docs/clip-path">clip-path</Link>
              {!compact && <p>Utilities for clip-path elements</p>}
            </li>
            <li className={cx(emphasizePackage === 'event' && 'emphasize')}>
              <Link href="/docs/event">event</Link>
              {!compact && (
                <p>Utilities for computing svg coordinates from mouse or touch events</p>
              )}
            </li>
            <li className={cx(emphasizePackage === 'group' && 'emphasize')}>
              <Link href="/docs/group">group</Link>
              {!compact && <p>Simplified API for &lt;g /&gt; elements</p>}
            </li>
            <li className={cx(emphasizePackage === 'gradient' && 'emphasize')}>
              <Link href="/docs/gradient">gradient</Link>
              {!compact && <p>Utilities for making making color gradient definitions</p>}
            </li>
            <li className={cx(emphasizePackage === 'pattern' && 'emphasize')}>
              <Link href="/docs/pattern">pattern</Link>
              {!compact && <p>Utilities for creating pattern definitions</p>}
            </li>
            <li className={cx(emphasizePackage === 'text' && 'emphasize')}>
              <Link href="/docs/text">text</Link>
              {!compact && <p>An improved SVG Text component</p>}
            </li>
          </ul>
        </div>
        <div>
          <HeaderElement>Data utilities</HeaderElement>
          <ul>
            <li className={cx(emphasizePackage === 'bounds' && 'emphasize')}>
              <Link href="/docs/bounds">bounds</Link>
              {!compact && <p>Detect the bounding box of an element & its parent</p>}
            </li>
            <li className={cx(emphasizePackage === 'mock-data' && 'emphasize')}>
              <Link href="/docs/mock-data">mock-data</Link>
              {!compact && <p>Lots of mock data sets to play with</p>}
            </li>
            <li className={cx(emphasizePackage === 'responsive' && 'emphasize')}>
              <Link href="/docs/responsive">responsive</Link>
              {!compact && <p>Utilities to make responsive visualizations easy</p>}
            </li>
            <li className={cx(emphasizePackage === 'point' && 'emphasize')}>
              <Link href="/docs/point">point</Link>
              {!compact && <p>A simple class to represent an x,y coordinate</p>}
            </li>
          </ul>
        </div>
        {compact && (
          <div>
            <HeaderElement>Umbrella package</HeaderElement>
            <ul>
              <li className={cx(emphasizePackage === 'visx' && 'emphasize')}>
                <Link href="/docs/visx">visx</Link>
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
          margin: 1em 0 0;
          line-height: 1.5em;
        }
        ul {
          padding: 0;
          margin-top: 0;
          margin-bottom: 0;
        }
        li {
          font-size: ${compact ? '16px' : undefined};
          line-height: 1.5em;
          background-color: ${compact ? undefined : '#f8f8f8'};
          margin-bottom: ${compact ? 0 : '1em'};
          width: 100%;
          overflow: ellipsis;
        }
        li p {
          margin: 0;
          font-size: 11px;
          line-height: 1.5em;
        }
        li a {
          padding: 2px;
        }
        .emphasize a {
          background-color: #fc2e1c;
          color: white;
        }
      `}</style>
    </>
  );
}
