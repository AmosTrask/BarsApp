import { Day } from "./day";
import { Product } from "./product";

export class Bar {
    _id: string;
    name: string;
    address: string;
    coordinates: {
        lat: number;
        lng: number;
    };
    menuProducts: Product[];
    hours: {
        day: Day;
        open: number;
        close: number;
    } [];
    rating: number;
}