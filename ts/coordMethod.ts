import { containers, ship } from "./mock/mock";
import { generatedContainers } from "./mock/generated-data";
import * as cTable from 'console.table';
import { number } from "easy-table";
import { FreeSpace } from "./classes/classes"
import { Container, FreeSpacePointer, WarehouseElement, Ship } from "./interfaces/a";


// let notPlacedContainers = [];
// let placedContainers = {};
// let floors = Math.floor(ship.height / generatedContainers[0].height);


// for (let floor = 0; floor < floors; floor++) {
//     placedContainers[`floor` + floor] = new Array(ship.length);
//     for (let i = 0; i < ship.length; i++) {
//         placedContainers[`floor` + floor][i] = new Array(ship.width);
//         for (let j = 0; j < ship.width; j++)
//             placedContainers[`floor` + floor][i][j] = 'x';
//     }
// }

const containerTest: Container[] = [
    {
        id: 'c1',
        width: 10,
        length: 10,
        height: 30,
        timestamp: 1
    },
    {
        id: 'c2',
        width: 5,
        length: 5,
        height: 30,
        timestamp: 1
    },
    {
        id: 'c3',
        width: 5,
        length: 15,
        height: 30,
        timestamp: 1
    },
    {
        id: 'c4',
        width: 10,
        length: 15,
        height: 30,
        timestamp: 1
    },
    {
        id: 'c5',
        width: 15,
        length: 10,
        height: 30,
        timestamp: 1
    },

    {
        id: 'c6',
        width: 10,
        length: 10,
        height: 30,
        timestamp: 1
    },
    {
        id: 'c7',
        width: 5,
        length: 5,
        height: 30,
        timestamp: 1
    },
    {
        id: 'c8',
        width: 5,
        length: 15,
        height: 30,
        timestamp: 1
    },
    {
        id: 'c9',
        width: 10,
        length: 15,
        height: 30,
        timestamp: 1
    },
    {
        id: 'c10',
        width: 15,
        length: 10,
        height: 30,
        timestamp: 1
    },


    {
        id: 'c11',
        width: 10,
        length: 10,
        height: 30,
        timestamp: 1
    },
    {
        id: 'c12',
        width: 5,
        length: 5,
        height: 30,
        timestamp: 1
    },
    {
        id: 'c13',
        width: 5,
        length: 15,
        height: 30,
        timestamp: 1
    },
    {
        id: 'c14',
        width: 10,
        length: 15,
        height: 30,
        timestamp: 1
    },
    {
        id: 'c15',
        width: 15,
        length: 15,
        height: 30,
        timestamp: 1
    },
]

export class Warehouse {
    elements: Array<WarehouseElement[]> = [];
    floors: Array<FreeSpace[]> = [];
    private startingFloorSpace: number;
    constructor(public ship: Ship) {
        for (let i = 0; i < Math.floor(ship.height / generatedContainers[0].height); i++) {
            this.floors.push([new FreeSpace(0, 0, ship.width, ship.length)]);
            this.elements.push([]);
        };
        this.startingFloorSpace = ship.width * ship.length;
    }

    printElements() {
        let placedContainers = {};
        // 'x' matrix
        for (let floor = 0; floor < this.floors.length; floor++) {
            placedContainers[`floor` + floor] = new Array(ship.length);
            for (let i = 0; i < ship.length; i++) {
                placedContainers[`floor` + floor][i] = new Array(ship.width);
                for (let j = 0; j < ship.width; j++)
                    placedContainers[`floor` + floor][i][j] = 'x';
            }
        }

        for (let floor = 0; floor < this.floors.length; floor++) {
            this.elements[floor].forEach(el => {
                for(let x = el.pivot.x; x < el.pivot.x + el.element.width; x++){
                    for(let y = el.pivot.y; y < el.pivot.y + el.element.length; y++){
                        placedContainers[`floor${floor}`][y][x] = el.element.id;
                    }
                }
            })
        }
        return placedContainers

    }

    private findPlaceOnFloor(container, i) {
        let freeSpace: FreeSpacePointer;
        for (const space of this.floors[i]) {
            if (space.size.width >= container.width && space.size.length >= container.length) {
                freeSpace = { space, floor: i };
                break;
            }
        }
        return freeSpace;
    }

    private findPlace(container: Container): FreeSpacePointer | undefined {
        let freeSpace: FreeSpacePointer;
        for (let i = 0; i < this.floors.length; i++) {
            freeSpace = this.findPlaceOnFloor(container, i);
            // if not enough space, swap width and length
            if (!freeSpace) {
                this.elementSwap(container);
                freeSpace = this.findPlaceOnFloor(container, i);
            }
            // break external loop if free space was found
            if (freeSpace) break;
        }
        return freeSpace;
    }

    private elementSwap(container: Container) {
        [container.width, container.length] = [container.length, container.width]
    }

    countFreeSpace() {
        return this.floors.reduce((result, floor) => {
            let count = floor.reduce((count, space) => {
                return count + space.size.width * space.size.length;
            }, 0) / this.startingFloorSpace;
            console.log(count)
            return result + count;
        }, 0) / this.floors.length;
    }

    store(container: Container): boolean {
        let freeSpace = this.findPlace(container);
        // if not placed
        if(!freeSpace) return false;
        // if place was found
        else {
            // add container
            this.elements[freeSpace.floor].push({ element: container, pivot: freeSpace.space.pivot });

            // bigger on right
            if (freeSpace.space.size.width - container.width) {
                this.floors[freeSpace.floor].push(new FreeSpace(
                    freeSpace.space.pivot.x + container.width,
                    freeSpace.space.pivot.y,
                    freeSpace.space.size.width - container.width,
                    freeSpace.space.size.length
                ));
            }

            //smaller below
            if (freeSpace.space.size.length - container.length) {
                this.floors[freeSpace.floor].push(new FreeSpace(
                    freeSpace.space.pivot.x,
                    freeSpace.space.pivot.y + container.length,
                    container.width,
                    freeSpace.space.size.length - container.length
                ));
            }
            // plain remove
            const i = this.floors[freeSpace.floor].findIndex(el => el === freeSpace.space);
            this.floors[freeSpace.floor].splice(i, 1);
            // console.log(i)
            // console.log(this.floors)
            // console.log(this.elements);
            // console.log('\n________________________\n')
            return true;
        }
    }
}

const warehouse = new Warehouse(ship);



containerTest.forEach(el => warehouse.store(el))
console.log(warehouse.countFreeSpace());



console.log('\n________________________________________________________________\n')

const elements = warehouse.printElements()
for(let floor in elements){
    let table = cTable.getTable(elements[floor]);
    console.log(table)
}
/**
     * 25x30
     * czy mozna 10x10, tak mozna
     * referencje do obiektu i zapisanie że jest na pozycji (0,0)
     * 15x30, 10x20 - 25x20, 10x15
     */






//     console.log('floor0')
// let table = cTable.getTable(placedContainers["floor0"]);
// console.table(placedContainers["floor0"]);
// console.log('floor1')
// table = cTable.getTable(placedContainers["floor1"]);
// console.table(placedContainers["floor1"]);
// console.log('floor2')
// table = cTable.getTable(placedContainers["floor2"]);
// console.table(placedContainers["floor2"]);
// console.log("notPlaced", notPlacedContainers);

