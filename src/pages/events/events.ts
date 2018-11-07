import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EventsService } from '../../services/events.service';
import { Event } from '../../entities/event';
import { BarsService } from '../../services/bars.services';

@Component({
  selector: 'page-events',
  templateUrl: 'events.html',
})
export class EventsPage {

  events: Event [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private eventsService: EventsService,
    private barsService: BarsService) {
      this.getAllEvents();
  }

  getAllEvents() {
    this.eventsService.getAllEvent().subscribe((events) => {
      this.events = events;
      events.forEach((event) => this.getBar(event));
    });
  }

   getBar(event: Event) {
    this.barsService.getBar(event.barId).subscribe((bar) => {
      event.barName = bar.name;
      event.barAddress = bar.address;
    });
  }

}
