import { Day } from "./day";

export class Bar {
    _id: number;
    name: string;
    address: string;
    coordinates: {
        lat: number;
        lng: number;
    }
    hours: {
        day: Day;
        open: number;
        close: number;
    } []
}