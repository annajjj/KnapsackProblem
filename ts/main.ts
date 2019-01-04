import { readFromFile } from "./helpers";
import { parseTxt } from "./txtParser";

//reading data from file
const data = readFromFile("../generated-data-txt.txt");

//validate and parse to json
const parsedData = parseTxt(data);

console.log(parsedData)
