import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Bar } from '../../entities/bar';

@Component({
  selector: 'page-bars',
  templateUrl: 'bars.html',
})
export class BarsPage {

  bars: Bar[] = [
    {
      name: "Flannery",
      adress: "test",
      lat: 50,
      lng: 50,
      hours: [{
        day: {
          fullName: "Monday",
          reducedName: "Mo"
        },
        open: 10,
        close: 23
      },
      {
        day: {
          fullName: "Tuesday",
          reducedName: "Tu"
        },
        open: 10,
        close: 23
      }
      ]
    },
    {
      name: "O'Nelly",
      adress: "test",
      lat: 50,
      lng: 50,
      hours: [{
        day: {
          fullName: "Monday",
          reducedName: "Mo"
        },
        open: 10,
        close: 23
      }]
    }]

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
}
