import { FreeSpace } from './ts/classes/classes';
import { Container, Ship } from './ts/interfaces/a.d';
import { Warehouse } from './ts/coordMethod';



class CoordMethodService {
    ships: [Warehouse, Warehouse, Warehouse];
    report = [];
    constructor(ships: Ship[], public data: Array<(Container | Ship)[]>){
        ships.forEach(ship => this.ships.push(new Warehouse(ship)));
    }

    optimize() {
        let notPlacedContainers = [];
        let containers = []
        for(const chunk of this.data){
            // if ship
            if(chunk[0].id.includes('s')) {
                for(const ship of chunk){
                    this.ships.shift()
                    this.ships.push(new Warehouse(ship));
                }
            }
            //else chunk of containers
            else {
                // construction array for new itertion
                containers = [...notPlacedContainers ,...chunk];
                notPlacedContainers = [];
                const reports = [];
                for( const ship of this.ships){
                    for(const container of containers) {
                        //place or return object to notPlacedContainers
                        if(!ship.store(container)) notPlacedContainers.push(container);
                    }
                    reports.push({
                        id: ship.ship.id,
                        width: ship.ship.width,
                        length: ship.ship.length,
                        height: ship.ship.height,
                        containers: ship.elements, 
                        freeSpace: ship.countFreeSpace(),
                        send: false
                    })
                }
                //best space alocating
                reports.reduce((best, el)=>{
                    return  best.freeSpace < el.freeSpace ? best : el
                }, {freeSpace: 1}).send = true;
                this.report.push(reports);
            }
        }
    }


}



// let reports = [
//     [
//         {
//             id,
//             width,
//             length,
//             kontenery,
//             %,
//             send
//         },
//         {},
//         {}
//     ]
// ]


