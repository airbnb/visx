import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ParentSize } from '@visx/responsive';
import type { WidthAndHeight } from '../types';

type Props<ExampleProps extends WidthAndHeight> = {
  description?: string;
  detailsHeight?: number;
  detailsStyles?: React.CSSProperties;
  exampleRenderer: React.ComponentClass<ExampleProps> | React.FunctionComponent<ExampleProps>;
  exampleProps?: Omit<ExampleProps, 'width' | 'height'> &
    Partial<Pick<ExampleProps, 'width' | 'height'>>;
  exampleUrl?: string;
  tileStyles?: React.CSSProperties;
  title?: string;
};

const renderLinkWrapper = (url: string | undefined, node: React.ReactNode) =>
  url ? (
    <Link href={url} style={{ display: 'block', flex: 1, minWidth: 0, height: '100%' }}>
      {node}
    </Link>
  ) : (
    node
  );

/**
 * hook which returns if the ref was ever visible.
 * used for better perf/not rendering all tiles on load.
 */
function useEverVisible() {
  const ref = useRef<HTMLDivElement>(null);
  const [everVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible((visible) => visible || entry.isIntersecting);
        });
      },
      {
        root: null, // viewport is the root
        threshold: 0.01,
      },
    );

    let curr: HTMLDivElement;
    if (ref.current) {
      curr = ref.current;
      observer.observe(ref.current);
    }

    return () => {
      if (curr) {
        observer.unobserve(curr);
        observer.disconnect();
      }
    };
  }, []);

  return { everVisible, ref };
}

export default function GalleryTile<ExampleProps extends WidthAndHeight>({
  description,
  detailsHeight = 76,
  detailsStyles,
  exampleProps,
  exampleRenderer,
  exampleUrl,
  tileStyles,
  title,
}: Props<ExampleProps>) {
  const { everVisible, ref } = useEverVisible();
  return (
    <>
      {renderLinkWrapper(
        exampleUrl,
        <div ref={ref} className="gallery-tile" style={tileStyles}>
          <div className="image">
            {/** lazy render */}
            {everVisible && (
              <ParentSize>
                {({ width, height }) =>
                  React.createElement(exampleRenderer, {
                    width,
                    height: height + (title || description ? detailsHeight : 0),
                    ...exampleProps,
                  } as ExampleProps)
                }
              </ParentSize>
            )}
          </div>
          {(title || description) && (
            <div className="details" style={detailsStyles}>
              {title && <div className="title">{title}</div>}
              {description && (
                <div className="description">
                  <pre>{description}</pre>
                </div>
              )}
            </div>
          )}
        </div>,
      )}
      <style jsx>{`
        h3 {
          margin-top: 0;
          margin-left: 40px;
          margin-bottom: 0;
        }
        .gallery-tile {
          background-color: white;
          margin: 5px;
          display: flex;
          height: 390px;
          flex: 1;
          min-width: 300px;
          flex-direction: column;
          border-radius: 14px;
          cursor: pointer;
          text-decoration: none;
          color: inherit;
        }
        .image {
          flex: 1;
          display: flex;
          overflow: hidden;
        }
        .details {
          text-align: center;
          padding: 15px 20px;
          color: #ffffff;
        }
        .title {
          font-weight: 900;
          line-height: 0.9rem;
        }
        .description {
          font-weight: 300;
          font-size: 14px;
        }
        pre {
          margin: 0;
          background-color: transparent;
          min-width: unset;
        }
        @media (max-width: 960px) {
          .gallery-tile {
            min-width: 45%;
          }
        }
        @media (max-width: 600px) {
          .gallery-tile {
            min-width: 100%;
          }
        }
      `}</style>
    </>
  );
}
