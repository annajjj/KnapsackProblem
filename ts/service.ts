import { FreeSpace } from './classes/classes';
import { Container, Ship } from './interfaces/a';
import { containers, ships } from './mock/mock';
import { Warehouse } from './coordMethod';

console.log('lol')

class CoordMethodService {
    warehouses = [];
    report = [];
    constructor(ships: [Ship, Ship, Ship], public data: Array<(Container | Ship)[]>){
        ships.forEach(ship => this.warehouses.push(new Warehouse(ship)));
    }

    optimize() {
        let notPlacedContainers = [];
        let containers = []
        for(const chunk of this.data){
            // if ship
            if(chunk[0].id.includes('s')) {
                for(const ship of chunk){
                    this.warehouses.shift()
                    this.warehouses.push(new Warehouse(ship));
                }
            }
            //else chunk of containers
            else {
                // construction array for new itertion
                containers = [...notPlacedContainers ,...chunk];
                notPlacedContainers = [];
                //array sort by timestamp and size
                containers.sort((a, b) => {
                    if (a.timestamp > b.timestamp) return 1;
                    else if (a.timestamp < b.timestamp) return -1;
                    else return (a.width * a.length < b.width * b.length) ? 1 : -1;
                })
                const reports = [];
                for( const warehouse of this.warehouses){
                    for(const container of containers) {
                        //place or return object to notPlacedContainers
                        if(!warehouse.store(container)) notPlacedContainers.push(container);
                    }
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
                //best space alocating
                reports.reduce((best, el)=>{
                    return  best.freeSpace < el.freeSpace ? best : el
                }, {freeSpace: 1}).send = true;
                this.report.push(reports);
                //ship's warehouses reset
                this.warehouses.forEach(warehouse => this.warehouses.push(new Warehouse(this.warehouses.shift().ship)))
            }
        }
    }


}


const service = new CoordMethodService([ships[0], ships[1], ships[2]], [containers, containers]);
service.optimize();
console.log(JSON.stringify(service.report, null, 1))


const fs = require('fs');
fs.writeFile("raport.json", JSON.stringify(service.report, null, 1)); 


