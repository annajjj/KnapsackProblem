"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("./helpers");
const txtParser_1 = require("./txtParser");
//reading data from file
const data = helpers_1.readFromFile("../generated-data-txt.txt");
//validate and parse to json
const parsedData = txtParser_1.parseTxt(data);
console.log(parsedData);
