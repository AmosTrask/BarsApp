import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EventsService } from '../../services/events.service';
import { Event } from '../../entities/event';
import { BarsService } from '../../services/bars.services';
import moment from 'moment';
import { GeolocationService } from '../../services/geolocation.service';
import { Coordinates } from '../../entities/coordinates';

@Component({
  selector: 'page-events',
  templateUrl: 'events.html',
})
export class EventsPage {

  events: Event[];
  location: Coordinates;

  constructor(public navCtrl: NavController, public navParams: NavParams, private eventsService: EventsService,
    private barsService: BarsService, private geolocationService: GeolocationService) {
    this.getAllEvents();
  }

  getAllEvents() {
    this.eventsService.getAllEvent().subscribe((events) => {
      this.events = events;
      const promises = [];
      this.events.forEach((event) => {
        event.date = moment(event.date).format('MMMM Do, h:mm a');
        promises.push(this.getBar(event));
      });
      Promise.all(promises).then(() => {
        this.getLocation();
      })
    });
  }

  getBar(event: Event) {
    return new Promise((resolve, reject) => {
      this.barsService.getBar(event.barId).subscribe((bar) => {
        event.barName = bar.name;
        event.barAddress = bar.address;
        event.coordinates = bar.coordinates;
        resolve();
      });
    });
  }

  compareLocation(eventA: Event, eventB: Event) {
    if (eventA.distance < eventB.distance)
      return -1;
    if (eventA.distance > eventB.distance)
      return 1;
    return 0;
  }

  getLocation() {
    this.geolocationService.getPos().then((coords) => {
      this.location = coords;
      this.calculateDistance();
      this.events.sort(this.compareLocation);
    });
  }

  calculateDistance() {
    this.events.forEach(event => {
      let R = 6371; // km
      let dLat = this.toRad(this.location.lat - event.coordinates.lat);
      let dLon = this.toRad(this.location.lng - event.coordinates.lng);
      let lat1 = this.toRad(event.coordinates.lat);
      let lat2 = this.toRad(this.location.lat);

      let a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
      let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      let d = R * c;
      event.distance = (Math.round(d * 100)/100).toFixed(2);
    });
  }

  toRad(value): number {
    return value * Math.PI / 180;
  }
}
