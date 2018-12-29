import { containers, ship } from "./mock";
import * as cTable from 'console.table';


const sortedContainers = containers
    .sort((a,b) => {
        if(a.timestamp > b.timestamp) return 1;
        else if( a.timestamp <b.timestamp ) return -1;
        else return (a.width * a.length < b.width * b.length) ? 1 : -1;
    })

// console.log(sortedContainers)

let placedContainers = new Array(ship.length);

for (let i= 0 ; i< ship.length; i++)
{
    placedContainers[i] = new Array(ship.width);
    for(let j=0; j< ship.width; j++)
    placedContainers[i][j] = 'x';
}

//console.log("placed", placedContainers[0])
//  let x = [[]];
//  x[0] = [2,1,4];
//  x[1] = [3,5,5]
// console.log(x[1][1])

// console.log(placedContainers[0][1])

if(ship.length >= sortedContainers[0].length){
    if(ship.width >= sortedContainers[0].width){
        for(let i=0; i<sortedContainers[0].length; i++)
            for(let j=0; j<sortedContainers[0].width; j++)
            placedContainers[i][j] = sortedContainers[0].id;
    }
}



const table = cTable.getTable(placedContainers);
console.table(placedContainers);

