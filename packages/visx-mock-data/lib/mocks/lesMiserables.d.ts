export interface LesMiserablesNode {
    id: string;
    group: number;
}
export interface LesMiserablesLink {
    source: string;
    target: string;
    value: number;
}
export interface LesMiserables {
    nodes: LesMiserablesNode[];
    links: LesMiserablesLink[];
}
declare const lesMiserables: LesMiserables;
export default lesMiserables;
//# sourceMappingURL=lesMiserables.d.ts.map