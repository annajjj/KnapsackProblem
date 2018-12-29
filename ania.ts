import { containers, ship } from "./mock";
import * as cTable from 'console.table';

function checkPlace(container, array){
    let placedContainers = new Array();
    placedContainers = JSON.parse(JSON.stringify(array));
    let result = checkFreePlace(container, placedContainers, 'normal');
    if(!result.valid) result = checkFreePlace(container, placedContainers, 'rotated');
    return result 
}

function checkFreePlace(container, array, type: 'normal' | 'rotated' ){
    let placedContainers = new Array();
    placedContainers = JSON.parse(JSON.stringify(array));

    if (type == 'rotated') [container.width, container.length] = [container.length, container.width]; 
    for(let shipY = 0; shipY < ship.width; shipY++){
        for (let shipX = 0; shipX <ship.length; shipX++){
            if(placedContainers[shipY][shipX]==='x'){
                console.log('s', shipY, shipX)
                for(let containerY=shipY; containerY < shipY + container.width; containerY++){
                    for(let containerX=shipX; containerX < shipX + container.length; containerX++){
                        if(placedContainers[containerY][containerX] !== 'x') {
                            containerY= shipY + container.width;
                            containerX= shipX + container.length;
                            console.log('oj')
                        }
                        if((container.length == (containerX - shipX + 1)) && (container.width == (containerY - shipY + 1)))
                        {
                            // console.log(container.length, containerX, shipX, container.Y, shipY)
                            const filledArray = fillArray(placedContainers, shipY, shipX, container)
                            return {placedContainers: filledArray, valid: true};
                        }
            }
        }
    }
    }
}
return {valid: false};

}

function fillArray(array, x, y, container){
    console.log(container, x, y)
    for(let i=x; i<container.width+x; i++)
        for(let j=y; j<container.length+y; j++)
            array[i][j] = container.id;
    
    return array;
}

const sortedContainers = containers
    .sort((a,b) => {
        if(a.timestamp > b.timestamp) return 1;
        else if( a.timestamp <b.timestamp ) return -1;
        else return (a.width * a.length < b.width * b.length) ? 1 : -1;
    })


let placedContainers = new Array(ship.length);

for (let i= 0 ; i< ship.length; i++)
{
    placedContainers[i] = new Array(ship.width);
    for(let j=0; j< ship.width; j++)
    placedContainers[i][j] = 'x';
}


// let result = checkPlace(sortedContainers[0], placedContainers);
// if(result.valid) placedContainers = result.placedContainers;

// result = checkPlace(sortedContainers[1], placedContainers);
// if(result.valid) placedContainers = result.placedContainers;


// result = checkPlace(sortedContainers[2], placedContainers);
// if(result.valid) placedContainers = result.placedContainers;

sortedContainers.forEach(el => {
    let result = checkPlace(el, placedContainers);
    if(result.valid) placedContainers = result.placedContainers;
})
let table = cTable.getTable(placedContainers);

console.table(placedContainers);

console.log(sortedContainers)