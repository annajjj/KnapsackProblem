import { containers, ship } from "./mock/mock";
import { generatedContainers } from "./mock/generated-data";
import * as cTable from 'console.table';
import { Warehouse } from "./naive";

class WarehouseExtended extends Warehouse {
    //sort containers by timestamp and area
    sortContainers(containers) {
        this.sortedContainers = containers
            .sort((a, b) => {
                if (a.timestamp > b.timestamp) return 1;
                else if (a.timestamp < b.timestamp) return -1;
                else return (a.width * a.length < b.width * b.length) ? 1 : -1;
            })
    }

    //check space with checkSpaceXY funtion if fails rotate container, if fails2 check other floor
    checkSpace(container) {
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

export function halfBrutal(ship, containers) {
    const warehouse = new WarehouseExtended(ship.id, ship.width, ship.length, ship.width, containers);
    warehouse.placeContainers();
    warehouse.showResults();
}

halfBrutal(ship, generatedContainers);