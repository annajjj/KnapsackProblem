const fs = require('fs');
function createRandomData(numberOfSamples) {
    let mockData = [];
    for (let i = 0; i < numberOfSamples; i++) {
        mockData.push({
            id: 'c' + i,
            width: Math.ceil(Math.random() * 10),
            length: Math.ceil(Math.random() * 10),
            height: 20,
            timestamp: Math.ceil(Math.random() * 5),
        });
    }
    return mockData;
}
function saveDataToFile(data) {
    fs.writeFile('./generated-data.ts', data, function (err) {
        if (err) {
            return console.error(err);
        }
        console.log("Mock data generated");
    });
}
function generateMockData(numberOfSamples) {
    const mockData = createRandomData(numberOfSamples);
    saveDataToFile("export const generatedContainers =" + JSON.stringify(mockData));
}
generateMockData(100);
