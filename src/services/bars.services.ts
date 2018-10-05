import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {API_SERVER} from "../app/app.constants";
import {Observable} from "rxjs/Observable";
import { Bar } from '../entities/bar';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class BarsService {

  constructor(private http: HttpClient) { }

  getAllBars(): Observable<Bar[]>{
    const url = `${API_SERVER.bars}/all`;
    return this.http.get<Bar[]>(url);
  }

}
