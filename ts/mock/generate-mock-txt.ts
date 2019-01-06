import { saveToFile } from "../helpers";

function createRandomDataTxt(numberOfSamples: number) {
    // mockData will contains invalid results
    let mockData = '';
    
    //const containers height
    const height = Math.ceil(Math.random()*40);
    
    //3 ships at begining
    for(let i = 0; i < 3; i++) {
        mockData+= `s${i}, ${Math.ceil(Math.random()*50 + 50)}, ${Math.ceil(Math.random()*50 + 50)},  ${Math.ceil(Math.random()*50 + 50)}\n`;
    }

    //some containers
    for(let i = 3; i < Math.ceil(numberOfSamples/2); i++) {
        mockData+= `c${i}, ${Math.ceil(Math.random()*45 - 5)}, ${height},  ${Math.ceil(Math.random()*45 - 5)}, ${Math.floor(i/20)}\n`;
    }

    //ship
    mockData+=`s${4}, ${Math.ceil(Math.random()*50+50)}, ${Math.ceil(Math.random()*50+50)},  ${Math.ceil(Math.random()*50+50)}\n`;
    
    //containers
    for(let i =  Math.ceil(numberOfSamples/2); i <  Math.ceil(numberOfSamples/2 + numberOfSamples/3); i++) {
        mockData+= `c${i}, ${Math.ceil(Math.random()*45 - 5)}, ${height},  ${Math.ceil(Math.random()*45 - 5)}, ${Math.floor(i/20)}\n`;
    }
    
    //ship
    mockData+=`s${5}, ${Math.ceil(Math.random()*50+50)}, ${Math.ceil(Math.random()*50+50)},  ${Math.ceil(Math.random()*50+50)}\n`;
    
    //containers generated without length - should dont be returned by parser
    for(let i =  Math.ceil(numberOfSamples/2+numberOfSamples/3); i <  Math.ceil(numberOfSamples/2 + numberOfSamples/3 + numberOfSamples/6 - 3); i++) {
        mockData+= `c${i}, ${Math.ceil(Math.random()*45 - 5)}, ${height},  ${Math.floor(i/20)}\n`;
    }
    return mockData;
}

function generateMockData(numberOfSamples: number){
    const mockData = createRandomDataTxt(numberOfSamples); 
    saveToFile(mockData, './../generated-data-txt.txt');
}

generateMockData(200);
