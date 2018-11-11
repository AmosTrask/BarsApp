import { Geolocation } from '@ionic-native/geolocation';
import { Injectable } from '@angular/core';
import { Coordinates } from "../entities/coordinates";

@Injectable()
export class GeolocationService {

    coord: Coordinates = new Coordinates;

    constructor(private geolocation: Geolocation) { }

    async getPos(): Promise<Coordinates> {
        this.coord.lat = null;
        this.coord.lng = null;
        return this.geolocation.getCurrentPosition().then((resp) => {
            this.coord.lat = resp.coords.latitude;
            this.coord.lng = resp.coords.longitude;
            return this.coord;
        });
    }
}
