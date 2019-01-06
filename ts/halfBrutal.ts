import { containers, ship, ships } from "./mock/mock";
import { generatedContainers } from "./mock/generated-data";
import * as cTable from 'console.table';
import { Warehouse } from "./naive";

export class WarehouseExtended extends Warehouse {
    //sort containers by timestamp and area
    sortContainers(containers) {
        this.sortedContainers = containers
            .sort((a, b) => (a.width * a.length < b.width * b.length) ? 1 : -1)
    }

    //check space with checkSpaceXY funtion if fails rotate container, if fails2 check other floor
    checkSpace(cnt) {
        const container = {...cnt}
        let result;
        for (let floor = 0; floor < this.floors; floor++) {
            result = this.checkSpaceXY(container, floor);
            if (!result.valid) {
                [container.width, container.length] = [container.length, container.width];
                result = this.checkSpaceXY(container, floor);
            }
            if (result.valid) break;
        }
        if (!result.valid) this.notPlacedContainers.push(container); //dla developementu
    }
}

// export function halfBrutal(ship, containers) {
//     const warehouse = new WarehouseExtended(ship, 20,containers);
//     warehouse.placeContainers();
//     warehouse.showResults();
//     // console.log(JSON.stringify(warehouse.cords["floor0"], null, 3));
// }

// halfBrutal(ship, generatedContainers);


// const data = [{ id: 'c0', width: 11, height: 18, length: 13, timestamp: 0 },
// { id: 'c1', width: 3, height: 18, length: 36, timestamp: 0 },
// { id: 'c2', width: 29, height: 18, length: 25, timestamp: 0 },
// { id: 'c3', width: 28, height: 18, length: 17, timestamp: 0 },
// { id: 'c4', width: 16, height: 18, length: 25, timestamp: 0 },
// { id: 'c6', width: 11, height: 18, length: 36, timestamp: 0 },
// { id: 'c7', width: 40, height: 18, length: 38, timestamp: 0 },
// { id: 'c8', width: 22, height: 18, length: 3, timestamp: 0 },
// { id: 'c9', width: 2, height: 18, length: 38, timestamp: 0 },
// { id: 'c10', width: 2, height: 18, length: 11, timestamp: 0 },
// { id: 'c11', width: 20, height: 18, length: 16, timestamp: 0 },
// { id: 'c12', width: 15, height: 18, length: 25, timestamp: 0 },
// { id: 'c14', width: 33, height: 18, length: 34, timestamp: 0 },
// { id: 'c15', width: 10, height: 18, length: 5, timestamp: 0 },
// { id: 'c16', width: 36, height: 18, length: 7, timestamp: 0 },
// { id: 'c17', width: 4, height: 18, length: 6, timestamp: 0 },
// { id: 'c18', width: 25, height: 18, length: 19, timestamp: 0 },
// { id: 'c19', width: 14, height: 18, length: 29, timestamp: 0 }]


//     const warehouse = new WarehouseExtended(ships[1],18, data);
//     warehouse.placeContainers();
//     warehouse.countFreeSpace();
    // warehouse.showResults();
    // console.log(JSON.stringify(warehouse.elements, null,3));