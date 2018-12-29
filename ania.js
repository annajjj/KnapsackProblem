"use strict";
exports.__esModule = true;
var mock_1 = require("./mock");
var cTable = require("console.table");
var sortedContainers = mock_1.containers
    .sort(function (a, b) {
    if (a.timestamp > b.timestamp)
        return 1;
    else if (a.timestamp < b.timestamp)
        return -1;
    else
        return (a.width * a.length < b.width * b.length) ? 1 : -1;
});
// console.log(sortedContainers)
var placedContainers = new Array(mock_1.ship.length);
for (var i = 0; i < mock_1.ship.length; i++) {
    placedContainers[i] = new Array(mock_1.ship.width);
    for (var j = 0; j < mock_1.ship.width; j++)
        placedContainers[i][j] = 'x';
}
//console.log("placed", placedContainers[0])
//  let x = [[]];
//  x[0] = [2,1,4];
//  x[1] = [3,5,5]
// console.log(x[1][1])
// console.log(placedContainers[0][1])
if (mock_1.ship.length >= sortedContainers[0].length) {
    if (mock_1.ship.width >= sortedContainers[0].width) {
        for (var i = 0; i < sortedContainers[0].length; i++)
            for (var j = 0; j < sortedContainers[0].width; j++)
                placedContainers[i][j] = sortedContainers[0].id;
    }
}
var table = cTable.getTable(placedContainers);
console.table(placedContainers);
