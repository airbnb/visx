import {
  arrow as arrowMiddleware,
  flip as flipMiddleware,
  hide as hideMiddleware,
  offset as offsetMiddleware,
  shift as shiftMiddleware,
  size as sizeMiddleware,
  type Middleware,
} from '@floating-ui/react';
import type { UseFloatingTooltipOptions } from './types';

type BuildFloatingTooltipMiddlewareOptions = Pick<
  UseFloatingTooltipOptions,
  | 'arrow'
  | 'collisionBoundary'
  | 'collisionPadding'
  | 'flip'
  | 'hideWhenDetached'
  | 'middleware'
  | 'middlewareMode'
  | 'offset'
  | 'shift'
  | 'size'
> & {
  arrowElement?: Element | null;
};

function getCollisionOptions({
  collisionBoundary,
  collisionPadding,
}: Pick<BuildFloatingTooltipMiddlewareOptions, 'collisionBoundary' | 'collisionPadding'>) {
  return {
    boundary: collisionBoundary,
    padding: collisionPadding,
  };
}

export function buildFloatingTooltipMiddleware({
  arrow,
  arrowElement,
  collisionBoundary,
  collisionPadding,
  flip = true,
  hideWhenDetached = false,
  middleware,
  middlewareMode = 'append',
  offset = 0,
  shift = true,
  size = false,
}: BuildFloatingTooltipMiddlewareOptions = {}) {
  const callerMiddleware = middleware ?? [];

  if (middlewareMode === 'replace') return callerMiddleware;

  const collisionOptions = getCollisionOptions({ collisionBoundary, collisionPadding });
  const builtInMiddleware: Middleware[] = [offsetMiddleware(offset)];

  if (flip) {
    builtInMiddleware.push(
      flipMiddleware({
        ...collisionOptions,
        ...(typeof flip === 'object' ? flip : null),
      }),
    );
  }

  if (shift) {
    builtInMiddleware.push(
      shiftMiddleware({
        ...collisionOptions,
        ...(typeof shift === 'object' ? shift : null),
      }),
    );
  }

  if (size) {
    builtInMiddleware.push(
      sizeMiddleware({
        ...collisionOptions,
        ...(typeof size === 'object' ? size : null),
      }),
    );
  }

  if (hideWhenDetached) {
    builtInMiddleware.push(
      hideMiddleware({
        ...collisionOptions,
        ...(typeof hideWhenDetached === 'object' ? hideWhenDetached : null),
      }),
    );
  }

  if (arrow && arrowElement) {
    builtInMiddleware.push(
      arrowMiddleware({
        element: arrowElement,
        padding: typeof arrow === 'object' ? arrow.padding : undefined,
      }),
    );
  }

  return [...builtInMiddleware, ...callerMiddleware];
}
