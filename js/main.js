"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("./helpers");
const txtParser_1 = require("./txtParser");
const service_1 = require("./service");
const mock_1 = require("./mock/mock");
const serviceNaive_1 = require("./serviceNaive");
const serviceHalfBrutal_1 = require("./serviceHalfBrutal");
//reading data from file
const data = helpers_1.readFromFile("../generated-data-txt.txt");
//validate and parse to json
const parsedData = txtParser_1.parseTxt(data);
//optimize cord algorithm
const serviceCoord = new service_1.CoordMethodService([mock_1.ships[0], mock_1.ships[1], mock_1.ships[2]], [...parsedData]);
const serviceNaive = new serviceNaive_1.NaiveService([mock_1.ships[0], mock_1.ships[1], mock_1.ships[2]], [...parsedData]);
const serviceHalfBrutal = new serviceHalfBrutal_1.HalfBrutalService([mock_1.ships[0], mock_1.ships[1], mock_1.ships[2]], [...parsedData]);
console.time('Coord');
serviceCoord.optimize();
console.timeEnd('Coord');
console.time('Naive');
serviceNaive.optimize();
console.timeEnd('Naive');
console.time('HalfBrutal');
serviceHalfBrutal.optimize();
console.timeEnd('HalfBrutal');
const report = {
    coord: serviceCoord.report,
    naive: serviceNaive.report,
    halfBrutal: serviceHalfBrutal.report
};
helpers_1.saveToFile(JSON.stringify(report, null, 1), '../raport.json');
