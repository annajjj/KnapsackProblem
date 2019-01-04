import { FreeSpace } from './classes/classes';
import { Container, Ship } from './interfaces/a';
import { ships } from './mock/mock';
import { Warehouse } from './coordMethod';
import { parseTxt } from './txtParser';
import { readFromFile, saveToFile } from './helpers';

console.log('lol')

class CoordMethodService {
    warehouses = [];
    report = [];
    // data = []
    constructor(ships: [Ship, Ship, Ship], public data: (Container | Ship)[]) {
        ships.forEach(ship => this.warehouses.push(new Warehouse(ship)));
        // let i = 0;
        // while(data.length){
        //     if(data[0].id.includes('c')) {
        //         //push first element
        //         this.data[i].push(data.shift())
        //         //push elements while the same timestamp
        //         while( data[0].id.includes('c') && this.data[i][this.data.length-1].timestamp === (data[0] as Container).timestamp){
        //             this.data[i].push(data.shift());
        //         }
        //         console.log(this.data)
        //     }
        // }
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
                    containers = this.makeContainerChunk()
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
                this.warehouses.shift();
                this.warehouses.push(new Warehouse(ships.shift()))
            }

            containers.sort((a, b) => {
            /*if (a.timestamp > b.timestamp) return 1;
            else if (a.timestamp < b.timestamp) return -1;
            else*/ return (a.width * a.length < b.width * b.length) ? 1 : -1;
            })
            const reports = [];


            this.warehouses.forEach((warehouse, i) => {
                for (const container of containers) {
                    //place or return object to notPlacedContainers
                    if (!warehouse.store(container)) notPlacedContainers[i].push(container);
                }
                if(notPlacedContainers[0].length || notPlacedContainers[1].length  || notPlacedContainers[2].length ) {
                    reports.push({
                        id: warehouse.ship.id,
                        width: warehouse.ship.width,
                        length: warehouse.ship.length,
                        height: warehouse.ship.height,
                        containers: warehouse.elements,
                        freeSpace: warehouse.countFreeSpace(),
                        send: false
                    })
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
                this.warehouses.forEach(warehouse => this.warehouses.push(new Warehouse(this.warehouses.shift().ship)))
            }
        }
    }

}

const data = parseTxt(readFromFile('../generated-data-txt.txt'))

const service = new CoordMethodService([ships[0], ships[1], ships[2]], data);
service.optimize();
// console.log(JSON.stringify(service.report, null, 1))

saveToFile(JSON.stringify(service.report, null, 1), '../raport.json');






