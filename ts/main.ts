import { readFromFile } from "./helpers";
import { parseTxt } from "./txtParser";
import { CoordMethodService } from "./service";
import { ships } from './mock/mock';

//reading data from file
const data = readFromFile("../generated-data-txt.txt");

//validate and parse to json
const parsedData = parseTxt(data);

//optimize cord algorithm
const service = new CoordMethodService([ships[0], ships[1], ships[2]], data);
service.optimize();


console.log(parsedData)