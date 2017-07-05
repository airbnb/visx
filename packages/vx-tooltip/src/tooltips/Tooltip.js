import React from 'react';

export default function Tooltip(props) {
  return (
    <div
      className="vx-tooltip-portal"
      style={{
        position: 'absolute',
        top: props.top,
        left: props.left,
        backgroundColor: 'white',
        color: '#666666',
        padding: '.3rem .5rem',
        borderRadius: '3px',
        fontSize: '14px',
        boxShadow: '0 1px 2px rgba(33,33,33,0.2)',
        lineHeight: '1em',
        pointerEvents: 'none',
        ...props.style
      }}
    >
      {props.children}
    </div>
  );
}
