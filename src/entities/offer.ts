import { ProductType } from "../enums/productType";
import { Product } from "./product";
import { Coordinates } from "./coordinates";

export class Offer {
    _id: string;
    name: string;
    description: string;
    price: number;
    barId: string;
    productType: ProductType;
    products: Product[];
    barName: string;
    barAddress: string;
    coordinates: Coordinates;
    distance: string;
}