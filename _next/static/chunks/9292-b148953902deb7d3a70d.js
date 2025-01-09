"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[9292],{16723:function(e,t,n){n.d(t,{z:function(){return ee},Oq:function(){return te},ZP:function(){return se}});var r=n(77460),i=n(2784),a=n(82790),o=n(42613),u=n(12722),s=n(13980),l=n.n(s),d=n(89549),h=n(83418);function c(e,t){if("invert"in e&&"undefined"!==typeof e.invert)return e.invert(t).valueOf();var n=e.range(),r=n[0],i=n[1],a=0,o=("step"in e&&"undefined"!==typeof e.step?e.step():1)*(i-r)/Math.abs(i-r);if(o>0)for(;t>r+o*(a+1);)a+=1;else for(;t<r+o*(a+1);)a+=1;return a}function f(e,t,n,r){var i,a=c(e,t+(t<n?-r:r)),o=c(e,n+(n<t?-r:r)),u=Math.min(a,o),s=Math.max(a,o);if("invert"in e&&"undefined"!==typeof e.invert)i={start:u,end:s};else{for(var l=[],d=e.domain(),h=u;h<=s;h+=1)l.push(d[h]);i={values:l}}return i}function g(e){if("undefined"!==typeof window&&window.TouchEvent&&e instanceof TouchEvent)return{pageX:e.touches[0].pageX,pageY:e.touches[0].pageY};var t=e;return{pageX:t.pageX,pageY:t.pageY}}function x(){return(x=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(null,arguments)}function p(e,t){return(p=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e})(e,t)}var y=function(e){function t(){for(var t,n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(t=e.call.apply(e,[this].concat(r))||this).handleDragStart=function(e){var n=t.props,r=n.onBrushHandleChange,i=n.type,a=n.onBrushStart;r&&r(i,g(e.event)),a&&a(e)},t.handleDragMove=function(e){var n=t.props,r=n.updateBrush,i=n.type,a=n.isControlled;e.isDragging&&!a&&r((function(t){var n=t.start,r=t.end,a=0,o=Math.max(n.x,r.x),u=Math.min(n.x,r.x),s=Math.max(n.y,r.y),l=Math.min(n.y,r.y);switch(i){case"right":return a=o+e.dx,x({},t,{activeHandle:i,extent:x({},t.extent,{x0:Math.max(Math.min(a,n.x),t.bounds.x0),x1:Math.min(Math.max(a,n.x),t.bounds.x1)})});case"left":return a=u+e.dx,x({},t,{activeHandle:i,extent:x({},t.extent,{x0:Math.min(a,r.x),x1:Math.max(a,r.x)})});case"bottom":return a=s+e.dy,x({},t,{activeHandle:i,extent:x({},t.extent,{y0:Math.min(a,n.y),y1:Math.max(a,n.y)})});case"top":return a=l+e.dy,x({},t,{activeHandle:i,extent:x({},t.extent,{y0:Math.min(a,r.y),y1:Math.max(a,r.y)})});default:return t}}))},t.handleDragEnd=function(){var e=t.props,n=e.updateBrush,r=e.onBrushEnd,i=e.onBrushHandleChange;e.isControlled||n((function(e){var t=e.start,n=e.end,i=e.extent;t.x=Math.min(i.x0,i.x1),t.y=Math.min(i.y0,i.y0),n.x=Math.max(i.x0,i.x1),n.y=Math.max(i.y0,i.y1);var a=x({},e,{start:t,end:n,activeHandle:null,isBrushing:!1,extent:{x0:Math.min(t.x,n.x),x1:Math.max(t.x,n.x),y0:Math.min(t.y,n.y),y1:Math.max(t.y,n.y)}});return r&&r(a),a})),i&&i()},t}var n,r;return r=e,(n=t).prototype=Object.create(r.prototype),n.prototype.constructor=n,p(n,r),t.prototype.render=function(){var e=this,t=this.props,n=t.stageWidth,r=t.stageHeight,a=t.brush,o=t.type,u=t.handle,s=t.isControlled,l=t.isDragInProgress,d=t.renderBrushHandle,c=u.x,f=u.y,g=u.width,p=u.height,y="right"===o||"left"===o?"ew-resize":"ns-resize";return i.createElement(h.Z,{width:n,height:r,onDragStart:this.handleDragStart,onDragMove:this.handleDragMove,onDragEnd:this.handleDragEnd,resetOnStart:!0,isDragging:s?l:void 0},(function(t){var u=t.dragStart,l=t.dragEnd,h=t.dragMove,v=t.isDragging;return i.createElement("g",null,v&&i.createElement("rect",{fill:"transparent",width:n,height:r,style:{cursor:y},onPointerMove:h,onPointerUp:s?void 0:l,onPointerLeave:s?void 0:l}),!d&&i.createElement("rect",{x:c,y:f,width:g,height:p,fill:"transparent",className:"visx-brush-handle-"+o,onPointerDown:u,onPointerMove:h,onPointerUp:s?void 0:l,style:{cursor:y,pointerEvents:a.activeHandle||a.isBrushing?"none":"all"}}),d&&i.createElement("g",{onPointerDown:u,onPointerMove:h,onPointerUp:s?void 0:l},d(x({},e.props.handle,{height:r,className:"visx-brush-handle-"+o,isBrushActive:-1!==a.extent.x0&&-1!==a.extent.x1}))))}))},t}(i.Component);function v(){return(v=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(null,arguments)}function m(e,t){return(m=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e})(e,t)}y.propTypes={stageWidth:l().number.isRequired,stageHeight:l().number.isRequired,updateBrush:l().func.isRequired,onBrushStart:l().func,onBrushEnd:l().func,handle:l().shape({x:l().number.isRequired,y:l().number.isRequired,width:l().number.isRequired,height:l().number.isRequired}).isRequired,isControlled:l().bool,isDragInProgress:l().bool,onBrushHandleChange:l().func,renderBrushHandle:l().func};var b=function(e){function t(){for(var t,n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(t=e.call.apply(e,[this].concat(r))||this).cornerDragMove=function(e){var n=t.props,r=n.updateBrush,i=n.type;e.isDragging&&r((function(t){var n=t.start,r=t.end,a=Math.max(n.x,r.x),o=Math.min(n.x,r.x),u=Math.max(n.y,r.y),s=Math.min(n.y,r.y),l=0,d=0;switch(i){case"topRight":return l=a+e.dx,d=s+e.dy,v({},t,{activeHandle:i,extent:v({},t.extent,{x0:Math.max(Math.min(l,n.x),t.bounds.x0),x1:Math.min(Math.max(l,n.x),t.bounds.x1),y0:Math.max(Math.min(d,r.y),t.bounds.y0),y1:Math.min(Math.max(d,r.y),t.bounds.y1)})});case"topLeft":return l=o+e.dx,d=s+e.dy,v({},t,{activeHandle:i,extent:v({},t.extent,{x0:Math.max(Math.min(l,r.x),t.bounds.x0),x1:Math.min(Math.max(l,r.x),t.bounds.x1),y0:Math.max(Math.min(d,r.y),t.bounds.y0),y1:Math.min(Math.max(d,r.y),t.bounds.y1)})});case"bottomLeft":return l=o+e.dx,d=u+e.dy,v({},t,{activeHandle:i,extent:v({},t.extent,{x0:Math.max(Math.min(l,r.x),t.bounds.x0),x1:Math.min(Math.max(l,r.x),t.bounds.x1),y0:Math.max(Math.min(d,n.y),t.bounds.y0),y1:Math.min(Math.max(d,n.y),t.bounds.y1)})});case"bottomRight":return l=a+e.dx,d=u+e.dy,v({},t,{activeHandle:i,extent:v({},t.extent,{x0:Math.max(Math.min(l,n.x),t.bounds.x0),x1:Math.min(Math.max(l,n.x),t.bounds.x1),y0:Math.max(Math.min(d,n.y),t.bounds.y0),y1:Math.min(Math.max(d,n.y),t.bounds.y1)})});default:return t}}))},t.cornerDragEnd=function(){var e=t.props,n=e.updateBrush,r=e.onBrushEnd;n((function(e){var t=e.start,n=e.end,i=e.extent;t.x=Math.min(i.x0,i.x1),t.y=Math.min(i.y0,i.y0),n.x=Math.max(i.x0,i.x1),n.y=Math.max(i.y0,i.y1);var a=v({},e,{start:t,end:n,activeHandle:null,domain:{x0:Math.min(t.x,n.x),x1:Math.max(t.x,n.x),y0:Math.min(t.y,n.y),y1:Math.max(t.y,n.y)}});return r&&r(a),a}))},t}var n,r;return r=e,(n=t).prototype=Object.create(r.prototype),n.prototype.constructor=n,m(n,r),t.prototype.render=function(){var e=this.props,t=e.type,n=e.brush,r=e.stageWidth,a=e.stageHeight,o=e.style,u=e.corner,s=(null==o?void 0:o.cursor)||("topLeft"===t||"bottomRight"===t?"nwse-resize":"nesw-resize"),l=n.activeHandle||n.isBrushing?"none":"all";return i.createElement(h.Z,{width:r,height:a,onDragMove:this.cornerDragMove,onDragEnd:this.cornerDragEnd,resetOnStart:!0},(function(e){var n=e.dragMove,d=e.dragEnd,h=e.dragStart,c=e.isDragging;return i.createElement("g",null,c&&i.createElement("rect",{fill:"transparent",width:r,height:a,style:{cursor:s},onPointerMove:n,onPointerUp:d}),i.createElement("rect",v({fill:"transparent",onPointerDown:h,onPointerMove:n,onPointerUp:d,className:"visx-brush-corner-"+t,style:v({cursor:s,pointerEvents:l},o)},u)))}))},t}(i.Component);function M(){return(M=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(null,arguments)}function w(e,t){return(w=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e})(e,t)}b.propTypes={stageWidth:l().number.isRequired,stageHeight:l().number.isRequired,updateBrush:l().func.isRequired,onBrushEnd:l().func,corner:l().shape({x:l().number.isRequired,y:l().number.isRequired,width:l().number.isRequired,height:l().number.isRequired}).isRequired},b.defaultProps={style:{}};var S={cursor:"move"},O=function(e){function t(){for(var t,n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(t=e.call.apply(e,[this].concat(r))||this).selectionDragStart=function(e){var n=t.props,r=n.onMoveSelectionChange,i=n.onBrushStart;r&&r("move",g(e.event)),i&&i(e)},t.selectionDragMove=function(e){var n=t.props,r=n.updateBrush;n.isControlled||r((function(t){var n=t.start,r=n.x,i=n.y,a=t.end,o=a.x,u=a.y,s=e.dx>0?Math.min(e.dx,t.bounds.x1-o):Math.max(e.dx,t.bounds.x0-r),l=e.dy>0?Math.min(e.dy,t.bounds.y1-u):Math.max(e.dy,t.bounds.y0-i);return M({},t,{isBrushing:!0,extent:M({},t.extent,{x0:r+s,x1:o+s,y0:i+l,y1:u+l})})}))},t.selectionDragEnd=function(){var e=t.props,n=e.updateBrush,r=e.onBrushEnd,i=e.onMoveSelectionChange;e.isControlled||n((function(e){var t=M({},e,{isBrushing:!1,start:M({},e.start,{x:Math.min(e.extent.x0,e.extent.x1),y:Math.min(e.extent.y0,e.extent.y1)}),end:M({},e.end,{x:Math.max(e.extent.x0,e.extent.x1),y:Math.max(e.extent.y0,e.extent.y1)})});return r&&r(t),t})),i&&i()},t}var n,r;return r=e,(n=t).prototype=Object.create(r.prototype),n.prototype.constructor=n,w(n,r),t.prototype.render=function(){var e=this.props,t=e.width,n=e.height,r=e.stageWidth,a=e.stageHeight,o=e.brush,u=e.disableDraggingSelection,s=e.onMouseLeave,l=e.onMouseMove,d=e.onMouseUp,c=e.onClick,f=e.selectedBoxStyle,g=e.isControlled,x=e.isDragInProgress;return i.createElement(h.Z,{width:t,height:n,resetOnStart:!0,onDragStart:this.selectionDragStart,onDragMove:this.selectionDragMove,onDragEnd:this.selectionDragEnd,isDragging:g?x:void 0},(function(e){var h=e.isDragging,x=e.dragStart,p=e.dragEnd,y=e.dragMove;return i.createElement("g",null,h&&i.createElement("rect",{width:r,height:a,fill:"transparent",onPointerUp:g?void 0:p,onPointerMove:y,onPointerLeave:g?void 0:p,style:S}),i.createElement("rect",M({x:Math.min(o.extent.x0,o.extent.x1),y:Math.min(o.extent.y0,o.extent.y1),width:t,height:n,className:"visx-brush-selection",onPointerDown:u?void 0:x,onPointerLeave:function(e){s&&s(e)},onPointerMove:function(e){y(e),l&&l(e)},onPointerUp:function(e){g||p(e),d&&d(e)},onClick:function(e){c&&c(e)},style:{pointerEvents:o.isBrushing||o.activeHandle?"none":"all",cursor:u?void 0:"move"}},f)))}))},t}(i.Component);O.propTypes={width:l().number.isRequired,height:l().number.isRequired,stageWidth:l().number.isRequired,stageHeight:l().number.isRequired,updateBrush:l().func.isRequired,onMoveSelectionChange:l().func,onBrushStart:l().func,onBrushEnd:l().func,disableDraggingSelection:l().bool.isRequired,onMouseLeave:l().func,onMouseMove:l().func,onMouseUp:l().func,onClick:l().func,isControlled:l().bool,isDragInProgress:l().bool},O.defaultProps={onMouseLeave:null,onMouseUp:null,onMouseMove:null,onClick:null};var B=n(23972);function D(){return(D=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(null,arguments)}function E(e){return i.createElement(B.Z,D({className:"visx-brush-overlay",fill:"transparent",x:0,y:0},e))}function P(){return(P=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(null,arguments)}function C(e,t){return(C=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e})(e,t)}E.propTypes={width:l().number.isRequired,height:l().number.isRequired,onClick:l().func,onDoubleClick:l().func,onPointerDown:l().func,onPointerLeave:l().func,onPointerMove:l().func,onPointerUp:l().func};var k=function(e){function t(t){var n;(n=e.call(this,t)||this).mouseUpTime=0,n.mouseDownTime=0,n.getIdleState=function(){var e=n.props;return{start:{x:0,y:0},end:{x:0,y:0},extent:{x0:-1,x1:-1,y0:-1,y1:-1},bounds:{x0:0,x1:e.width,y0:0,y1:e.height},isBrushing:!1,brushPageOffset:void 0,activeHandle:null,brushingType:void 0}},n.handleWindowPointerUp=function(){var e=n.props,t=e.useWindowMoveEvents,r=e.onBrushEnd,i=e.resetOnEnd,a=n.state.brushingType;t&&a&&n.updateBrush((function(e){var t=e.start,a=e.end,o=e.extent;t.x=Math.min(o.x0,o.x1),t.y=Math.min(o.y0,o.y0),a.x=Math.max(o.x0,o.x1),a.y=Math.max(o.y0,o.y1);var u=P({},e,{activeHandle:null,isBrushing:!1,brushingType:void 0});return r&&r(u),i&&(u=P({},u,n.getIdleState())),u}))},n.handleWindowPointerMove=function(e){var t=n.props.useWindowMoveEvents,r=n.state,i=r.brushingType,a=r.isBrushing,o=r.brushPageOffset,u=r.start;if(t&&a){var s=e.pageX-((null==o?void 0:o.pageX)||0),l=e.pageY-((null==o?void 0:o.pageY)||0);["left","right","top","bottom"].includes(null!=i?i:"")&&n.updateBrush((function(e){var t=e.start,r=t.x,a=t.y,o=e.end,u=o.x,d=o.y;return P({},e,{isBrushing:!0,extent:P({},e.extent,n.getExtent({x:"left"===i?Math.min(Math.max(r+s,e.bounds.x0),e.bounds.x1):r,y:"top"===i?Math.min(Math.max(a+l,e.bounds.y0),e.bounds.y1):a},{x:"right"===i?Math.min(Math.max(u+s,e.bounds.x0),e.bounds.x1):u,y:"bottom"===i?Math.min(Math.max(d+l,e.bounds.y0),e.bounds.y1):d}))})})),"move"===i&&n.updateBrush((function(e){var t=e.start,n=t.x,r=t.y,i=e.end,a=i.x,o=i.y,u=s>0?Math.min(s,e.bounds.x1-a):Math.max(s,e.bounds.x0-n),d=l>0?Math.min(l,e.bounds.y1-o):Math.max(l,e.bounds.y0-r);return P({},e,{isBrushing:!0,extent:P({},e.extent,{x0:n+u,y0:r+d,x1:a+u,y1:o+d})})})),"select"===i&&n.updateBrush((function(e){var t=e.start,r=t.x,i=t.y,a={x:Math.min(Math.max(r+s,e.bounds.x0),e.bounds.x1),y:Math.min(Math.max(i+l,e.bounds.y0),e.bounds.y1)};return P({},e,{end:a,extent:n.getExtent(u,a)})}))}},n.debouncedHandleWindowPointerMove=function(e,t){var n;return function(){for(var r=this,i=arguments.length,a=new Array(i),o=0;o<i;o++)a[o]=arguments[o];clearTimeout(n),n=setTimeout((function(){e.apply(r,a)}),t)}}(n.handleWindowPointerMove,1),n.getExtent=function(e,t){var r=n.props,i=r.brushDirection,a=r.width,o=r.height;return{x0:"vertical"===i?0:Math.min(e.x||0,t.x||0),x1:"vertical"===i?a:Math.max(e.x||0,t.x||0),y0:"horizontal"===i?0:Math.min(e.y||0,t.y||0),y1:"horizontal"===i?o:Math.max(e.y||0,t.y||0)}},n.handleDragStart=function(e){var t=n.props,r=t.onBrushStart,i=t.left,a=t.top,o=t.inheritedMargin,u=t.useWindowMoveEvents,s=null!=o&&o.left?o.left:0,l=null!=o&&o.top?o.top:0,d={x:(e.x||0)+e.dx-i-s,y:(e.y||0)+e.dy-a-l},h=P({},d);r&&r(d),n.updateBrush((function(t){return P({},t,{start:d,end:h,extent:{x0:-1,x1:-1,y0:-1,y1:-1},isBrushing:!0,brushingType:"select",brushPageOffset:u?g(e.event):void 0})}))},n.handleBrushStart=function(e){var t=n.props,r=t.onBrushStart,i=t.left,a=t.top,o=t.inheritedMargin;if(r){var u=null!=o&&o.left?o.left:0,s=null!=o&&o.top?o.top:0;r({x:(e.x||0)+e.dx-i-u,y:(e.y||0)+e.dy-a-s})}},n.handleDragMove=function(e){var t=n.props,r=t.left,i=t.top,a=t.inheritedMargin,o=t.useWindowMoveEvents;if(e.isDragging&&!o){var u=(null==a?void 0:a.left)||0,s=(null==a?void 0:a.top)||0,l={x:(e.x||0)+e.dx-r-u,y:(e.y||0)+e.dy-i-s};n.updateBrush((function(e){var t=e.start,r=n.getExtent(t,l);return P({},e,{end:l,extent:r})}))}},n.handleDragEnd=function(){var e=n.props,t=e.onBrushEnd,r=e.resetOnEnd;e.useWindowMoveEvents||n.updateBrush((function(e){var i=e.extent,a=P({},e,{start:{x:i.x0,y:i.y0},end:{x:i.x1,y:i.y1},isBrushing:!1,brushingType:void 0,activeHandle:null});return t&&t(a),r&&(a=P({},a,n.getIdleState())),a}))},n.getBrushWidth=function(){var e=n.state.extent,t=e.x0,r=e.x1;return Math.max(Math.max(t,r)-Math.min(t,r),0)},n.getBrushHeight=function(){var e=n.state.extent,t=e.y1,r=e.y0;return Math.max(Math.max(r,t)-Math.min(r,t),0)},n.handles=function(){var e=n.props.handleSize,t=n.state.extent,r=t.x0,i=t.x1,a=t.y0,o=t.y1,u=e/2,s=n.getBrushWidth(),l=n.getBrushHeight();return{top:{x:r-u,y:a-u,height:e,width:s+e},bottom:{x:r-u,y:o-u,height:e,width:s+e},right:{x:i-u,y:a-u,height:l+e,width:e},left:{x:r-u,y:a-u,height:l+e,width:e}}},n.corners=function(){var e=n.props.handleSize,t=n.state.extent,r=t.x0,i=t.x1,a=t.y0,o=t.y1,u=e/2,s=e,l=e;return{topLeft:{x:Math.min(r,i)-u,y:Math.min(a,o)-u,width:s,height:l},topRight:{x:Math.max(r,i)-u,y:Math.min(a,o)-u,width:s,height:l},bottomLeft:{x:Math.min(r,i)-u,y:Math.max(a,o)-u,width:s,height:l},bottomRight:{x:Math.max(r,i)-u,y:Math.max(a,o)-u,width:s,height:l}}},n.updateBrush=function(e){var t=n.props.onChange;n.setState(e,(function(){t&&t(n.state)}))},n.reset=function(){return n.updateBrush((function(){return n.getIdleState()}))},n.handleBrushingTypeChange=function(e,t){n.updateBrush((function(n){var r=P({},n,{brushingType:e,isBrushing:void 0!==e});return(t||void 0===e)&&(r.brushPageOffset=t),r}))};var r=t.initialBrushPosition,i=r?n.getExtent(r.start,r.end):{x0:-1,x1:-1,y0:-1,y1:-1};return n.state={start:{x:Math.max(0,i.x0),y:Math.max(0,i.y0)},end:{x:Math.max(0,i.x1),y:Math.max(0,i.y1)},extent:i,bounds:{x0:0,x1:n.props.width,y0:0,y1:n.props.height},isBrushing:!1,brushingType:void 0,activeHandle:null},n}var n,r;r=e,(n=t).prototype=Object.create(r.prototype),n.prototype.constructor=n,C(n,r);var a=t.prototype;return a.componentDidUpdate=function(e){var t=this;this.props.width===e.width&&this.props.height===e.height||this.setState((function(n){var r=n.start,i=n.end,a=n.extent;if(-1!==a.x0||-1!==a.x1||-1!==a.y0||-1!==a.y1){var o=t.props.width/e.width,u=t.props.height/e.height;r={x:o*a.x0,y:u*a.y0},i={x:o*a.x1,y:u*a.y1},a=t.getExtent(r,i)}return{start:r,end:i,extent:a,bounds:{x0:0,x1:t.props.width,y0:0,y1:t.props.height}}}))},a.componentDidMount=function(){this.props.useWindowMoveEvents&&(window.addEventListener("mouseup",this.handleWindowPointerUp),window.addEventListener("mousemove",this.debouncedHandleWindowPointerMove))},a.componentWillUnmount=function(){this.props.useWindowMoveEvents&&(window.removeEventListener("mouseup",this.handleWindowPointerUp),window.removeEventListener("mousemove",this.debouncedHandleWindowPointerMove))},a.render=function(){var e=this,t=this.state,n=t.start,r=t.end,a=this.props,o=a.top,u=a.left,s=a.width,l=a.height,c=a.onMouseLeave,f=a.onMouseUp,g=a.onMouseMove,x=a.onBrushEnd,p=a.onClick,v=a.resizeTriggerAreas,m=a.selectedBoxStyle,M=a.disableDraggingSelection,w=a.disableDraggingOverlay,S=a.clickSensitivity,B=a.useWindowMoveEvents,D=a.renderBrushHandle,P=this.state.brushingType,C=this.handles(),k=this.corners(),T=this.getBrushWidth(),A=this.getBrushHeight(),j=new Set(v);return i.createElement(d.Z,{className:"visx-brush",top:o,left:u},w?i.createElement(E,{width:s,height:l,onClick:function(t){var n=e.mouseUpTime-e.mouseDownTime;p&&n<S&&p(t)},style:{cursor:"default"}}):i.createElement(h.Z,{width:s,height:l,resetOnStart:!0,onDragStart:this.handleDragStart,onDragMove:this.handleDragMove,onDragEnd:this.handleDragEnd,isDragging:B?"select"===P:void 0},(function(t){var n=t.dragStart,r=t.isDragging,a=t.dragMove,o=t.dragEnd;return i.createElement(E,{width:s,height:l,onDoubleClick:function(){return e.reset()},onClick:function(t){var n=e.mouseUpTime-e.mouseDownTime;p&&n<S&&p(t)},onPointerDown:function(t){e.mouseDownTime=Date.now(),n(t)},onPointerLeave:function(e){c&&c(e)},onPointerMove:function(e){!r&&g&&g(e),r&&a(e)},onPointerUp:function(t){e.mouseUpTime=Date.now(),f&&f(t),o(t)},style:{cursor:"crosshair"}})})),n&&r&&i.createElement(O,{updateBrush:this.updateBrush,width:T,height:A,stageWidth:s,stageHeight:l,brush:this.state,disableDraggingSelection:M,onBrushEnd:x,onBrushStart:this.handleBrushStart,onMouseLeave:c,onMouseMove:g,onMouseUp:f,onMoveSelectionChange:this.handleBrushingTypeChange,onClick:p,selectedBoxStyle:m,isControlled:B,isDragInProgress:B?"move"===P:void 0}),n&&r&&Object.keys(C).filter((function(e){return j.has(e)})).map((function(t){var n=C[t];return n&&i.createElement(y,{key:"handle-"+t,type:t,handle:n,stageWidth:s,stageHeight:l,updateBrush:e.updateBrush,brush:e.state,onBrushStart:e.handleBrushStart,onBrushEnd:x,isControlled:B,isDragInProgress:B?P===t:void 0,onBrushHandleChange:e.handleBrushingTypeChange,renderBrushHandle:D})})),n&&r&&Object.keys(k).filter((function(e){return j.has(e)})).map((function(t){var n=k[t];return n&&i.createElement(b,{key:"corner-"+t,type:t,brush:e.state,updateBrush:e.updateBrush,stageWidth:s,stageHeight:l,corner:n,onBrushEnd:x})})))},t}(i.Component);function T(e,t){return(T=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e})(e,t)}k.propTypes={brushDirection:l().oneOf(["horizontal","vertical","both"]),width:l().number.isRequired,height:l().number.isRequired,left:l().number.isRequired,top:l().number.isRequired,onChange:l().func,handleSize:l().number,resizeTriggerAreas:l().array,onBrushStart:l().func,onBrushEnd:l().func,onMouseLeave:l().func,onMouseUp:l().func,onMouseMove:l().func,onClick:l().func,clickSensitivity:l().number,disableDraggingSelection:l().bool,disableDraggingOverlay:l().bool,resetOnEnd:l().bool,useWindowMoveEvents:l().bool,renderBrushHandle:l().func},k.defaultProps={brushDirection:"both",inheritedMargin:{left:0,top:0,right:0,bottom:0},onChange:null,handleSize:4,resizeTriggerAreas:["left","right"],onBrushStart:null,onBrushEnd:null,onMouseLeave:null,onMouseUp:null,onMouseMove:null,onClick:null,disableDraggingSelection:!1,disableDraggingOverlay:!1,clickSensitivity:200,resetOnEnd:!1,initialBrushPosition:null,useWindowMoveEvents:!1,renderBrushHandles:null};var A="steelblue",j=function(e){function t(){for(var t,n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(t=e.call.apply(e,[this].concat(r))||this).handleChange=function(e){var n=t.props.onChange;if(n){var r=e.extent.x0;if("undefined"===typeof r||r<0)n(null);else n(t.convertRangeToDomain(e))}},t.handleBrushStart=function(e){var n=t.props.onBrushStart;if(n){var r=e.x,i=e.y,a=t.props,o=a.xScale,u=a.yScale,s=c(o,r),l=c(u,i);n({x:"invert"in o&&"undefined"!==typeof o.invert?s:o.domain()[s],y:"invert"in u&&"undefined"!==typeof u.invert?l:u.domain()[l]})}},t.handleBrushEnd=function(e){var n=t.props.onBrushEnd;if(n){var r=e.extent.x0;if("undefined"===typeof r||r<0)n(null);else n(t.convertRangeToDomain(e))}},t}var n,r;r=e,(n=t).prototype=Object.create(r.prototype),n.prototype.constructor=n,T(n,r);var a=t.prototype;return a.convertRangeToDomain=function(e){var t=this.props,n=t.xScale,r=t.yScale,i=e.extent,a=i.x0,o=i.x1,u=i.y0,s=i.y1,l=f(n,a||0,o||0,2),d=f(r,u||0,s||0,2);return{x0:l.start||0,x1:l.end||0,xValues:l.values,y0:d.start||0,y1:d.end||0,yValues:d.values}},a.render=function(){var e,t,n,r,a=this.props,o=a.xScale,u=a.yScale,s=a.height,l=a.width,d=a.margin,h=a.brushDirection,c=a.initialBrushPosition,f=a.innerRef,g=a.resizeTriggerAreas,x=a.brushRegion,p=a.yAxisOrientation,y=a.xAxisOrientation,v=a.selectedBoxStyle,m=a.disableDraggingSelection,b=a.disableDraggingOverlay,M=a.resetOnEnd,w=a.onMouseLeave,S=a.onMouseMove,O=a.onClick,B=a.handleSize,D=a.useWindowMoveEvents,E=a.renderBrushHandle;if(!o||!u)return null;var P=null!=d&&d.left?d.left:0,C=null!=d&&d.top?d.top:0,T=null!=d&&d.right?d.right:0,A=null!=d&&d.bottom?d.bottom:0;return"chart"===x?(n=0,r=0,e=l,t=s):"yAxis"===x?(r=0,t=s,"right"===p?(n=l,e=T):(n=-P,e=P)):(n=0,e=l,"bottom"===y?(r=s,t=A):(r=-C,t=C)),i.createElement(k,{width:e,height:t,left:n,top:r,brushDirection:h,disableDraggingSelection:m,disableDraggingOverlay:b,handleSize:B,inheritedMargin:d,initialBrushPosition:c,ref:f,resetOnEnd:M,resizeTriggerAreas:g,selectedBoxStyle:v,onBrushEnd:this.handleBrushEnd,onBrushStart:this.handleBrushStart,onChange:this.handleChange,onClick:O,onMouseLeave:w,onMouseMove:S,useWindowMoveEvents:D,renderBrushHandle:E})},t}(i.Component);j.propTypes={height:l().number,width:l().number,onChange:l().func,onBrushEnd:l().func,brushDirection:l().oneOf(["vertical","horizontal","both"]),resizeTriggerAreas:l().array,brushRegion:l().oneOf(["xAxis","yAxis","chart"]),yAxisOrientation:l().oneOf(["left","right"]),xAxisOrientation:l().oneOf(["top","bottom"]),disableDraggingSelection:l().bool,disableDraggingOverlay:l().bool,resetOnEnd:l().bool,handleSize:l().number,useWindowMoveEvents:l().bool,renderBrushHandle:l().func},j.defaultProps={xScale:null,yScale:null,onChange:null,height:0,width:0,selectedBoxStyle:{fill:A,fillOpacity:.2,stroke:A,strokeWidth:1,strokeOpacity:.8},margin:{top:0,left:0,right:0,bottom:0},handleSize:4,brushDirection:"horizontal",initialBrushPosition:null,resizeTriggerAreas:["left","right"],brushRegion:"chart",yAxisOrientation:"right",xAxisOrientation:"bottom",onBrushStart:null,onBrushEnd:null,disableDraggingSelection:!1,resetOnEnd:!1,onMouseMove:null,onMouseLeave:null,onClick:null,useWindowMoveEvents:!1,renderBrushHandles:null};var _=j,L=n(59358),R=n(64276),q=n(54048),H=n(29135),W=n(57299),Z=n(35381),z=n(43918),U=n(27266),I=n(52322),N="#fff",V={textAnchor:"middle",fontFamily:"Arial",fontSize:10,fill:N},Y={dx:"-0.25em",dy:"0.25em",fontFamily:"Arial",fontSize:10,textAnchor:"end",fill:N};function X(e){var t=e.data,n=e.gradientColor,r=e.width,i=e.yMax,a=e.margin,o=e.xScale,u=e.yScale,s=e.hideBottomAxis,l=void 0!==s&&s,h=e.hideLeftAxis,c=void 0!==h&&h,f=e.top,g=e.left,x=e.children;return r<10?null:(0,I.jsxs)(d.Z,{left:g||a.left,top:f||a.top,children:[(0,I.jsx)(R.Z,{id:"gradient",from:n,fromOpacity:1,to:n,toOpacity:.2}),(0,I.jsx)(W.Z,{data:t,x:function(e){return o(function(e){return new Date(e.date)}(e))||0},y:function(e){return u(function(e){return e.close}(e))||0},yScale:u,strokeWidth:1,stroke:"url(#gradient)",fill:"url(#gradient)",curve:U.Z}),!l&&(0,I.jsx)(Z.Z,{top:i,scale:o,numTicks:r>520?10:5,stroke:N,tickStroke:N,tickLabelProps:V}),!c&&(0,I.jsx)(z.Z,{scale:u,numTicks:5,stroke:N,tickStroke:N,tickLabelProps:Y}),x]})}try{X.displayName="AreaChart",X.__docgenInfo={description:"",displayName:"AreaChart",props:{data:{defaultValue:null,description:"",name:"data",required:!0,type:{name:"AppleStock[]"}},gradientColor:{defaultValue:null,description:"",name:"gradientColor",required:!0,type:{name:"string"}},xScale:{defaultValue:null,description:"",name:"xScale",required:!0,type:{name:"ValueOf<ScaleTypeToD3Scale<number, any, any>>"}},yScale:{defaultValue:null,description:"",name:"yScale",required:!0,type:{name:"ValueOf<ScaleTypeToD3Scale<number, any, any>>"}},width:{defaultValue:null,description:"",name:"width",required:!0,type:{name:"number"}},yMax:{defaultValue:null,description:"",name:"yMax",required:!0,type:{name:"number"}},margin:{defaultValue:null,description:"",name:"margin",required:!0,type:{name:"{ top: number; right: number; bottom: number; left: number; }"}},hideBottomAxis:{defaultValue:{value:!1},description:"",name:"hideBottomAxis",required:!1,type:{name:"boolean"}},hideLeftAxis:{defaultValue:{value:!1},description:"",name:"hideLeftAxis",required:!1,type:{name:"boolean"}},top:{defaultValue:null,description:"",name:"top",required:!1,type:{name:"number"}},left:{defaultValue:null,description:"",name:"left",required:!1,type:{name:"number"}}}},"undefined"!==typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/sandboxes/visx-brush/AreaChart.tsx#AreaChart"]={docgenInfo:X.__docgenInfo,name:"AreaChart",path:"src/sandboxes/visx-brush/AreaChart.tsx#AreaChart"})}catch(le){}function F(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function K(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?F(Object(n),!0).forEach((function(t){(0,r.Z)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):F(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var J=u.Z.slice(1e3),$={top:10,bottom:15,left:50,right:20},G="brush_pattern",Q="brush_gradient",ee="#f6acc8",te="#584153",ne="#af8baf",re={fill:"url(#".concat(G,")"),stroke:"white"},ie=function(e){return new Date(e.date)},ae=function(e){return e.close};function oe(e){var t=e.compact,n=void 0!==t&&t,r=e.width,u=e.height,s=e.margin,l=void 0===s?{top:20,left:50,bottom:20,right:20}:s,d=(0,i.useRef)(null),h=(0,i.useState)(J),c=h[0],f=h[1],g=u-l.top-l.bottom,x=n?15:40,p=.8*g-x,y=g-p-30,v=Math.max(r-l.left-l.right,0),m=Math.max(p,0),b=Math.max(r-$.left-$.right,0),M=Math.max(y-$.top-$.bottom,0),w=(0,i.useMemo)((function(){return(0,a.Z)({range:[0,v],domain:(0,q.Z)(c,ie)})}),[v,c]),S=(0,i.useMemo)((function(){return(0,o.Z)({range:[m,0],domain:[0,(0,H.Z)(c,ae)||0],nice:!0})}),[m,c]),O=(0,i.useMemo)((function(){return(0,a.Z)({range:[0,b],domain:(0,q.Z)(J,ie)})}),[b]),B=(0,i.useMemo)((function(){return(0,o.Z)({range:[M,0],domain:[0,(0,H.Z)(J,ae)||0],nice:!0})}),[M]),D=(0,i.useMemo)((function(){return{start:{x:O(ie(J[50]))},end:{x:O(ie(J[100]))}}}),[O]);return(0,I.jsxs)("div",{children:[(0,I.jsxs)("svg",{width:r,height:u,children:[(0,I.jsx)(R.Z,{id:Q,from:te,to:ne,rotate:45}),(0,I.jsx)("rect",{x:0,y:0,width:r,height:u,fill:"url(#".concat(Q,")"),rx:14}),(0,I.jsx)(X,{hideBottomAxis:n,data:c,width:r,margin:K(K({},l),{},{bottom:x}),yMax:m,xScale:w,yScale:S,gradientColor:ne}),(0,I.jsxs)(X,{hideBottomAxis:!0,hideLeftAxis:!0,data:J,width:r,yMax:M,xScale:O,yScale:B,margin:$,top:p+x+l.top,gradientColor:ne,children:[(0,I.jsx)(L.Z,{id:G,height:8,width:8,stroke:ee,strokeWidth:1,orientation:["diagonal"]}),(0,I.jsx)(_,{xScale:O,yScale:B,width:b,height:M,margin:$,handleSize:8,innerRef:d,resizeTriggerAreas:["left","right"],brushDirection:"horizontal",initialBrushPosition:D,onChange:function(e){if(e){var t=e.x0,n=e.x1,r=e.y0,i=e.y1,a=J.filter((function(e){var a=ie(e).getTime(),o=ae(e);return a>t&&a<n&&o>r&&o<i}));f(a)}},onClick:function(){return f(J)},selectedBoxStyle:re,useWindowMoveEvents:!0,renderBrushHandle:function(e){return(0,I.jsx)(ue,K({},e))}})]})]}),(0,I.jsx)("button",{onClick:function(){null!==d&&void 0!==d&&d.current&&(f(J),d.current.reset())},children:"Clear"}),"\xa0",(0,I.jsx)("button",{onClick:function(){if(null!==d&&void 0!==d&&d.current){d.current.updateBrush((function(e){var t=d.current.getExtent(D.start,D.end);return K(K({},e),{},{start:{y:t.y0,x:t.x0},end:{y:t.y1,x:t.x1},extent:t})}))}},children:"Reset"})]})}function ue(e){var t=e.x,n=e.height;return e.isBrushActive?(0,I.jsx)(d.Z,{left:t+4,top:(n-15)/2,children:(0,I.jsx)("path",{fill:"#f2f2f2",d:"M -4.5 0.5 L 3.5 0.5 L 3.5 15.5 L -4.5 15.5 L -4.5 0.5 M -1.5 4 L -1.5 12 M 0.5 4 L 0.5 12",stroke:"#999999",strokeWidth:"1",style:{cursor:"ew-resize"}})}):null}var se=oe;try{oe.displayName="BrushChart",oe.__docgenInfo={description:"",displayName:"BrushChart",props:{width:{defaultValue:null,description:"",name:"width",required:!0,type:{name:"number"}},height:{defaultValue:null,description:"",name:"height",required:!0,type:{name:"number"}},margin:{defaultValue:{value:"{\n    top: 20,\n    left: 50,\n    bottom: 20,\n    right: 20,\n  }"},description:"",name:"margin",required:!1,type:{name:"{ top: number; right: number; bottom: number; left: number; }"}},compact:{defaultValue:{value:!1},description:"",name:"compact",required:!1,type:{name:"boolean"}}}},"undefined"!==typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/sandboxes/visx-brush/Example.tsx#BrushChart"]={docgenInfo:oe.__docgenInfo,name:"BrushChart",path:"src/sandboxes/visx-brush/Example.tsx#BrushChart"})}catch(le){}},35381:function(e,t,n){n.d(t,{Z:function(){return h}});var r=n(2784),i=n(72779),a=n.n(i),o=n(26543),u=n(34237),s=["axisClassName","labelOffset","tickLength","tickLabelProps"];function l(){return(l=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(null,arguments)}var d={dy:"0.25em",fill:"#222",fontFamily:"Arial",fontSize:10,textAnchor:"middle"};function h(e){var t=e.axisClassName,n=e.labelOffset,i=void 0===n?8:n,h=e.tickLength,c=void 0===h?8:h,f=e.tickLabelProps,g=function(e,t){if(null==e)return{};var n={};for(var r in e)if({}.hasOwnProperty.call(e,r)){if(t.includes(r))continue;n[r]=e[r]}return n}(e,s),x="function"===typeof f?f:l({},d,f);return r.createElement(o.Z,l({axisClassName:a()("visx-axis-bottom",t),labelOffset:i,orientation:u.Z.bottom,tickLabelProps:x,tickLength:c},g))}},43918:function(e,t,n){n.d(t,{Z:function(){return h}});var r=n(2784),i=n(72779),a=n.n(i),o=n(26543),u=n(34237),s=["axisClassName","labelOffset","tickLength","tickLabelProps"];function l(){return(l=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(null,arguments)}var d={dx:"-0.25em",dy:"0.25em",fill:"#222",fontFamily:"Arial",fontSize:10,textAnchor:"end"};function h(e){var t=e.axisClassName,n=e.labelOffset,i=void 0===n?36:n,h=e.tickLength,c=void 0===h?8:h,f=e.tickLabelProps,g=function(e,t){if(null==e)return{};var n={};for(var r in e)if({}.hasOwnProperty.call(e,r)){if(t.includes(r))continue;n[r]=e[r]}return n}(e,s),x="function"===typeof f?f:l({},d,f);return r.createElement(o.Z,l({axisClassName:a()("visx-axis-left",t),labelOffset:i,orientation:u.Z.left,tickLabelProps:x,tickLength:c},g))}},83418:function(e,t,n){t.Z=u;var r=o(n(13980)),i=o(n(2784)),a=o(n(27485));function o(e){return e&&e.__esModule?e:{default:e}}function u(e){var t=e.captureDragArea,n=void 0===t||t,r=e.snapToPointer,o=void 0===r||r,u=e.children,s=e.dx,l=e.dy,d=e.height,h=e.onDragEnd,c=e.onDragMove,f=e.onDragStart,g=e.resetOnStart,x=e.width,p=e.x,y=e.y,v=e.isDragging,m=e.restrict,b=e.restrictToPath,M=(0,a.default)({resetOnStart:g,snapToPointer:o,onDragEnd:h,onDragMove:c,onDragStart:f,x:p,y:y,dx:s,dy:l,isDragging:v,restrict:m,restrictToPath:b});return i.default.createElement(i.default.Fragment,null,M.isDragging&&n&&i.default.createElement("rect",{width:x,height:d,onPointerDown:M.dragStart,onPointerMove:M.dragMove,onPointerUp:M.dragEnd,fill:"transparent"}),u(M))}u.propTypes={children:r.default.func.isRequired,width:r.default.number.isRequired,height:r.default.number.isRequired,captureDragArea:r.default.bool,isDragging:r.default.bool}},27485:function(e,t,n){t.__esModule=!0,t.default=function(e){var t=void 0===e?{}:e,n=t.resetOnStart,l=void 0!==n&&n,h=t.snapToPointer,c=void 0===h||h,f=t.onDragEnd,g=t.onDragMove,x=t.onDragStart,p=t.x,y=t.y,v=t.dx,m=t.dy,b=t.isDragging,M=t.restrict,w=void 0===M?{}:M,S=t.restrictToPath,O=(0,r.useRef)({x:p,y:y,dx:v,dy:m}),B=(0,o.default)({x:p,y:y,dx:null!=v?v:0,dy:null!=m?m:0,isDragging:!1}),D=B[0],E=B[1],P=(0,r.useState)(new i.Point({x:0,y:0})),C=P[0],k=P[1];(0,r.useEffect)((function(){O.current.x===p&&O.current.y===y&&O.current.dx===v&&O.current.dy===m||(O.current={x:p,y:y,dx:v,dy:m},E((function(e){return d({},e,{x:p,y:y,dx:null!=v?v:0,dy:null!=m?m:0})})))})),(0,r.useEffect)((function(){void 0!==b&&D.isDragging!==b&&E((function(e){return d({},e,{isDragging:b})}))}),[D.isDragging,b,E]);var T=(0,s.default)(S),A=(0,r.useCallback)((function(e){e.persist(),E((function(t){var n=t.x,r=void 0===n?0:n,o=t.y,s=void 0===o?0:o,d=t.dx,h=t.dy,f=new i.Point({x:(r||0)+d,y:(s||0)+h}),g=(0,a.localPoint)(e)||new i.Point({x:0,y:0}),x=c?g:f,p=(0,u.default)(x,T,w);return k((0,i.subtractPoints)(f,g)),{isDragging:!0,dx:l?0:t.dx,dy:l?0:t.dy,x:l?p.x:p.x-t.dx,y:l?p.y:p.y-t.dy}}),x&&function(t){x(d({},t,{event:e}))})}),[x,l,w,T,E,c]),j=(0,r.useCallback)((function(e){e.persist(),E((function(t){if(!t.isDragging)return t;var n=t.x,r=void 0===n?0:n,o=t.y,s=void 0===o?0:o,l=(0,a.localPoint)(e)||new i.Point({x:0,y:0}),h=c?l:(0,i.sumPoints)(l,C),f=(0,u.default)(h,T,w);return d({},t,{dx:f.x-r,dy:f.y-s})}),g&&function(t){t.isDragging&&g(d({},t,{event:e}))})}),[E,g,c,C,T,w]),_=(0,r.useCallback)((function(e){e.persist(),E((function(e){return d({},e,{isDragging:!1})}),f&&function(t){f(d({},t,{event:e}))})}),[f,E]);return d({},D,{dragEnd:_,dragMove:j,dragStart:A})};var r=n(2784),i=n(65830),a=n(43848),o=l(n(77017)),u=l(n(10289)),s=l(n(3050));function l(e){return e&&e.__esModule?e:{default:e}}function d(){return(d=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(null,arguments)}},55861:function(e,t){t.__esModule=!0,t.default=function(e,t,n){return Math.min(Math.max(e,t),n)}},91267:function(e,t){function n(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}t.__esModule=!0,t.default=function(e,t){for(var r,i=e,a=1/0,o=function(e,t){var r="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(r)return(r=r.call(e)).next.bind(r);if(Array.isArray(e)||(r=function(e,t){if(e){if("string"==typeof e)return n(e,t);var r={}.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?n(e,t):void 0}}(e))||t&&e&&"number"==typeof e.length){r&&(e=r);var i=0;return function(){return i>=e.length?{done:!0}:{done:!1,value:e[i++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}(t);!(r=o()).done;){var u=r.value,s=Math.sqrt(Math.pow(u.x-e.x,2)+Math.pow(u.y-e.y,2));s<a&&(a=s,i={x:u.x,y:u.y})}return i}},10289:function(e,t,n){t.__esModule=!0,t.default=function(e,t,n){var a,o,u,s;void 0===n&&(n={});if(t.length>0)return(0,i.default)(e,t);return{x:(0,r.default)(e.x,null!=(a=n.xMin)?a:-1/0,null!=(o=n.xMax)?o:1/0),y:(0,r.default)(e.y,null!=(u=n.yMin)?u:-1/0,null!=(s=n.yMax)?s:1/0)}};var r=a(n(55861)),i=a(n(91267));function a(e){return e&&e.__esModule?e:{default:e}}},3050:function(e,t,n){t.__esModule=!0,t.default=function(e){return(0,r.useMemo)((function(){if(!e)return[];var t=e.getCTM()||new DOMMatrix;return function(e,t,n){void 0===n&&(n=1);if(!e)return[];for(var r=[],i=e.getTotalLength(),a=0;a<=i;a+=n){var o=e.getPointAtLength(a).matrixTransform(t);r.push(o)}return r}(e,t)}),[null==e?void 0:e.getTotalLength()])};var r=n(2784)},77017:function(e,t,n){t.__esModule=!0,t.default=function(e){var t=(0,r.useState)(e),n=t[0],i=t[1],a=(0,r.useRef)(null),o=(0,r.useCallback)((function(e,t){a.current=t||null,i(e)}),[i]);return(0,r.useLayoutEffect)((function(){a.current&&(a.current(n),a.current=null)}),[n]),[n,o]};var r=n(2784)},43848:function(e,t,n){n.r(t),n.d(t,{localPoint:function(){return r.Z},touchPoint:function(){return i.Z}});var r=n(9527),i=n(78481)},4549:function(e){e.exports=JSON.parse('{"name":"@visx/demo-brush","description":"Standalone visx brush demo.","main":"index.tsx","private":true,"dependencies":{"@babel/runtime":"^7.8.4","@types/react":"^18","@types/react-dom":"^18","@visx/axis":"latest","@visx/brush":"latest","@visx/curve":"latest","@visx/gradient":"latest","@visx/group":"latest","@visx/mock-data":"latest","@visx/pattern":"latest","@visx/responsive":"latest","@visx/scale":"latest","@visx/shape":"latest","@visx/vendor":"latest","react":"^18","react-dom":"^18","react-scripts-ts":"3.1.0","typescript":"^3"},"keywords":["visualization","d3","react","visx","brush","interaction"]}')}}]);