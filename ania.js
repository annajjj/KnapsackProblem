"use strict";
exports.__esModule = true;
var mock_1 = require("./mock/mock");
var generated_data_1 = require("./mock/generated-data");
var cTable = require("console.table");
var notPlacedContainers = [];
function checkSpace(container, placedContainers) {
    var result = checkSpaceXY(container, placedContainers, 'normal');
    if (!result.valid)
        result = checkSpaceXY(container, placedContainers, 'rotated');
    if (!result.valid)
        notPlacedContainers.push(container);
}
function checkSpaceXY(container, placedContainers, type) {
    var _a;
    if (type == 'rotated')
        _a = [container.length, container.width], container.width = _a[0], container.length = _a[1];
    for (var shipX = 0; shipX < mock_1.ship.length; shipX++) {
        for (var shipY = 0; shipY < mock_1.ship.width; shipY++) {
            if (placedContainers[shipX][shipY] === 'x') {
                for (var containerX = shipX; ((containerX < shipX + container.length) && (shipX + container.length < mock_1.ship.length + 1)); containerX++) {
                    for (var containerY = shipY; ((containerY < shipY + container.width) && (shipY + container.width < mock_1.ship.width + 1)); containerY++) {
                        if (placedContainers[containerX][containerY] !== 'x') {
                            containerX = shipX + container.length;
                            containerY = shipY + container.width;
                        }
                        if ((container.length == (containerX - shipX + 1)) && (container.width == (containerY - shipY + 1))) {
                            fillArray(shipX, shipY, container);
                            return { valid: true };
                        }
                    }
                }
            }
        }
    }
    return { valid: false };
}
function fillArray(x, y, container) {
    for (var i = x; i < container.length + x; i++)
        for (var j = y; j < container.width + y; j++)
            placedContainers[i][j] = container.id;
}
var sortedContainers = generated_data_1.generatedContainers
    .sort(function (a, b) {
    if (a.timestamp > b.timestamp)
        return 1;
    else if (a.timestamp < b.timestamp)
        return -1;
    else
        return (a.width * a.length < b.width * b.length) ? 1 : -1;
});
var placedContainers = new Array(mock_1.ship.length);
for (var i = 0; i < mock_1.ship.length; i++) {
    placedContainers[i] = new Array(mock_1.ship.width);
    for (var j = 0; j < mock_1.ship.width; j++)
        placedContainers[i][j] = 'x';
}
sortedContainers.forEach(function (el) { return checkSpace(el, placedContainers); });
var table = cTable.getTable(placedContainers);
console.table(placedContainers);
console.log(notPlacedContainers);
