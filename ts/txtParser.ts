
//bug dont parse anything
//bug resolve: let splittedByEnter = data.split('\n'); insted of /\r\n/
export function parseTxt(data){
    //split data by enter key
    let splittedByEnter = data.split('\n');

    //split each line by space key
    let splittedBySpace = [] ;
    splittedByEnter.forEach((el,i) => splittedBySpace.push(el.split(",")));
    //validate line and push if valid
    let validatedData = [];
    splittedBySpace.forEach(el => {
        if(validateLine(el)){
            const element = {
                id: el[0],
                width: +el[1],
                height: +el[2],
                length: +el[3]
            }
            if(el[0].includes('c')) element['timestamp'] = +el[4];
            validatedData.push(element)
        }
    });

    return validatedData;
}

function validateLine(data){
    //get type of data (ship or container)
    const type = data[0][0];

    //check if id is correct
    if(type!=="c" && type!=="s") return 0;

    //check if width, height and length are int[1..40] for containers and int[50..100] for ships
    for(let i=1; i<4; i++){
        if(Number.isInteger(+data[i])) {
            if(data[i] < itemsDimensions[type].min || data[i] > itemsDimensions[type].max) return 0;
        }
        else return 0;
    }

    //check if timestamp is integer
    if(!Number.isInteger(+data[4])) return 0

    return 1;
}

//min & max dimensions for c-containers & s-ships
const itemsDimensions = {
    c: {
        min: 1,
        max: 40
    },
    s: {
        min: 50,
        max: 100
    }
}