var pointKey = function (_a) {
    var x = _a.x, y = _a.y;
    return [x, y].join('_');
};
function distance(a, b) {
    return Math.sqrt(Math.pow((b.x - a.x), 2) + Math.pow((b.y - a.y), 2));
}
/** generate a continuous path that fill rectangular space, similar to the classic Nokia snake game. */
export default function generateSnakePath(_a) {
    var width = _a.width, height = _a.height, step = _a.step;
    var points = [];
    var used = new Set();
    function next(point) {
        var x = point.x, y = point.y;
        return [
            { x: x - step, y: y - step },
            { x: x - step, y: y },
            { x: x - step, y: y + step },
            { x: x, y: y - step },
            { x: x, y: y + step },
            { x: x + step, y: y - step },
            { x: x + step, y: y },
            { x: x + step, y: y + step },
        ]
            .filter(function (p) { return p.x >= 0 && p.x <= width && p.y >= 0 && p.y <= height && !used.has(pointKey(p)); })
            .map(function (p) { return ({
            point: p,
            distance: distance(point, p),
        }); })
            .sort(function (a, b) { return a.distance - b.distance; });
    }
    var currentPoint = {
        x: width / 2,
        y: height / 2,
    };
    while (currentPoint) {
        points.push(currentPoint);
        used.add(pointKey(currentPoint));
        var choices = next(currentPoint);
        currentPoint = choices.length > 0 ? choices[0].point : null;
    }
    return points;
}
