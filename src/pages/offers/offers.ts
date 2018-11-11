import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { OffersService } from '../../services/offers.service';
import { Offer } from '../../entities/offer';
import { BarsService } from '../../services/bars.services';
import { IonicSelectableComponent } from 'ionic-selectable';
import { ProductType } from '../../enums/productType';
import { Product } from '../../entities/product';
import { ProductService } from '../../services/products.service';
import { Coordinates } from '../../entities/coordinates';
import { GeolocationService } from '../../services/geolocation.service';

@Component({
  selector: 'page-offers',
  templateUrl: 'offers.html'
})
export class OffersPage {

  offers: Offer[];
  filteredOffers: Offer[];
  productType: ProductType;
  products: Product[];
  selectableProducts: Product[];
  selectedProducts: Product[];
  orderType = "PRICE";
  location: Coordinates;

  constructor(public navCtrl: NavController, private offerService: OffersService, private barsService: BarsService,
    private productService: ProductService, private geolocationService: GeolocationService) {
    this.productType = ProductType.DRINK;
    this.getAllOffers();
  }

  getAllOffers() {
    this.offerService.getAllOffers().subscribe(offers => {
      this.offers = offers;
      const promises = [];
      this.offers.forEach((offer) => promises.push(this.getBar(offer)));
      Promise.all(promises).then(() => {
        this.getProducts();
        this.getLocation();
      })
    });
  }

  getBar(offer: Offer) {
    return new Promise((resolve, reject) => {
      this.barsService.getBar(offer.barId).subscribe(bar => {
        offer.barName = bar.name;
        offer.barAddress = bar.address;
        offer.coordinates = bar.coordinates;
        resolve();
      });
    })
  }

  getProducts() {
    this.productService.getAllProducts().subscribe(products => {
      this.products = products;
      this.segmentChanged();
    });
  }

  segmentChanged() {
    this.filteredOffers = this.offers.filter(offer => offer.productType === this.productType);
    this.changeOrder();
    this.selectableProducts = this.products.filter(produt => produt.productType === this.productType);
    this.selectedProducts = [];
  }

  itemsChanged() {
    if(this.selectedProducts.length != 0) {
      this.filteredOffers = this.filteredOffers.filter(offer => this.findIfProductNameIncluded(offer));
      this.changeOrder();
    } 
  }

  findIfProductNameIncluded(offer: Offer): boolean {
    let nameIncluded: boolean = false;
    offer.products.forEach(offerProduct => {
      this.selectedProducts.forEach(product => {
        if(product.name == offerProduct.name) {
          nameIncluded = true;
          return;
        } 
      });
      if(nameIncluded) return;
    });
    return nameIncluded;
  }

  comparePrice(offerA: Offer, offerB: Offer) {
    if (offerA.price < offerB.price )
       return -1;
    if (offerA.price > offerB.price)
      return 1;
    return 0;
  }

  compareLocation(offerA: Offer, offerB: Offer) {
    if (offerA.distance < offerB.distance )
       return -1;
    if (offerA.distance > offerB.distance)
      return 1;
    return 0;
  }

  changeOrder() {
    if(this.orderType == "PRICE") {
      this.filteredOffers.sort(this.comparePrice);
    } else {
      this.filteredOffers.sort(this.compareLocation);
    }
  }

  getLocation() {
    this.geolocationService.getPos().then((coords) => {
      this.location = coords;
      this.calculateDistance();
    });
  }

  calculateDistance() {
    this.offers.forEach(offer => {
      let R = 6371; // km
      let dLat = this.toRad(this.location.lat - offer.coordinates.lat);
      let dLon = this.toRad(this.location.lng - offer.coordinates.lng);
      let lat1 = this.toRad(offer.coordinates.lat);
      let lat2 = this.toRad(this.location.lat);

      let a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
      let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      let d = R * c;
      offer.distance = (Math.round(d * 100)/100).toFixed(2);
    });
  }

  toRad(value): number {
    return value * Math.PI / 180;
  }
}