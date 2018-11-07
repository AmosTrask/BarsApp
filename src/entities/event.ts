import { EventType } from "../enums/eventType";

export class Event {
    _id: string;
    name: string;
    description: string;
    barId: string;
    eventType: EventType;
    barName: string;
    barAddress: string;
    date: Date;
}