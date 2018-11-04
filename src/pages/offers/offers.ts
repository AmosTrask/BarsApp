import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { OffersService } from '../../services/offers.service';
import { Offer } from '../../entities/offer';
import { BarsService } from '../../services/bars.services';

@Component({
  selector: 'page-offers',
  templateUrl: 'offers.html'
})
export class OffersPage {

  offers: Offer[];

  constructor(public navCtrl: NavController, private offerService: OffersService, private barsService: BarsService) {
    this.getAllOffers();
  }

  getAllOffers() {
    this.offerService.getAllOffers().subscribe((offers) => {
      this.offers = offers;
      offers.forEach((offer) => this.getBar(offer));
    });
  }

   getBar(offer: Offer) {
    this.barsService.getBar(offer.barId).subscribe((bar) => {
      offer.barName = bar.name;
      offer.barAddress = bar.address;
    });
  }

}
