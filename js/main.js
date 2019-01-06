"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("./helpers");
const txtParser_1 = require("./txtParser");
const service_1 = require("./service");
const serviceNaive_1 = require("./serviceNaive");
const serviceHalfBrutal_1 = require("./serviceHalfBrutal");
//reading data from file
const data = helpers_1.readFromFile("../generated-data-txt.txt");
//validate and parse to json
const parsedData = txtParser_1.parseTxt(data);
const report = {};
//optimize cord algorithm
const serviceCoord = new service_1.CoordMethodService([...parsedData]);
const serviceNaive = new serviceNaive_1.NaiveService([...parsedData]);
console.time('Coord');
serviceCoord.optimize();
console.timeEnd('Coord');
report['coord'] = JSON.stringify(serviceCoord.report, null, 3);
console.time('Naive');
serviceNaive.optimize();
console.timeEnd('Naive');
report['naive'] = JSON.stringify(serviceNaive.report, null, 3);
const serviceHalfBrutal = new serviceHalfBrutal_1.HalfBrutalService([...parsedData]);
console.time('HalfBrutal');
serviceHalfBrutal.optimize();
console.timeEnd('HalfBrutal');
report['halfBrutal'] = JSON.stringify(serviceHalfBrutal.report, null, 3);
// const report = {
//     coord: serviceCoord.report,
//     naive: serviceNaive.report,
//     halfBrutal: serviceHalfBrutal.report
// }
helpers_1.saveToFile(JSON.stringify(report, null, 1), '../raport.json');
