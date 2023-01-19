import React, { useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import {
  Tooltip,
  TooltipWithBounds,
  useTooltip,
  useTooltipInPortal,
  defaultStyles,
} from '@visx/tooltip';

export type TooltipProps = {
  width: number;
  height: number;
  showControls?: boolean;
};

type TooltipData = string;

const positionIndicatorSize = 8;

const tooltipStyles = {
  ...defaultStyles,
  backgroundColor: 'rgba(53,71,125,0.8)',
  color: 'white',
  width: 152,
  height: 72,
  padding: 12,
};

type OverlayLayerProps = {
  container: HTMLDivElement | null;
  text: string;
  className?: string;
  placeAfterTooltipInDom?: boolean;
};

function OverlayLayer({ className, container, placeAfterTooltipInDom, text }: OverlayLayerProps) {
  if (container) {
    // Since we re-render the tooltip every time the pointer moves and its DOM node
    // is placed at the end of the container, if placeAfterTooltipInDom is true we
    // also want to re-render the overlay layer
    const key = placeAfterTooltipInDom ? Math.random() : 'overlay-under';
    return ReactDOM.createPortal(
      <div className={className} key={key}>
        {text}
      </div>,
      container,
    );
  }
  return null;
}

export default function Example({ width, height, showControls = true }: TooltipProps) {
  const [tooltipShouldDetectBounds, setTooltipShouldDetectBounds] = useState(true);
  const [tooltipShouldUseCustomContainer, setTooltipShouldUseCustomContainer] = useState(true);
  const [renderTooltipInPortal, setRenderTooltipInPortal] = useState(false);
  const overlayRootRef = React.useRef<HTMLDivElement | null>(null);

  const { containerRef, containerBounds, TooltipInPortal } = useTooltipInPortal({
    scroll: true,
    detectBounds: tooltipShouldDetectBounds,
    portalContainer: tooltipShouldUseCustomContainer
      ? overlayRootRef.current ?? undefined
      : undefined,
  });

  const {
    showTooltip,
    hideTooltip,
    tooltipOpen,
    tooltipData,
    tooltipLeft = 0,
    tooltipTop = 0,
  } = useTooltip<TooltipData>({
    // initial tooltip state
    tooltipOpen: true,
    tooltipLeft: width / 3,
    tooltipTop: height / 3,
    tooltipData: 'Move me with your mouse or finger',
  });

  // event handlers
  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      // coordinates should be relative to the container in which Tooltip is rendered
      const containerX = ('clientX' in event ? event.clientX : 0) - containerBounds.left;
      const containerY = ('clientY' in event ? event.clientY : 0) - containerBounds.top;
      showTooltip({
        tooltipLeft: containerX,
        tooltipTop: containerY,
        tooltipData: tooltipShouldDetectBounds
          ? 'I detect my container boundary'
          : 'I will get clipped by my container',
      });
    },
    [showTooltip, tooltipShouldDetectBounds, containerBounds],
  );

  const TooltipComponent = renderTooltipInPortal
    ? TooltipInPortal
    : tooltipShouldDetectBounds
    ? TooltipWithBounds
    : Tooltip;

  return (
    <>
      <div
        ref={containerRef}
        className="tooltip-example"
        style={{ width, height }}
        onPointerMove={handlePointerMove}
      >
        <div className="overlay-root" ref={overlayRootRef} />
        <OverlayLayer
          className="overlay-layer overlay-under-tooltip"
          container={overlayRootRef.current}
          text="We want this to appear under the tooltip."
        />
        {tooltipOpen ? (
          <>
            <div
              className="position-indicator"
              style={{
                transform: `translate(${tooltipLeft - positionIndicatorSize / 2}px, ${
                  tooltipTop - positionIndicatorSize / 2
                }px)`,
              }}
            />
            <div
              className="crosshair horizontal"
              style={{ transform: `translateY(${tooltipTop}px)` }}
            />
            <div
              className="crosshair vertical"
              style={{ transform: `translateX(${tooltipLeft}px)` }}
            />
            <TooltipComponent
              key={Math.random()} // needed for bounds to update correctly
              left={tooltipLeft}
              top={tooltipTop}
              style={tooltipStyles}
            >
              {tooltipData}
              <br />
              <br />
              <strong>left</strong> {tooltipLeft?.toFixed(0)}px&nbsp;&nbsp;
              <strong>top</strong> {tooltipTop?.toFixed(0)}px
            </TooltipComponent>
          </>
        ) : (
          <div className="no-tooltip">Move or touch the canvas to see the tooltip</div>
        )}
        <OverlayLayer
          className="overlay-layer overlay-over-tooltip"
          container={overlayRootRef.current}
          placeAfterTooltipInDom // Force DOM node to be placed after tooltip for demo purposes
          text="We want this to appear over the tooltip."
        />
        <div className="z-index-bummer">
          I have an annoying z-index. Try&nbsp;
          <label>
            <input
              type="checkbox"
              defaultChecked={renderTooltipInPortal}
              onClick={(e) => {
                // if rendered in clickable container, don't trigger that event
                e.stopPropagation();
                setRenderTooltipInPortal(!renderTooltipInPortal);
              }}
            />
            &nbsp;rendering in Portal
          </label>
          &nbsp;
          <span role="img" aria-label="yay">
            🥳
          </span>
        </div>
      </div>
      {showControls && (
        <div className="tooltip-controls">
          <label>
            <input
              type="checkbox"
              checked={tooltipShouldDetectBounds}
              onChange={() => setTooltipShouldDetectBounds(!tooltipShouldDetectBounds)}
            />
            &nbsp;Tooltip with boundary detection
          </label>

          {renderTooltipInPortal && (
            <label>
              <input
                type="checkbox"
                checked={tooltipShouldUseCustomContainer}
                onChange={() =>
                  setTooltipShouldUseCustomContainer(!tooltipShouldUseCustomContainer)
                }
              />
              &nbsp;Tooltip portal in custom container
            </label>
          )}

          <button onClick={() => hideTooltip()}>Hide tooltip</button>
        </div>
      )}
      <style>{`
        .tooltip-example {
          z-index: 0;
          position: relative;
          overflow: hidden;
          border-radius: 16px;
          background: linear-gradient(45deg, #6c5b7b, #c06c84, #f67280);
          font-size: 14px;
          color: white;
          width: 100%;
          height: 100%;
        }
        .tooltip-controls label {
          font-size: 14px;
          margin-right: 8px;
        }
        .position-indicator {
          width: ${positionIndicatorSize}px;
          height: ${positionIndicatorSize}px;
          border-radius: 50%;
          background: #35477d;
          position: absolute;
        }
        .crosshair {
          position: absolute;
          top: 0;
          left: 0;
        }
        .crosshair.horizontal {
          width: 100%;
          height: 1px;
          border-top: 1px dashed #35477d;
        }
        .crosshair.vertical {
          height: 100%;
          width: 1px;
          border-left: 1px dashed #35477d;
        }
        .no-tooltip {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
        .z-index-bummer {
          position: absolute;
          right: 12%;
          bottom: 20%;
          max-width: 190px;
          z-index: 2000;
          background: rgba(255, 255, 255, 0.8);
          color: #35477d;
          border-radius: 8px;
          padding: 16px;
          line-height: 1.2em;
        }
        .overlay-root {
          z-index: 3000;
          position: relative;
        }
        .overlay-layer {
          position: absolute;
          border-radius: 8px;
          padding: 8px;
        }
        .overlay-under-tooltip {
          top: 30px;
          right: 10px;
          background: rgba(52, 235, 180, 0.8);
        }
        .overlay-over-tooltip {
          top: 70px;
          right: 30px;
          background: rgba(250, 235, 180, 0.8);
        }
      `}</style>
    </>
  );
}
