
declare module 'react-native' {
  const a: any;

  export default a;
  export const GestureResponderHandlers: any;
  export const ImageProps: any;
  export interface ViewProperties { [key: string]: any }

  type NodeHandle = number;
  

  type Falsy = undefined | null | false;
  interface RecursiveArray<T> extends Array<T | ReadonlyArray<T> | RecursiveArray<T>> { }
  /** Keep a brand of 'T' so that calls to `StyleSheet.flatten` can take `RegisteredStyle<T>` and return `T`. */
  type RegisteredStyle<T> = number & { __registeredStyleBrand: T };
  export type StyleProp<T> = T | RegisteredStyle<T> | RecursiveArray<T | RegisteredStyle<T> | Falsy> | Falsy;

  /**
   * @see https://facebook.github.io/react-native/docs/image.html
   */
  export interface ImagePropsBase {
    /**
     * onLayout function
     *
     * Invoked on mount and layout changes with
     *
     * {nativeEvent: { layout: {x, y, width, height} }}.
     */
    onLayout?: (event: any) => void;

    /**
     * Invoked on load error with {nativeEvent: {error}}
     */
    onError?: (error: NativeSyntheticEvent<any>) => void;

    /**
     * Invoked when load completes successfully
     * { source: { url, height, width } }.
     */
    onLoad?: (event: NativeSyntheticEvent<any>) => void;

    /**
     * Invoked when load either succeeds or fails
     */
    onLoadEnd?: () => void;

    /**
     * Invoked on load start
     */
    onLoadStart?: () => void;

    progressiveRenderingEnabled?: boolean;

    borderRadius?: number;

    borderTopLeftRadius?: number;

    borderTopRightRadius?: number;

    borderBottomLeftRadius?: number;

    borderBottomRightRadius?: number;

    /**
     * Determines how to resize the image when the frame doesn't match the raw
     * image dimensions.
     *
     * 'cover': Scale the image uniformly (maintain the image's aspect ratio)
     * so that both dimensions (width and height) of the image will be equal
     * to or larger than the corresponding dimension of the view (minus padding).
     *
     * 'contain': Scale the image uniformly (maintain the image's aspect ratio)
     * so that both dimensions (width and height) of the image will be equal to
     * or less than the corresponding dimension of the view (minus padding).
     *
     * 'stretch': Scale width and height independently, This may change the
     * aspect ratio of the src.
     *
     * 'repeat': Repeat the image to cover the frame of the view.
     * The image will keep it's size and aspect ratio. (iOS only)
     *
     * 'center': Scale the image down so that it is completely visible,
     * if bigger than the area of the view.
     * The image will not be scaled up.
     */
    resizeMode?: any;

    /**
     * The mechanism that should be used to resize the image when the image's dimensions
     * differ from the image view's dimensions. Defaults to `auto`.
     *
     * - `auto`: Use heuristics to pick between `resize` and `scale`.
     *
     * - `resize`: A software operation which changes the encoded image in memory before it
     * gets decoded. This should be used instead of `scale` when the image is much larger
     * than the view.
     *
     * - `scale`: The image gets drawn downscaled or upscaled. Compared to `resize`, `scale` is
     * faster (usually hardware accelerated) and produces higher quality images. This
     * should be used if the image is smaller than the view. It should also be used if the
     * image is slightly bigger than the view.
     *
     * More details about `resize` and `scale` can be found at http://frescolib.org/docs/resizing-rotating.html.
     *
     * @platform android
     */
    resizeMethod?: 'auto' | 'resize' | 'scale';

    /**
     * The image source (either a remote URL or a local file resource).
     *
     * This prop can also contain several remote URLs, specified together with their width and height and potentially with scale/other URI arguments.
     * The native side will then choose the best uri to display based on the measured size of the image container.
     * A cache property can be added to control how networked request interacts with the local cache.
     *
     * The currently supported formats are png, jpg, jpeg, bmp, gif, webp (Android only), psd (iOS only).
     */
    source: any;

    /**
     * similarly to `source`, this property represents the resource used to render
     * the loading indicator for the image, displayed until image is ready to be
     * displayed, typically after when it got downloaded from network.
     */
    loadingIndicatorSource?: any;

    /**
     * A unique identifier for this element to be used in UI Automation testing scripts.
     */
    testID?: string;

    /**
     * A static image to display while downloading the final image off the network.
     */
    defaultSource?: any | number;
  }

  /**
 * Image style
 * @see https://facebook.github.io/react-native/docs/image.html#style
 * @see https://github.com/facebook/react-native/blob/master/Libraries/Image/ImageStylePropTypes.js
 */
  export interface ImageStyle {
    resizeMode?: any;
    backfaceVisibility?: 'visible' | 'hidden';
    borderBottomLeftRadius?: number;
    borderBottomRightRadius?: number;
    backgroundColor?: string;
    borderColor?: string;
    borderWidth?: number;
    borderRadius?: number;
    borderTopLeftRadius?: number;
    borderTopRightRadius?: number;
    overflow?: 'visible' | 'hidden';
    overlayColor?: string;
    tintColor?: string;
    opacity?: number;
  }

  export interface ImageProps extends ImagePropsBase {
    /**
     *
     * Style
     */
    style?: StyleProp<ImageStyle>;
  }


  export interface NativeSyntheticEvent<T> extends React.BaseSyntheticEvent<T, NodeHandle, NodeHandle> { }


  export interface NativeTouchEvent {
    /**
     * Array of all touch events that have changed since the last event
     */
    changedTouches: NativeTouchEvent[];

    /**
     * The ID of the touch
     */
    identifier: string;

    /**
     * The X position of the touch, relative to the element
     */
    locationX: number;

    /**
     * The Y position of the touch, relative to the element
     */
    locationY: number;

    /**
     * The X position of the touch, relative to the screen
     */
    pageX: number;

    /**
     * The Y position of the touch, relative to the screen
     */
    pageY: number;

    /**
     * The node id of the element receiving the touch event
     */
    target: string;

    /**
     * A time identifier for the touch, useful for velocity calculation
     */
    timestamp: number;

    /**
     * Array of all current touches on the screen
     */
    touches: NativeTouchEvent[];
  }

  export interface GestureResponderEvent extends NativeSyntheticEvent<NativeTouchEvent> { }


  export interface GestureResponderHandlers {
    /**
     * A view can become the touch responder by implementing the correct negotiation methods.
     * There are two methods to ask the view if it wants to become responder:
     */

    /**
     * Does this view want to become responder on the start of a touch?
     */
    onStartShouldSetResponder?: (event: GestureResponderEvent) => boolean;

    /**
     * Called for every touch move on the View when it is not the responder: does this view want to "claim" touch responsiveness?
     */
    onMoveShouldSetResponder?: (event: GestureResponderEvent) => boolean;

    /**
     * If the View returns true and attempts to become the responder, one of the following will happen:
     */

    onResponderEnd?: (event: GestureResponderEvent) => void;

    /**
     * The View is now responding for touch events.
     * This is the time to highlight and show the user what is happening
     */
    onResponderGrant?: (event: GestureResponderEvent) => void;

    /**
     * Something else is the responder right now and will not release it
     */
    onResponderReject?: (event: GestureResponderEvent) => void;

    /**
     * If the view is responding, the following handlers can be called:
     */

    /**
     * The user is moving their finger
     */
    onResponderMove?: (event: GestureResponderEvent) => void;

    /**
     * Fired at the end of the touch, ie "touchUp"
     */
    onResponderRelease?: (event: GestureResponderEvent) => void;

    onResponderStart?: (event: GestureResponderEvent) => void;

    /**
     *  Something else wants to become responder.
     *  Should this view release the responder? Returning true allows release
     */
    onResponderTerminationRequest?: (event: GestureResponderEvent) => boolean;

    /**
     * The responder has been taken from the View.
     * Might be taken by other views after a call to onResponderTerminationRequest,
     * or might be taken by the OS without asking (happens with control center/ notification center on iOS)
     */
    onResponderTerminate?: (event: GestureResponderEvent) => void;

    /**
     * onStartShouldSetResponder and onMoveShouldSetResponder are called with a bubbling pattern,
     * where the deepest node is called first.
     * That means that the deepest component will become responder when multiple Views return true for *ShouldSetResponder handlers.
     * This is desirable in most cases, because it makes sure all controls and buttons are usable.
     *
     * However, sometimes a parent will want to make sure that it becomes responder.
     * This can be handled by using the capture phase.
     * Before the responder system bubbles up from the deepest component,
     * it will do a capture phase, firing on*ShouldSetResponderCapture.
     * So if a parent View wants to prevent the child from becoming responder on a touch start,
     * it should have a onStartShouldSetResponderCapture handler which returns true.
     */
    onStartShouldSetResponderCapture?: (event: GestureResponderEvent) => boolean;

    /**
     * onStartShouldSetResponder and onMoveShouldSetResponder are called with a bubbling pattern,
     * where the deepest node is called first.
     * That means that the deepest component will become responder when multiple Views return true for *ShouldSetResponder handlers.
     * This is desirable in most cases, because it makes sure all controls and buttons are usable.
     *
     * However, sometimes a parent will want to make sure that it becomes responder.
     * This can be handled by using the capture phase.
     * Before the responder system bubbles up from the deepest component,
     * it will do a capture phase, firing on*ShouldSetResponderCapture.
     * So if a parent View wants to prevent the child from becoming responder on a touch start,
     * it should have a onStartShouldSetResponderCapture handler which returns true.
     */
    onMoveShouldSetResponderCapture?: (event: GestureResponderEvent) => boolean;
  }
}
