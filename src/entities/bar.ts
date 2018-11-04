import { Day } from "./day";

export class Bar {
    _id: string;
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