import { FreeSpace } from './classes/classes';
import { Container, Ship } from './interfaces/a';
import { ships, containers } from './mock/mock';
import { parseTxt } from './txtParser';
import { readFromFile, saveToFile } from './helpers';
import { Warehouse } from './naive';

export class NaiveService {
    ships = [];
    report = [];
    containersHeight: number;
    // data = []
    debugger = 1;
    constructor(ships: [Ship, Ship, Ship], public data: (Container | Ship)[]) {
        //bug jeżeli w pliku będzie pierwszy statek to się wywali
        this.containersHeight = data[0].height;
        ships.forEach(ship => this.ships.push(ship));
    }

    private makeContainerChunk() {
        let containers = [];
        containers.push(this.data.shift())
        //push elements while the same timestamp
        while (this.data.length && this.data[0].id.includes('c') && containers[containers.length - 1].timestamp === (this.data[0] as Container).timestamp) {
            containers.push(this.data.shift());
        }
        return containers;
    }

    optimize() {
        let notPlacedContainers = [[], [], []];
        let containers = []
        let ships = [];
        let lastShip = 0;

        //if not placed cos mają 
            //if container
                //ładuj kontenery 
            //if ship
                //spakuj shipy do tmp, pobierz kontenery i wroc shipy unshiftem shipy                
        //if not placed nie maja nic
            //if container
                //ładuj kontenery
            //if ship
                //ładuj ship 

        while (this.data.length) {
            //if not placed cos mają
            if (notPlacedContainers[lastShip].length) {
                //if container
                if (this.data[0].id.includes('c')) {
                    //ładuj kontenery 
                    containers = [...notPlacedContainers[lastShip], ...this.makeContainerChunk()]
                }
                //if ship
                else if (this.data[0].id.includes('s')) {
                    //spakuj shipy do tmp, pobierz kontenery i wroc shipy unshiftem shipy   
                    let tmpShips = [];
                    while (this.data[0].id.includes('s')) {
                        tmpShips.push(this.data.shift())
                    }
                    containers = [...notPlacedContainers[lastShip], ...this.makeContainerChunk()]
                    tmpShips.forEach(ship => this.data.unshift(ship))
                }
                notPlacedContainers = [[], [], []];
            }
            //if not placed nie maja nic
            else {
                if (this.data[0].id.includes('c')) {
                    //ładuj kontenery 
                    containers = [...containers, ...this.makeContainerChunk()];
                }
                //if ship
                else if (this.data[0].id.includes('s')) {
                    //ładuj ship 
                    while (this.data[0].id.includes('s')) {
                        ships.push(this.data.shift())
                    }
                }
            }

            // ship change
            while(ships.length){
                this.ships.shift();
                this.ships.push(ships.shift())
            }

            const reports = [];


            this.ships.forEach((ship, i) => {
                const warehouse = new Warehouse(ship, this.containersHeight, containers);
                // for (const container of containers) {
                //     //place or return object to notPlacedContainers
                //     if (!warehouse.store(container)) notPlacedContainers[i].push(container);
                // }
                warehouse.placeContainers();
                notPlacedContainers[i] =  warehouse.notPlacedContainers;

                if(notPlacedContainers[0].length || notPlacedContainers[1].length  || notPlacedContainers[2].length ) {
                    warehouse.countFreeSpace();
                    reports.push({
                        id: warehouse.ship.id,
                        width: warehouse.ship.width,
                        length: warehouse.ship.length,
                        height: warehouse.ship.height,
                        containers: warehouse.elements,
                        freeSpace: warehouse.freeSpace,
                        send: false
                    })
                    // warehouse.showResults();
                    // if(this.debugger){
                    //     console.log(warehouse.elements)
                    //     this.debugger = 0;
                    // }
                }   
            })
            if(notPlacedContainers[0].length || notPlacedContainers[1].length  || notPlacedContainers[2].length ) {
                //best space alocating
                lastShip = reports.findIndex(report => report === reports.reduce((best, el) => {
                    return best.freeSpace < el.freeSpace ? best : el
                }, { freeSpace: 1 }));
                reports[lastShip].send = true;
                this.report.push(reports);
                //ship's warehouses reset
                // this.warehouses.forEach(warehouse => this.warehouses.push(new Warehouse(this.warehouses.shift().ship, this.containersHeight)))
            }
        }
    }

}

const data = parseTxt(readFromFile('../generated-data-txt.txt'))
const service = new NaiveService([ships[0], ships[1], ships[2]], data);
service.optimize();
// console.log(JSON.stringify(service.report, null, 1))
console.log(service.report.length)
saveToFile(JSON.stringify(service.report, null, 1), '../raport.json');






