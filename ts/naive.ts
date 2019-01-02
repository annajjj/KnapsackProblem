import { containers, ship } from "./mock/mock";
import { generatedContainers } from "./mock/generated-data";
import * as cTable from 'console.table';

export class Warehouse {
    id: string;
    width: number;
    length: number;
    height: number;
    sortedContainers = [];
    freeSpace: number;
    floors = Math.floor(ship.height / generatedContainers[0].height);
    shipSpaceMap = {};
    notPlacedContainers = [];
    cords = {};

    constructor(id, width, length, height, containers) {
        this.id = id;
        this.width = width;
        this.length = length;
        this.height = height;
        this.createShipSpaceMap();
        this.createCordsMap();
        this.sortContainers(containers);
    }

    //create ship space map - floor{i}: [[]]
    createShipSpaceMap() {
        for (let floor = 0; floor < this.floors; floor++) {
            this.shipSpaceMap[`floor${floor}`] = new Array(ship.length);
            for (let i = 0; i < ship.length; i++) {
                this.shipSpaceMap[`floor${floor}`][i] = new Array(ship.width);
                for (let j = 0; j < ship.width; j++)
                    this.shipSpaceMap[`floor${floor}`][i][j] = 'x';
            }
        }
    }

    createCordsMap() {
        for (let floor = 0; floor < this.floors; floor++) {
                this.cords[`floor${floor}`] = new Array();
            }
    }

    //sort containers by timestamp and area
    sortContainers(containers) {
        this.sortedContainers = containers
            .sort((a, b) => {
                if (a.timestamp > b.timestamp) return 1;
                else if (a.timestamp < b.timestamp) return -1;
            })
    }

    //for each container execute check space method
    placeContainers() {
        this.sortedContainers.forEach(el => this.checkSpace(el));
    }

    //check space with checkSpaceXY funtion if fails2 check other floor
    checkSpace(container) {
        let result;
        for (let floor = 0; floor < this.floors; floor++) {
            result = this.checkSpaceXY(container, floor);
            if (result.valid) break;
        }
        if (!result.valid) this.notPlacedContainers.push(container); //dla developementu
    }

    //check if container can be placed
    checkSpaceXY(container, floor) {
        for (let shipX = 0; shipX < ship.length; shipX++) {
            for (let shipY = 0; shipY < ship.width; shipY++) {
                if (this.shipSpaceMap[`floor${floor}`][shipX][shipY] === 'x') {
                    let checkFloorUnder = 0;
                    for (let containerX = shipX; ((containerX < shipX + container.length) && (shipX + container.length < ship.length + 1)); containerX++) {
                        for (let containerY = shipY; ((containerY < shipY + container.width) && (shipY + container.width < ship.width + 1)); containerY++) {
                            if (this.shipSpaceMap[`floor${floor}`][containerX][containerY] !== 'x') {
                                containerX = shipX + container.length;
                                containerY = shipY + container.width;
                                break;
                            }

                            if (floor > 0)
                                if (this.shipSpaceMap[`floor${floor - 1}`][containerX][containerY] !== 'x')
                                    checkFloorUnder++;

                            if ((container.length == (containerX - shipX + 1)) && (container.width == (containerY - shipY + 1))) {
                                if (floor > 0 && checkFloorUnder < (container.length * container.width / 2)) {
                                    containerX = shipX + container.length;
                                    containerY = shipY + container.width;
                                    break;
                                }
                                this.cords[`floor${floor}`].push({element: {id: container.id, width: container.width, length: container.length}, pivot: {x: shipX, y: shipY}});
                                this.fillShipSpaceMapWithContainer(shipX, shipY, container, floor)
                                return { valid: true };
                            }
                        }
                    }
                }
            }
        }
        return { valid: false };
    }

    //fill space map with container if it can be placed
    fillShipSpaceMapWithContainer(x, y, container, floor) {
        for (let i = x; i < container.length + x; i++)
            for (let j = y; j < container.width + y; j++)
                this.shipSpaceMap[`floor${floor}`][i][j] = container.id;
    }

    //count in % how much free space is after placemant of containers
    countFreeSpace() {
        let freeSpace = 0;
        for (let floor = 0; floor < this.floors; floor++) {
            for (let i = 0; i < ship.length; i++) {
                for (let j = 0; j < ship.width; j++) {
                    if (this.shipSpaceMap[`floor${floor}`][i][j] == "x")
                        freeSpace++;
                }
            }
        }
        this.freeSpace = freeSpace / (ship.width * ship.length * this.floors);
    }

    //show results - containers placed in ship, not placed containers and % free space
    showResults() {
        let table;
        for (let floor = 0; floor < this.floors; floor++) {
            console.log(`floor${floor}`)
            table = cTable.getTable(this.shipSpaceMap[`floor${floor}`]);
            console.table(this.shipSpaceMap[`floor${floor}`]);
        }
        this.countFreeSpace();
        console.log("not placed containers: ", this.notPlacedContainers);
        console.log("free space: ", this.freeSpace);
    }

}

export function naive(ship, containers) {
    const warehouse = new Warehouse(ship.id, ship.width, ship.length, ship.width, containers);
    warehouse.placeContainers();
    warehouse.showResults();
}

naive(ship, generatedContainers);