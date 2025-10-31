export interface BaseDatum {
  text: string;
}

export interface WordcloudConfig<Datum extends BaseDatum> {
  /**
   * Width of the wordcloud layout.
   */
  width: number;
  /**
   * Height of the wordcloud layout.
   */
  height: number;
  /**
   * Sets the words array.
   */
  words: Datum[];
  /**
   * Sets the padding accessor function, which indicates the numerical padding for each word.
   *
   * @default 1
   */
  padding?: number | ((datum: Datum, index: number) => number);
  /**
   * Sets the font accessor function, which indicates the font face for each word.
   *
   * @default serif
   */
  font?: string | ((datum: Datum, index: number) => string);
  /**
   * Sets the fontSize accessor function, which indicates the numerical font size for each word.
   *
   * @default function(datum) { return Math.sqrt(datum.value); }
   */
  fontSize?: number | ((datum: Datum, index: number) => number);
  /**
   * Sets the fontStyle accessor function, which indicates the font style for each word.
   *
   * @default normal
   */
  fontStyle?: string | ((datum: Datum, index: number) => string);
  /**
   * Sets the fontWeight accessor function, which indicates the font weight for each word.
   *
   * @default normal
   */
  fontWeight?: string | number | ((datum: Datum, index: number) => string | number);
  /**
   * Sets the rotate accessor function, which indicates the rotation angle (in degrees) for each word.
   *
   * @default function() { return (~~(Math.random() * 6) -3) * 30; }
   */
  rotate?: number | ((datum: Datum, index: number) => number);
  /**
   * Sets the current type of spiral used for positioning words.
   * This can either be one of the two built-in spirals, "archimedean" and "rectangular", or an arbitrary spiral generator can be used.
   *
   * @default archimedean
   */
  spiral?:
    | 'archimedean'
    | 'rectangular'
    | ((size: [number, number]) => (t: number) => [number, number]);
  /**
   * Sets the internal random number generator, used for selecting the initial position of each word,
   * and the clockwise/counterclockwise direction of the spiral for each word. Random function should return a number in the range [0, 1).
   * When the returned value is a fixed value, the layout coordinates of each word will be the same every time the word cloud of the same data is rendered.
   * By default, the browser's built-in 'Math.random' is used, which means that each rendering will change the position of the word.
   *
   * @default Math.random
   */
  random?: () => number;
}

/**
 * below are taken from @types/d3-cloud
 * they are copied below because TS@^4.8 is incompatible with its @d3/types dep.
 */
export interface CloudWord {
  text?: string | undefined;
  font?: string | undefined;
  style?: string | undefined;
  weight?: string | number | undefined;
  rotate?: number | undefined;
  size?: number | undefined;
  padding?: number | undefined;
  x?: number | undefined;
  y?: number | undefined;
}

export interface Cloud<T extends CloudWord> {
  start(): Cloud<T>;
  stop(): Cloud<T>;

  timeInterval(): number;
  timeInterval(interval: number): Cloud<T>;

  words(): T[];
  words(words: T[]): Cloud<T>;

  size(): [number, number];
  size(size: [number, number]): Cloud<T>;

  font(): (datum: T, index: number) => string;
  font(font: string | ((datum: T, index: number) => string)): Cloud<T>;

  fontStyle(): (datum: T, index: number) => string;
  fontStyle(style: string | ((datum: T, index: number) => string)): Cloud<T>;

  fontWeight(): (datum: T, index: number) => string | number;
  fontWeight(weight: string | number | ((datum: T, index: number) => string | number)): Cloud<T>;

  rotate(): (datum: T, index: number) => number;
  rotate(rotate: number | ((datum: T, index: number) => number)): Cloud<T>;

  text(): (datum: T, index: number) => string;
  text(text: string | ((datum: T, index: number) => string)): Cloud<T>;

  spiral(): (size: [number, number]) => (t: number) => [number, number];
  spiral(name: string | ((size: [number, number]) => (t: number) => [number, number])): Cloud<T>;

  fontSize(): (datum: T, index: number) => number;
  fontSize(size: number | ((datum: T, index: number) => number)): Cloud<T>;

  padding(): (datum: T, index: number) => number;
  padding(padding: number | ((datum: T, index: number) => number)): Cloud<T>;

  /**
   * If specified, sets the internal random number generator,used for selecting the initial position of each word,
   * and the clockwise/counterclockwise direction of the spiral for each word.
   *
   * @param randomFunction should return a number in the range [0, 1).The default is Math.random.
   */
  random(): Cloud<T>;
  // eslint-disable-next-line @typescript-eslint/unified-signatures
  random(randomFunction: () => number): Cloud<T>;

  /**
   * If specified, sets the canvas generator function, which is used internally to draw text.
   * When using Node.js, you will almost definitely override the default, e.g. using the canvas module.
   * @param canvasGenerator should return a HTMLCanvasElement.The default is:  ()=>{document.createElement("canvas");}
   */
  canvas(): Cloud<T>;
  // eslint-disable-next-line @typescript-eslint/unified-signatures
  canvas(canvasGenerator: () => HTMLCanvasElement): Cloud<T>;

  on(type: 'word', listener: (word: T) => void): Cloud<T>;
  on(type: 'end', listener: (tags: T[], bounds: Array<{ x: number; y: number }>) => void): Cloud<T>;
  on(type: string, listener: (...args: any[]) => void): Cloud<T>;

  on(type: 'word'): (word: T) => void;
  on(type: 'end'): (tags: T[], bounds: Array<{ x: number; y: number }>) => void;
  on(type: string): (...args: any[]) => void;
}
