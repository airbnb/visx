export interface GenericCell<ColumnDatum, BinDatum> {
    /** BinDatum for cell. */
    bin: BinDatum;
    /** Cell row index. */
    row: number;
    /** Cell column index. */
    column: number;
    /** ColumnDatum for the cell. */
    datum: ColumnDatum;
    /** Cell gap specified. */
    gap: number;
    /** Count returned for this BinDatum. */
    count?: number | null;
    /** Opacity returned for this BinDatum's count. */
    opacity: number | undefined;
    /** Color returned for this BinDatum's count. */
    color: string | undefined;
}
export declare type ColorScale = (count: number | {
    valueOf(): number;
}) => string | undefined;
export declare type OpacityScale = (count: number | {
    valueOf(): number;
}) => number | undefined;
//# sourceMappingURL=types.d.ts.map