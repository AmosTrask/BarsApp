import { Day } from "./day";

export class Bar {
    name: string;
    adress: string;
    lat: number;
    lng: number;
    hours: {
        day: Day;
        open: number;
        close: number;
    } []
}