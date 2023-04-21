export function toExportName(displayName) {
    var isComponent = !!(displayName && displayName[0].toLowerCase() !== displayName[0]);
    if (isComponent) {
        return "<" + displayName + " />";
    }
    return displayName + "()";
}
