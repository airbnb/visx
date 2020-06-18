import React, { useState, useCallback } from 'react';
import useMeasure from 'react-use-measure';
import { Tooltip, TooltipWithBounds, useTooltip, defaultStyles, Portal } from '@vx/tooltip/src';

export type TooltipProps = {
  width: number;
  height: number;
  showControls?: boolean;
};

interface TooltipData {
  text: string;
  containerX: number;
  containerY: number;
  pageX: number;
  pageY: number;
}

const positionIndicatorSize = 8;

const tooltipStyles = {
  ...defaultStyles,
  backgroundColor: 'rgba(53,71,125,0.8)',
  color: 'white',
  width: 152,
  height: 72,
  padding: 12,
};

export default function Example({ width, height, showControls = true }: TooltipProps) {
  // bounds of the container are needed to convert page coordinates to container coordinates
  const [ref, ownBounds] = useMeasure({ scroll: true });
  const [detectBounds, setDetectBounds] = useState(true);
  const [renderInPortal, setRenderInPortal] = useState(false);

  const {
    showTooltip,
    hideTooltip,
    tooltipOpen,
    tooltipData,
    tooltipLeft,
    tooltipTop,
  } = useTooltip<TooltipData>({
    // initial tooltip state
    tooltipOpen: true,
    tooltipLeft: width / 3,
    tooltipTop: height / 3,
    tooltipData: {
      text: 'Move me with your mouse or finger',
      containerX: width / 3,
      containerY: height / 3,
      pageX: 0,
      pageY: 0,
    },
  });

  // event handlers
  const handleMouseMove = useCallback(
    (event: React.MouseEvent | React.TouchEvent) => {
      const pageX = 'pageX' in event ? event.pageX : 0;
      const pageY = 'pageY' in event ? event.pageY : 0;
      const containerX = ('clientX' in event ? event.clientX : 0) - ownBounds.left;
      const containerY = ('clientY' in event ? event.clientY : 0) - ownBounds.top;

      showTooltip({
        tooltipLeft: renderInPortal ? pageX : containerX,
        tooltipTop: renderInPortal ? pageY : containerY,
        tooltipData: {
          containerX,
          containerY,
          pageX,
          pageY,
          text: detectBounds
            ? 'I detect my container boundary'
            : 'I will get clipped by my container',
        },
      });
    },
    [showTooltip, ownBounds, detectBounds, renderInPortal],
  );

  const TooltipComponent = detectBounds ? TooltipWithBounds : Tooltip;
  const TooltipWrapper = renderInPortal ? Portal : React.Fragment;

  return (
    <>
      <div
        ref={ref}
        className="tooltip-example"
        style={{ width, height }}
        onMouseMove={handleMouseMove}
        onTouchMove={handleMouseMove}
      >
        {tooltipOpen ? (
          <>
            <div
              className="position-indicator"
              style={{
                width: positionIndicatorSize,
                height: positionIndicatorSize,
                transform: `translate(${tooltipData.containerX -
                  positionIndicatorSize / 2}px, ${tooltipData.containerY -
                  positionIndicatorSize / 2}px)`,
              }}
            />
            <div
              className="crosshair horizontal"
              style={{ transform: `translateY(${tooltipData.containerY}px)` }}
            />
            <div
              className="crosshair vertical"
              style={{ transform: `translateX(${tooltipData.containerX}px)` }}
            />
            <TooltipWrapper>
              <TooltipComponent
                key={Math.random()} // needed for bounds to update correctly
                left={tooltipLeft + (detectBounds ? 0 : 10)}
                top={tooltipTop + (detectBounds ? 0 : 10)}
                style={tooltipStyles}
              >
                {tooltipData.text}
                <br />
                <br />
                <strong>left</strong> {tooltipLeft?.toFixed(0)}px
                <br />
                <strong>top</strong> {tooltipTop?.toFixed(0)}px
              </TooltipComponent>
            </TooltipWrapper>
          </>
        ) : (
          <div className="no-tooltip">Move or touch the canvas to see the tooltip</div>
        )}
        <div className="z-index-bummer">
          I have an annoying z-index. Try&nbsp;
          <label>
            <input
              type="checkbox"
              checked={renderInPortal}
              onClick={e => {
                // if rendered in clickable container, don't trigger that event
                e.stopPropagation();
                const nextRenderInPortal = !renderInPortal;
                setRenderInPortal(nextRenderInPortal);
                if (tooltipOpen && tooltipData) {
                  // update the tooltip coordinates to account for the Portal change
                  showTooltip({
                    tooltipData,
                    tooltipLeft:
                      tooltipData[nextRenderInPortal ? 'pageX' : 'containerX'] || tooltipLeft,
                    tooltipTop:
                      tooltipData[nextRenderInPortal ? 'pageY' : 'containerY'] || tooltipTop,
                  });
                }
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
              checked={detectBounds}
              onChange={() => setDetectBounds(!detectBounds)}
            />
            &nbsp;Tooltip with boundary detection
          </label>

          <button onClick={() => hideTooltip()}>Hide tooltip</button>
        </div>
      )}
      <style jsx>{`
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
        .vx-tooltip {
          background-color: #f67280;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-around;
          width: 200px;
          height: 100px;
        }
        .tooltip-controls label {
          font-size: 14px;
          margin-right: 8px;
        }
        .position-indicator {
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
      `}</style>
    </>
  );
}
