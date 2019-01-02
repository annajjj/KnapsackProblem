"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mock_1 = require("./mock/mock");
const generated_data_1 = require("./mock/generated-data");
const cTable = require("console.table");
function checkSpace(container) {
    let result;
    for (let floor = 0; floor < floors; floor++) {
        result = checkSpaceXY(container, floor);
        if (!result.valid)
            result = checkSpaceXY(container, floor, 'rotated');
        if (result.valid)
            break;
    }
    if (!result.valid)
        notPlacedContainers.push(container); //dla developementu
}
function checkSpaceXY(container, floor, type = 'normal') {
    if (type == 'rotated')
        [container.width, container.length] = [container.length, container.width];
    for (let shipX = 0; shipX < mock_1.ship.length; shipX++) {
        for (let shipY = 0; shipY < mock_1.ship.width; shipY++) {
            if (placedContainers[`floor${floor}`][shipX][shipY] === 'x') {
                let checkFloorUnder = 0;
                for (let containerX = shipX; ((containerX < shipX + container.length) && (shipX + container.length < mock_1.ship.length + 1)); containerX++) {
                    for (let containerY = shipY; ((containerY < shipY + container.width) && (shipY + container.width < mock_1.ship.width + 1)); containerY++) {
                        if (placedContainers[`floor${floor}`][containerX][containerY] !== 'x') {
                            containerX = shipX + container.length;
                            containerY = shipY + container.width;
                            break;
                        }
                        if (floor > 0)
                            if (placedContainers[`floor${floor - 1}`][containerX][containerY] !== 'x')
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
    for (let i = x; i < container.length + x; i++)
        for (let j = y; j < container.width + y; j++)
            placedContainers[`floor${floor}`][i][j] = container.id;
}
function countFreeSpace() {
    let freeSpace = 0;
    for (let floor = 0; floor < floors; floor++) {
        for (let i = 0; i < mock_1.ship.length; i++) {
            for (let j = 0; j < mock_1.ship.width; j++) {
                if (placedContainers[`floor${floor}`][i][j] == "x")
                    freeSpace++;
            }
        }
    }
    return freeSpace;
}
function showResults() {
    let table;
    for (let floor = 0; floor < floors; floor++) {
        console.log(`floor${floor}`);
        table = cTable.getTable(placedContainers[`floor${floor}`]);
        console.table(placedContainers[`floor${floor}`]);
    }
    console.log("not placed containers: ", notPlacedContainers);
}
const sortedContainers = generated_data_1.generatedContainers
    .sort((a, b) => {
    if (a.timestamp > b.timestamp)
        return 1;
    else if (a.timestamp < b.timestamp)
        return -1;
    else
        return (a.width * a.length < b.width * b.length) ? 1 : -1;
});
console.time('execution');
let floors = Math.floor(mock_1.ship.height / generated_data_1.generatedContainers[0].height);
let placedContainers = {};
let notPlacedContainers = [];
for (let floor = 0; floor < floors; floor++) {
    placedContainers[`floor${floor}`] = new Array(mock_1.ship.length);
    for (let i = 0; i < mock_1.ship.length; i++) {
        placedContainers[`floor${floor}`][i] = new Array(mock_1.ship.width);
        for (let j = 0; j < mock_1.ship.width; j++)
            placedContainers[`floor${floor}`][i][j] = 'x';
    }
}
sortedContainers.forEach(el => checkSpace(el));
// showResults();
// console.log(notPlacedContainers.length, countFreeSpace())
console.timeEnd('execution');
