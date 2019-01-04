import { saveToFile } from "../helpers";

function createRandomData(numberOfSamples: number) {
    let mockData = [];
    for(let i = 0; i < numberOfSamples; i++) {
        mockData.push({
            id: 'c' + i,
            width:  Math.ceil(Math.random()*10),
            length:  Math.ceil(Math.random()*10),
            height: 20,
            timestamp: Math.ceil(Math.random()*5),
        })

    }
    return mockData;
}



function generateMockData(numberOfSamples: number){
    const mockData = createRandomData(numberOfSamples); 
    saveToFile("export const generatedContainers =" + JSON.stringify(mockData), './generated-data.ts');
}

generateMockData(100);


