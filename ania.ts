import { containers, ship } from "./mock/mock";
import { generatedContainers } from "./mock/generated-data";
import * as cTable from 'console.table';

let notPlacedContainers = [];

function checkSpace(container, placedContainers) {
    let result = checkSpaceXY(container, placedContainers, 'normal');
    if (!result.valid) result = checkSpaceXY(container, placedContainers, 'rotated');
    if (!result.valid) notPlacedContainers.push(container);
}

function checkSpaceXY(container, placedContainers, type: 'normal' | 'rotated') {
    if (type == 'rotated') [container.width, container.length] = [container.length, container.width];
    for (let shipX = 0; shipX < ship.length; shipX++) {
        for (let shipY = 0; shipY < ship.width; shipY++) {
            if (placedContainers[shipX][shipY] === 'x') {
                for (let containerX = shipX; ((containerX < shipX + container.length) && (shipX + container.length < ship.length + 1)); containerX++) {
                    for (let containerY = shipY; ((containerY < shipY + container.width) && (shipY + container.width < ship.width + 1)); containerY++) {
                        if (placedContainers[containerX][containerY] !== 'x') {
                            containerX = shipX + container.length;
                            containerY = shipY + container.width;
                        }
                        if ((container.length == (containerX - shipX + 1)) && (container.width == (containerY - shipY + 1))) {
                            fillArray(shipX, shipY, container)
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
    for (let i = x; i < container.length + x; i++)
        for (let j = y; j < container.width + y; j++)
            placedContainers[i][j] = container.id;
}

const sortedContainers = generatedContainers
    .sort((a, b) => {
        if (a.timestamp > b.timestamp) return 1;
        else if (a.timestamp < b.timestamp) return -1;
        else return (a.width * a.length < b.width * b.length) ? 1 : -1;
    })


let placedContainers = new Array(ship.length);

for (let i = 0; i < ship.length; i++) {
    placedContainers[i] = new Array(ship.width);
    for (let j = 0; j < ship.width; j++)
        placedContainers[i][j] = 'x';
}

sortedContainers.forEach(el => checkSpace(el, placedContainers));

let table = cTable.getTable(placedContainers);

console.table(placedContainers);

console.log(notPlacedContainers)