import { WarehouseElement } from './a.d';
import { Warehouse } from './../naive';
import { FreeSpace, Coord } from "../classes/classes";

export interface Container {
    id: string;
    width: number;
    length: number;
    height: number;
    timestamp: number;
}


export interface Ship{
    id: string,
    width: number,
    length: number,
    height: number
}


export interface FreeSpacePointer{ 
    space: FreeSpace, 
    floor:number
}

export interface WarehouseElement { element: Container, pivot: Coord }



