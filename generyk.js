"use strict";
exports.__esModule = true;
var mock_1 = require("./mock/mock");
var generated_data_1 = require("./mock/generated-data");
var notPlacedContainers = [];
var placedContainers = {};
var floors = Math.floor(mock_1.ship.height / generated_data_1.generatedContainers[0].height);
for (var floor = 0; floor < floors; floor++) {
    placedContainers["floor" + floor] = new Array(mock_1.ship.length);
    for (var i = 0; i < mock_1.ship.length; i++) {
        placedContainers["floor" + floor][i] = new Array(mock_1.ship.width);
        for (var j = 0; j < mock_1.ship.width; j++)
            placedContainers["floor" + floor][i][j] = 'x';
    }
}
var containerTest = [{
        id: 'c1',
        width: 10,
        length: 10,
        height: 30,
        timestamp: 1
    },
    {
        id: 'c2',
        width: 5,
        length: 5,
        height: 30,
        timestamp: 1
    },
    {
        id: 'c3',
        width: 5,
        length: 15,
        height: 30,
        timestamp: 1
    },
    {
        id: 'c4',
        width: 10,
        length: 15,
        height: 30,
        timestamp: 1
    },
];
var Coord = /** @class */ (function () {
    function Coord(x, y) {
        this.x = x;
        this.y = y;
    }
    return Coord;
}());
var FreeSpace = /** @class */ (function () {
    function FreeSpace(x, y, width, length) {
        this.pivot = new Coord(x, y);
        this.size = { width: width, length: length };
    }
    return FreeSpace;
}());
var Warehouse = /** @class */ (function () {
    function Warehouse(w, l) {
        this.elements = [];
        this.space = [new FreeSpace(0, 0, w, l)];
    }
    Warehouse.prototype.store = function (container) {
        var freeSpace;
        for (var _i = 0, _a = this.space; _i < _a.length; _i++) {
            var space = _a[_i];
            if (space.size.width >= container.width && space.size.length >= container.length) {
                freeSpace = space;
                break;
            }
        }
        if (freeSpace) {
            // add container
            this.elements.push({ element: container, pivot: freeSpace.pivot });
            // bigger on right
            if (freeSpace.size.width - container.width) {
                this.space.push(new FreeSpace(freeSpace.pivot.x + container.width, freeSpace.pivot.y, freeSpace.size.width - container.width, freeSpace.size.length));
            }
            //smaller below
            if (freeSpace.size.length - container.length) {
                this.space.push(new FreeSpace(freeSpace.pivot.x, freeSpace.pivot.y + container.length, container.width, freeSpace.size.length - container.length));
            }
            // plain remove
            var i = this.space.findIndex(function (el) { return el === freeSpace; });
            this.space.splice(i, 1);
            console.log(i);
            console.log(this.space);
            console.log(this.elements);
            console.log();
            console.log('________________________');
            console.log();
        }
    };
    return Warehouse;
}());
var warehouse = new Warehouse(25, 30);
containerTest.forEach(function (el) { return warehouse.store(el); });
/**
     * 25x30
     * czy mozna 10x10, tak mozna
     * referencje do obiektu i zapisanie że jest na pozycji (0,0)
     * 15x30, 10x20 - 25x20, 10x15
     */
//     console.log('floor0')
// let table = cTable.getTable(placedContainers["floor0"]);
// console.table(placedContainers["floor0"]);
// console.log('floor1')
// table = cTable.getTable(placedContainers["floor1"]);
// console.table(placedContainers["floor1"]);
// console.log('floor2')
// table = cTable.getTable(placedContainers["floor2"]);
// console.table(placedContainers["floor2"]);
// console.log("notPlaced", notPlacedContainers);
