import { WarehouseElement } from './interfaces/a.d';
import { ships } from "./mock/mock";
import { generatedContainers } from "./mock/generated-data";
import * as cTable from 'console.table';
import { parseTxt } from "./txtParser";
import { readFromFile } from "./helpers";
import { Ship } from "./interfaces/a";

export class Warehouse {
    ship: Ship;
    sortedContainers = [];
    freeSpace: number;
    floors: number;
    shipSpaceMap = {};
    notPlacedContainers = [];
    elements: Array<WarehouseElement[]> = [];

    constructor(ship, containersHeight, containers) {
        this.ship = ship;
        this.floors = Math.floor(ship.height / containersHeight);
        this.createShipSpaceMap();
        this.createCordsMap();
        this.sortContainers(containers);
    }

    //create ship space map 
    createShipSpaceMap() {
        for (let floor = 0; floor < this.floors; floor++) {
            this.shipSpaceMap[floor] = new Array(this.ship.length);
            for (let i = 0; i < this.ship.length; i++) {
                this.shipSpaceMap[floor][i] = new Array(this.ship.width);
                for (let j = 0; j <  this.ship.width; j++)
                    this.shipSpaceMap[floor][i][j] = 'x';
            }
        }
    }

    //create coords map
    createCordsMap() {
        for (let floor = 0; floor < this.floors; floor++) {
                this.elements[floor] = new Array();
            }
    }

    //sort containers by timestamp
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
        for (let shipX = 0; shipX <  this.ship.length; shipX++) {
            for (let shipY = 0; shipY <  this.ship.width; shipY++) {
                if (this.shipSpaceMap[floor][shipX][shipY] === 'x') {
                    let checkFloorUnder = 0;
                    for (let containerX = shipX; ((containerX < shipX + container.length) && (shipX + container.length < this.ship.length + 1)); containerX++) {
                        for (let containerY = shipY; ((containerY < shipY + container.width) && (shipY + container.width < this.ship.width + 1)); containerY++) {
                            if (this.shipSpaceMap[floor][containerX][containerY] !== 'x') {
                                containerX = shipX + container.length;
                                containerY = shipY + container.width;
                                break;
                            }

                            if (floor > 0)
                                if (this.shipSpaceMap[floor-1][containerX][containerY] !== 'x')
                                    checkFloorUnder++;

                            if ((container.length == (containerX - shipX + 1)) && (container.width == (containerY - shipY + 1))) {
                                if (floor > 0 && checkFloorUnder < (container.length * container.width / 2)) {
                                    containerX = shipX + container.length;
                                    containerY = shipY + container.width;
                                    break;
                                }
                                this.elements[floor].push({element: container, pivot: {x: shipX, y: shipY}});
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
                this.shipSpaceMap[floor][i][j] = container.id;
    }

    //count in % how much free space is after placemant of containers
    countFreeSpace() {
        let freeSpace = 0;
        for (let floor = 0; floor < this.floors; floor++) {
            for (let i = 0; i <  this.ship.length; i++) {
                for (let j = 0; j <  this.ship.width; j++) {
                    if (this.shipSpaceMap[floor][i][j] == "x")
                        freeSpace++;
                }
            }
        }
        this.freeSpace = freeSpace / (this.ship.width *  this.ship.length * this.floors);
    }

    //show results - containers placed in ship, not placed containers and % free space
    showResults() {
        let table;
        for (let floor = 0; floor < this.floors; floor++) {
            console.log(floor)
            table = cTable.getTable(this.shipSpaceMap[floor]);
            console.table(this.shipSpaceMap[floor]);
        }
        this.countFreeSpace();
        console.log("not placed containers: ", this.notPlacedContainers);
        console.log("free space: ", this.freeSpace);
    }

}

// export function naive(ship, containers) {
//     const data = parseTxt(readFromFile('../generated-data-txt.txt'))

//     const warehouse = new Warehouse(ship,20, data);
//     warehouse.placeContainers();
//     warehouse.countFreeSpace();
//     warehouse.showResults();

//     console.log(warehouse.elements);
// }

// naive(ships[0], generatedContainers);