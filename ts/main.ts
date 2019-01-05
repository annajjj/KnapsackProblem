import { readFromFile, saveToFile } from "./helpers";
import { parseTxt } from "./txtParser";
import { CoordMethodService } from "./service";
import { ships } from './mock/mock';
import { NaiveService } from "./serviceNaive";
import { HalfBrutalService } from "./serviceHalfBrutal";

//reading data from file
const data = readFromFile("../generated-data-txt.txt");

//validate and parse to json
const parsedData = parseTxt(data);

//optimize cord algorithm
const serviceCoord = new CoordMethodService([ships[0], ships[1], ships[2]], [...parsedData]);
const serviceNaive = new NaiveService([ships[0], ships[1], ships[2]], [...parsedData]);
const serviceHalfBrutal = new HalfBrutalService([ships[0], ships[1], ships[2]], [...parsedData]);
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
}


saveToFile(JSON.stringify(report, null, 1), '../raport.json');







