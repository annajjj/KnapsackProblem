"use strict";
exports.__esModule = true;
var fs = require('fs');
function readFromFile(path) {
    return fs.readFileSync(path, 'utf8');
}
exports.readFromFile = readFromFile;
console.log(readFromFile('./data.txt'));
