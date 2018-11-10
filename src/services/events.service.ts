import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {API_SERVER} from "../app/app.constants";
import {Observable} from "rxjs/Observable";
import { Event } from '../entities/event';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class EventsService {

  constructor(private http: HttpClient) { }

  getAllEvent(): Observable<Event[]> {
    const url = `${API_SERVER.events}`;
    return this.http.get<Event[]>(url);
  }

  getEvent(id: string): Observable<Event> {
    const url = `${API_SERVER.events}/${id}`;
    return this.http.get<Event>(url)
  }

  getEventsFromBar(id: string): Observable<Event[]>  {
    const url = `${API_SERVER.events}`;
    let params = new HttpParams().set("barId", id );
    return this.http.get<Event[]>(url, {headers: httpOptions.headers, params: params}); 
  }
}
