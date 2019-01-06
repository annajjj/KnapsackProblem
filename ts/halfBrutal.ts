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
        if (!result.valid) this.notPlacedContainers.push(container);
    }
}

// export function halfBrutal(ship, containers) {
//     const warehouse = new WarehouseExtended(ship, 20,containers);
//     warehouse.placeContainers();
//     warehouse.showResults();
// }

// halfBrutal(ship, generatedContainers);
