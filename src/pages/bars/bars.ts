import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Bar } from '../../entities/bar';
import { BarsService } from '../../services/bars.services';
import { BarDetaillsPage } from '../barDetails/barDetails';
import { Coordinates } from '../../entities/coordinates';
import { GeolocationService } from '../../services/geolocation.service';

@Component({
  selector: 'page-bars',
  templateUrl: 'bars.html',
})
export class BarsPage {

  bars: Bar[];
  rate: number = 5;
  location: Coordinates;

  constructor(public navCtrl: NavController, public navParams: NavParams, private barService: BarsService,
    private geolocationService: GeolocationService) {
    this.getAllBars();
  }

  getAllBars() {
    this.barService.getAllBars().subscribe( (bars) => {
      this.bars = bars;
      this.getLocation();
    });
  }

  goToBarDetails(id: string, name: String) {
    this.navCtrl.push(BarDetaillsPage, {'id': id, 'name': name});
  }
  
  compareLocation(barA: Bar, barB: Bar) {
    if (barA.distance < barB.distance)
      return -1;
    if (barA.distance > barB.distance)
      return 1;
    return 0;
  }

  getLocation() {
    this.geolocationService.getPos().then((coords) => {
      this.location = coords;
      this.calculateDistance();
      this.bars.sort(this.compareLocation);
    });
  }

  calculateDistance() {
    this.bars.forEach(bar => {
      let R = 6371; // km
      let dLat = this.toRad(this.location.lat - bar.coordinates.lat);
      let dLon = this.toRad(this.location.lng - bar.coordinates.lng);
      let lat1 = this.toRad(bar.coordinates.lat);
      let lat2 = this.toRad(this.location.lat);

      let a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
      let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      let d = R * c;
      bar.distance = (Math.round(d * 100)/100).toFixed(2);
    });
  }

  toRad(value): number {
    return value * Math.PI / 180;
  }
}
