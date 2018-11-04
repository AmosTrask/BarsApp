import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {API_SERVER} from "../app/app.constants";
import {Observable} from "rxjs/Observable";
import { Offer } from '../entities/offer';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class OffersService {

  constructor(private http: HttpClient) { }

  getAllOffers(): Observable<Offer[]> {
    const url = `${API_SERVER.offers}`;
    return this.http.get<Offer[]>(url);
  }

  getOffer(id: string): Observable<Offer> {
    const url = `${API_SERVER.offers}/${id}`;
    return this.http.get<Offer>(url)
  }
}
