import { containers, ship } from "./mock/mock";
import { generatedContainers } from "./mock/generated-data";
import * as cTable from 'console.table';

let notPlacedContainers = [];

function checkSpace(container) {
    let result = checkSpaceXY(container, 'floor0', 'normal');
    if (!result.valid) result = checkSpaceXY(container, 'floor0', 'rotated');
    if (!result.valid) notPlacedContainers.push(container);
}

function checkSpaceXY(container, floor, type: 'normal' | 'rotated') {
    if (type == 'rotated') [container.width, container.length] = [container.length, container.width];
    for (let shipX = 0; shipX < ship.length; shipX++) {
        for (let shipY = 0; shipY < ship.width; shipY++) {
            if (placedContainers[floor][shipX][shipY] === 'x') {
                for (let containerX = shipX; ((containerX < shipX + container.length) && (shipX + container.length < ship.length + 1)); containerX++) {
                    for (let containerY = shipY; ((containerY < shipY + container.width) && (shipY + container.width < ship.width + 1)); containerY++) {
                        if (placedContainers[floor][containerX][containerY] !== 'x') {
                            containerX = shipX + container.length;
                            containerY = shipY + container.width;
                        }
                        if ((container.length == (containerX - shipX + 1)) && (container.width == (containerY - shipY + 1))) {
                            fillArray(shipX, shipY, container, floor)
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
            placedContainers[floor][i][j] = container.id;
}

const sortedContainers = generatedContainers
    .sort((a, b) => {
        if (a.timestamp > b.timestamp) return 1;
        else if (a.timestamp < b.timestamp) return -1;
        else return (a.width * a.length < b.width * b.length) ? 1 : -1;
    })


let floors = Math.floor(ship.height/ generatedContainers[0].height);

let placedContainers = {};

for (let floor = 0; floor < floors; floor ++){
    placedContainers[`floor` + floor] = new Array(ship.length);
    for (let i = 0; i < ship.length; i++) {
        placedContainers[`floor` + floor][i] = new Array(ship.width);
        for (let j = 0; j < ship.width; j++)
            placedContainers[`floor` + floor][i][j] = 'x';
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

sortedContainers.forEach(el => checkSpace(el));

let table = cTable.getTable(placedContainers);

console.table(placedContainers);

console.log(notPlacedContainers)