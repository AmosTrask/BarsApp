import { ProductType } from "../enums/productType";
import { Product } from "./product";

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
}