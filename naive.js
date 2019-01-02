"use strict";
exports.__esModule = true;
var mock_1 = require("./mock/mock");
var generated_data_1 = require("./mock/generated-data");
var cTable = require("console.table");
function checkSpace(container) {
    var result;
    for (var floor = 0; floor < floors; floor++) {
        result = checkSpaceXY(container, floor);
        if (result.valid)
            break;
    }
    if (!result.valid)
        notPlacedContainers.push(container); //dla developementu
}
function checkSpaceXY(container, floor, type) {
    if (type === void 0) { type = 'normal'; }
    var _a;
    if (type == 'rotated')
        _a = [container.length, container.width], container.width = _a[0], container.length = _a[1];
    for (var shipX = 0; shipX < mock_1.ship.length; shipX++) {
        for (var shipY = 0; shipY < mock_1.ship.width; shipY++) {
            if (placedContainers["floor" + floor][shipX][shipY] === 'x') {
                var checkFloorUnder = 0;
                for (var containerX = shipX; ((containerX < shipX + container.length) && (shipX + container.length < mock_1.ship.length + 1)); containerX++) {
                    for (var containerY = shipY; ((containerY < shipY + container.width) && (shipY + container.width < mock_1.ship.width + 1)); containerY++) {
                        if (placedContainers["floor" + floor][containerX][containerY] !== 'x') {
                            containerX = shipX + container.length;
                            containerY = shipY + container.width;
                            break;
                        }
                        if (floor > 0)
                            if (placedContainers["floor" + (floor - 1)][containerX][containerY] !== 'x')
                                checkFloorUnder++;
                        if ((container.length == (containerX - shipX + 1)) && (container.width == (containerY - shipY + 1))) {
                            if (floor > 0 && checkFloorUnder < (container.length * container.width / 2)) {
                                containerX = shipX + container.length;
                                containerY = shipY + container.width;
                                break;
                            }
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
            placedContainers["floor" + floor][i][j] = container.id;
}
function countFreeSpace() {
    var freeSpace = 0;
    for (var floor = 0; floor < floors; floor++) {
        for (var i = 0; i < mock_1.ship.length; i++) {
            for (var j = 0; j < mock_1.ship.width; j++) {
                if (placedContainers["floor" + floor][i][j] == "x")
                    freeSpace++;
            }
        }
    }
    return freeSpace;
}
function showResults() {
    var table;
    for (var floor = 0; floor < floors; floor++) {
        console.log("floor" + floor);
        table = cTable.getTable(placedContainers["floor" + floor]);
        console.table(placedContainers["floor" + floor]);
    }
    console.log("not placed containers: ", notPlacedContainers);
}
var sortedContainers = generated_data_1.generatedContainers
    .sort(function (a, b) {
    if (a.timestamp > b.timestamp)
        return 1;
    else if (a.timestamp < b.timestamp)
        return -1;
});
console.time('execution');
var floors = Math.floor(mock_1.ship.height / generated_data_1.generatedContainers[0].height);
var placedContainers = {};
var notPlacedContainers = [];
for (var floor = 0; floor < floors; floor++) {
    placedContainers["floor" + floor] = new Array(mock_1.ship.length);
    for (var i = 0; i < mock_1.ship.length; i++) {
        placedContainers["floor" + floor][i] = new Array(mock_1.ship.width);
        for (var j = 0; j < mock_1.ship.width; j++)
            placedContainers["floor" + floor][i][j] = 'x';
    }
}
sortedContainers.forEach(function (el) { return checkSpace(el); });
// showResults();
// console.log(notPlacedContainers.length, countFreeSpace())
console.timeEnd('execution');
