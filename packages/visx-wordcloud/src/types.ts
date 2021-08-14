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
