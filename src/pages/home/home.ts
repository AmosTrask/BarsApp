import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  goToOffers() {
    this.navCtrl.parent.select(1);
  }

  goToEvents() {
    this.navCtrl.parent.select(4);
  }

  goToMap() {
    this.navCtrl.parent.select(3);
  }
}
