"use strict";
exports.__esModule = true;
var mock_1 = require("./mock/mock");
var generated_data_1 = require("./mock/generated-data");
var cTable = require("console.table");
var notPlacedContainers = [];
function checkSpace(container) {
    var result = checkSpaceXY(container, 'floor0', 'normal');
    if (!result.valid)
        result = checkSpaceXY(container, 'floor0', 'rotated');
    if (!result.valid)
        notPlacedContainers.push(container);
}
function checkSpaceXY(container, floor, type) {
    var _a;
    if (type == 'rotated')
        _a = [container.length, container.width], container.width = _a[0], container.length = _a[1];
    for (var shipX = 0; shipX < mock_1.ship.length; shipX++) {
        for (var shipY = 0; shipY < mock_1.ship.width; shipY++) {
            if (placedContainers[floor][shipX][shipY] === 'x') {
                for (var containerX = shipX; ((containerX < shipX + container.length) && (shipX + container.length < mock_1.ship.length + 1)); containerX++) {
                    for (var containerY = shipY; ((containerY < shipY + container.width) && (shipY + container.width < mock_1.ship.width + 1)); containerY++) {
                        if (placedContainers[floor][containerX][containerY] !== 'x') {
                            containerX = shipX + container.length;
                            containerY = shipY + container.width;
                        }
                        if ((container.length == (containerX - shipX + 1)) && (container.width == (containerY - shipY + 1))) {
                            fillArray(shipX, shipY, container, floor);
                            return { valid: true };
                        }
                    }
                }
            }
        }
    }
    return { valid: false };
}
function fillArray(x, y, container, floor) {
    for (var i = x; i < container.length + x; i++)
        for (var j = y; j < container.width + y; j++)
            placedContainers[floor][i][j] = container.id;
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
var floors = Math.floor(mock_1.ship.height / generated_data_1.generatedContainers[0].height);
var placedContainers = {};
for (var floor = 0; floor < floors; floor++) {
    placedContainers["floor" + floor] = new Array(mock_1.ship.length);
    for (var i = 0; i < mock_1.ship.length; i++) {
        placedContainers["floor" + floor][i] = new Array(mock_1.ship.width);
        for (var j = 0; j < mock_1.ship.width; j++)
            placedContainers["floor" + floor][i][j] = 'x';
    }
}
// let placedContainers = new Array(ship.length);
// for (let i = 0; i < ship.length; i++) {
//     placedContainers[i] = new Array(ship.width);
//     for (let j = 0; j < ship.width; j++)
//         placedContainers[i][j] = 'x';
// }
// console.log(placedContainers["floor0"]);
// let table = cTable.getTable(placedContainers);
// console.table(placedContainers);
sortedContainers.forEach(function (el) { return checkSpace(el); });
var table = cTable.getTable(placedContainers);
console.table(placedContainers);
console.log(notPlacedContainers);
