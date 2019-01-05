"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("./helpers");
const txtParser_1 = require("./txtParser");
const service_1 = require("./service");
const mock_1 = require("./mock/mock");
//reading data from file
const data = helpers_1.readFromFile("../generated-data-txt.txt");
//validate and parse to json
const parsedData = txtParser_1.parseTxt(data);
//optimize cord algorithm
const service = new service_1.CoordMethodService([mock_1.ships[0], mock_1.ships[1], mock_1.ships[2]], data);
service.optimize();
console.log(parsedData);
