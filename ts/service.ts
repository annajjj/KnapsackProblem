import { FreeSpace } from './classes/classes';
import { Container, Ship } from './interfaces/a';
import { ships, containers } from './mock/mock';
import { Warehouse } from './coordMethod';
import { parseTxt } from './txtParser';
import { readFromFile, saveToFile } from './helpers';

export class CoordMethodService {
    warehouses = [];
    report: {count: number, date: Date, result: any[]} = {result: [], count: 0, date: new Date()};
    containersHeight: number;
    // data = []
    constructor(public data: (Container | Ship)[]) {
        //bug jeżeli w pliku będzie pierwszy statek to się wywali
        this.containersHeight = data[3].height;
        for(let i =0; i<3; i++) {
            this.warehouses.push(new Warehouse(this.data.shift(), this.containersHeight));
        }
        
        this.report.count = containers.reduce((result, el) => {
            if(el.id.includes('c')) return result + 1;
            else return result 
        },0)
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
        let lastShip = undefined;

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
            if (notPlacedContainers[lastShip] && notPlacedContainers[lastShip].length) {
                //if container
                if (this.data[0].id.includes('c')) {
                    //ładuj kontenery 
                    containers = [...notPlacedContainers[lastShip]]
                    notPlacedContainers = [[], [], []];
                }
                //if ship
                else if (this.data[0].id.includes('s')) {
                    //ładuj ship 
                    while (this.data.length && this.data[0].id.includes('s')) {
                        ships.push(this.data.shift())
                    }
                }
            }
            //if not placed nie maja nic
            else {
                if (this.data[0].id.includes('c')) {
                    //ładuj kontenery 
                    containers = this.makeContainerChunk()
                }
                //if ship
                else if (this.data[0].id.includes('s')) {
                    //spakuj shipy do tmp, pobierz kontenery i wroc shipy unshiftem shipy   
                    let tmpShips = [];
                    while (this.data.length && this.data[0].id.includes('s')) {
                        tmpShips.unshift(this.data.shift())
                    }
                    containers = this.makeContainerChunk()
                    tmpShips.forEach(ship => this.data.unshift(ship))
                }
                
            }

            // ship change
            while(ships.length){
                this.warehouses.shift();
                this.warehouses.push(new Warehouse(ships.shift(), this.containersHeight))
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

            })
            if(notPlacedContainers[0].length && notPlacedContainers[1].length  && notPlacedContainers[2].length ) {

                this.warehouses.forEach((warehouse, i) => {
                reports.push({
                    id: warehouse.ship.id,
                    width: warehouse.ship.width,
                    length: warehouse.ship.length,
                    height: warehouse.ship.height,
                    containers: warehouse.elements,
                    freeSpace: warehouse.countFreeSpace(),
                    send: false
                })
            })


                //best space alocating
                lastShip = reports.findIndex(report => report === reports.reduce((best, el) => {
                    return best.freeSpace < el.freeSpace ? best : el
                }, { freeSpace: 1 }));
                reports[lastShip].send = true;
                this.report.result.push(reports);
                //ship's warehouses reset
                this.warehouses.forEach(warehouse => this.warehouses.push(new Warehouse(this.warehouses.shift().ship, this.containersHeight)))
            } else lastShip = undefined;
        }
    }
}






// co z ostatnią iteracją, czy dane z notPlacedCOntainers przepadają





// const data = parseTxt(readFromFile('../generated-data-txt.txt'))

// const service = new CoordMethodService([ships[0], ships[1], ships[2]], data);
// service.optimize();
// // console.log(JSON.stringify(service.report, null, 1))
// console.log(service.report.result.length)
// saveToFile(JSON.stringify(service.report, null, 1), '../raport.json');






