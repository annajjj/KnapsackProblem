import { FreeSpace } from './classes/classes';
import { Container, Ship } from './interfaces/a';
import { ships, containers } from './mock/mock';
import { Warehouse } from './coordMethod';
import { parseTxt } from './txtParser';
import { readFromFile, saveToFile } from './helpers';

export class CoordMethodService {
    warehouses = [];
    report = [];
    containersHeight: number;
    // data = []
    debugger = 1;
    constructor(ships: [Ship, Ship, Ship], public data: (Container | Ship)[]) {
        //bug jeżeli w pliku będzie pierwszy statek to się wywali
        this.containersHeight = data[0].height;
        ships.forEach(ship => this.warehouses.push(new Warehouse(ship, this.containersHeight)));
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

        let validation = () => {
            if( (notPlacedContainers[0].length && notPlacedContainers[1].length  && notPlacedContainers[2].length) || 
            (!this.data.length || (notPlacedContainers[0].length || notPlacedContainers[1].length  || notPlacedContainers[2].length)) ) 
            return true;
            else return false;
        };
        
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

        //bug, referencja przy danych, pobiera je i nie wracają już nigdy 
        while (this.data.length || (notPlacedContainers[0].length || notPlacedContainers[1].length  || notPlacedContainers[2].length)) {
            console.log(validation())
            //if not placed cos mają
            if (validation() ) {
                //if container
                if (validation() || this.data[0].id.includes('c')) {
                    //ładuj kontenery 
                    containers = [...notPlacedContainers[lastShip]]
                }
                //if ship
                else {
                    //spakuj shipy do tmp, pobierz kontenery i wroc shipy unshiftem shipy   
                    let tmpShips = [];
                    while (this.data.length && this.data[0].id.includes('s')) {
                        tmpShips.unshift(this.data.shift())
                    }
                    if(this.data.length) {
                        containers = [...notPlacedContainers[lastShip], ...this.makeContainerChunk()]
                        tmpShips.forEach(ship => this.data.unshift(ship))
                    }
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
                    while (this.data.length && this.data[0].id.includes('s')) {
                        console.log(ships)
                        ships.push(this.data.shift())
                    }
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


            this.warehouses.forEach((warehouse, i) => {    
                if(validation() ) {
                reports.push({
                    id: warehouse.ship.id,
                    width: warehouse.ship.width,
                    length: warehouse.ship.length,
                    height: warehouse.ship.height,
                    containers: warehouse.elements,
                    freeSpace: warehouse.countFreeSpace(),
                    send: false
                })
            } })


            if(validation() ) {
                //best space alocating
                lastShip = reports.findIndex(report => report === reports.reduce((best, el) => {
                    return best.freeSpace < el.freeSpace ? best : el
                }, { freeSpace: 1 }));
                reports[lastShip].send = true;
                this.report.push(reports);
                //ship's warehouses reset
                this.warehouses.forEach(warehouse => this.warehouses.push(new Warehouse(this.warehouses.shift().ship, this.containersHeight)))
            }
        }
    }
}






// co z ostatnią iteracją, czy dane z notPlacedCOntainers przepadają





const data = parseTxt(readFromFile('../generated-data-txt.txt'))
// console.log(data)

const service = new CoordMethodService([ships[0], ships[1], ships[2]], data);
service.optimize();
// console.log(JSON.stringify(service.report, null, 1))
console.log(service.report.length)
saveToFile(JSON.stringify(service.report, null, 1), '../raport.json');






