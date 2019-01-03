

export class Coord { 
    constructor(public x: number, public y: number) { } 
}

export class FreeSpace {
    pivot: Coord;
    size: { width: number, length: number };
    constructor(x: number, y: number, width: number, length: number) {
        this.pivot = new Coord(x, y);
        this.size = { width, length };
    }
}