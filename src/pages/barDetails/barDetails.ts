import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Bar } from '../../entities/bar';
import { BarsService } from '../../services/bars.services';
import { OffersService } from '../../services/offers.service';
import { Offer } from '../../entities/offer';

@Component({
  selector: 'page-barDetails',
  templateUrl: 'barDetails.html',
})
export class BarDetaillsPage {

  bar: Bar = new Bar();
  offers: Offer[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private barsService: BarsService,
    private offersService: OffersService) {
    this.bar._id = this.navParams.get('id');
    this.bar.name = this.navParams.get('name');
    this.getBar();
  }

  getBar() {
    this.barsService.getBar(this.bar._id).subscribe((bar) => {
      this.bar = bar;
      this.getOffersFromBar();
    });
  }

  getOffersFromBar() {
    this.offersService.getOffersFromBar(this.bar._id).subscribe((offers) => {
      this.offers = offers;
    });
  }
}
