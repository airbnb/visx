export default function extractVisxDepsFromPackageJson(packageJson) {
    var _a;
    var visxDeps = [];
    Object.keys((_a = packageJson === null || packageJson === void 0 ? void 0 : packageJson.dependencies) !== null && _a !== void 0 ? _a : {}).forEach(function (dep) {
        if (dep.startsWith('@visx/'))
            visxDeps.push(dep);
    });
    return visxDeps;
}
