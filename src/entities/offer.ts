import { OfferType } from "../enums/offerType";

export class Offer {
    _id: string;
    name: string;
    description: string;
    price: number;
    barId: string;
    offerType: OfferType;
    barName: string;
    barAddress: string;
}