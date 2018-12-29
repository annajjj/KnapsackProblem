"use strict";
exports.__esModule = true;
var mock_1 = require("./mock");
var cTable = require("console.table");
function checkPlace(container, array) {
    var placedContainers = new Array();
    placedContainers = JSON.parse(JSON.stringify(array));
    var result = checkFreePlace(container, placedContainers, 'normal');
    if (!result.valid)
        result = checkFreePlace(container, placedContainers, 'rotated');
    return result;
}
function checkFreePlace(container, array, type) {
    var _a;
    var placedContainers = new Array();
    placedContainers = JSON.parse(JSON.stringify(array));
    if (type == 'rotated')
        _a = [container.length, container.width], container.width = _a[0], container.length = _a[1];
    for (var shipY = 0; shipY < mock_1.ship.width; shipY++) {
        for (var shipX = 0; shipX < mock_1.ship.length; shipX++) {
            if (placedContainers[shipY][shipX] === 'x') {
                console.log('s', shipY, shipX);
                for (var containerY = shipY; containerY < shipY + container.width; containerY++) {
                    for (var containerX = shipX; containerX < shipX + container.length; containerX++) {
                        if (placedContainers[containerY][containerX] !== 'x') {
                            containerY = shipY + container.width;
                            containerX = shipX + container.length;
                            console.log('oj');
                        }
                        if ((container.length == (containerX - shipX + 1)) && (container.width == (containerY - shipY + 1))) {
                            // console.log(container.length, containerX, shipX, container.Y, shipY)
                            var filledArray = fillArray(placedContainers, shipY, shipX, container);
                            return { placedContainers: filledArray, valid: true };
                        }
                    }
                }
            }
        }
    }
    return { valid: false };
}
function fillArray(array, x, y, container) {
    console.log(container, x, y);
    for (var i = x; i < container.width + x; i++)
        for (var j = y; j < container.length + y; j++)
            array[i][j] = container.id;
    return array;
}
var sortedContainers = mock_1.containers
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
// let result = checkPlace(sortedContainers[0], placedContainers);
// if(result.valid) placedContainers = result.placedContainers;
// result = checkPlace(sortedContainers[1], placedContainers);
// if(result.valid) placedContainers = result.placedContainers;
// result = checkPlace(sortedContainers[2], placedContainers);
// if(result.valid) placedContainers = result.placedContainers;
sortedContainers.forEach(function (el) {
    var result = checkPlace(el, placedContainers);
    if (result.valid)
        placedContainers = result.placedContainers;
});
var table = cTable.getTable(placedContainers);
console.table(placedContainers);
console.log(sortedContainers);
