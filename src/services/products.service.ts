import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {API_SERVER} from "../app/app.constants";
import {Observable} from "rxjs/Observable";
import { Product } from '../entities/product';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ProductService {

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<Product[]> {
    const url = `${API_SERVER.products}`;
    return this.http.get<Product[]>(url);
  }

  getProduct(id: string): Observable<Product> {
    const url = `${API_SERVER.products}/${id}`;
    return this.http.get<Product>(url)
  }
}
