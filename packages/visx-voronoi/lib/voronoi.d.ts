interface Config<Datum> {
    /** The total width of the voronoi layout. */
    width?: number;
    /** The total width of the voronoi layout. */
    height?: number;
    /** Set the x-value accessor function for the voronoi layout. */
    x?: (d: Datum) => number;
    /** Set the y-value accessor function for the voronoi layout. */
    y?: (d: Datum) => number;
}
/**
 * Returns a configured d3 voronoi `layout`. calling `layout(data)` returns a voronoi *diagram*.
 * Alternatively call `layout.polygons(data)`, `layout.triangles(data)`, `layout.links(data)`
 */
export default function voronoi<Datum>({ width, height, x, y }: Config<Datum>): import("d3-voronoi").VoronoiLayout<Datum>;
export {};
//# sourceMappingURL=voronoi.d.ts.map