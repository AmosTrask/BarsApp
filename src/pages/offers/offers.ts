import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { OffersService } from '../../services/offers.service';
import { Offer } from '../../entities/offer';
import { BarsService } from '../../services/bars.services';
import { HomePage } from '../home/home';
import { OfferType } from '../../enums/offerType';

@Component({
  selector: 'page-offers',
  templateUrl: 'offers.html'
})
export class OffersPage {

  offers: Offer[];
  filteredOffers: Offer[];
  offerType: OfferType;

  constructor(public navCtrl: NavController, private offerService: OffersService, private barsService: BarsService) {
    this.offerType = OfferType.DRINK;
    this.getAllOffers();
  }

  getAllOffers() {
    this.offerService.getAllOffers().subscribe((offers) => {
      this.offers = offers;
      offers.forEach((offer) => this.getBar(offer));
      this.segmentChanged();
    });
  }

   getBar(offer: Offer) {
    this.barsService.getBar(offer.barId).subscribe((bar) => {
      offer.barName = bar.name;
      offer.barAddress = bar.address;
    });
  }

  segmentChanged() {
    this.filteredOffers = this.offers.filter(offer => offer.offerType === this.offerType);
  }
}
