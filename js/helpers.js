"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs');
function readFromFile(path) {
    return fs.readFileSync(path, 'utf8');
}
exports.readFromFile = readFromFile;
