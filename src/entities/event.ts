import { EventType } from "../enums/eventType";
import { Coordinates } from "../entities/coordinates"

export class Event {
    _id: string;
    name: string;
    description: string;
    barId: string;
    eventType: EventType;
    barName: string;
    barAddress: string;
    coordinates: Coordinates;
    date: string;
    distance: string;
}