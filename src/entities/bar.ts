import { Day } from "./day";
import { Product } from "./product";
import { Coordinates } from "./coordinates";

export class Bar {
    _id: string;
    name: string;
    address: string;
    coordinates: Coordinates;
    menuProducts: Product[];
    hours: {
        day: Day;
        open: number;
        close: number;
    } [];
    rating: number;
}