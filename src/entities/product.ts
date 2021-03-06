import { ProductType } from "../enums/productType";

export class Product {
    _id: string;
    name: string;
    productType: ProductType;
    price: number;
    rating: number;
}