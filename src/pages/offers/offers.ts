import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { OffersService } from '../../services/offers.service';
import { Offer } from '../../entities/offer';
import { BarsService } from '../../services/bars.services';
import { IonicSelectableComponent } from 'ionic-selectable';
import { ProductType } from '../../enums/productType';
import { Product } from '../../entities/product';
import { ProductService } from '../../services/products.service';
import { ThrowStmt } from '@angular/compiler';

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

  constructor(public navCtrl: NavController, private offerService: OffersService, private barsService: BarsService,
    private productService: ProductService) {
    this.productType = ProductType.DRINK;
    this.getAllOffers();
    
  }

  getAllOffers() {
    this.offerService.getAllOffers().subscribe(offers => {
      this.offers = offers;
      offers.forEach((offer) => this.getBar(offer));
      this.getProducts();
    });
  }

  getBar(offer: Offer) {
    this.barsService.getBar(offer.barId).subscribe(bar => {
      offer.barName = bar.name;
      offer.barAddress = bar.address;
    });
  }

  getProducts() {
    this.productService.getAllProducts().subscribe(products => {
      this.products = products;
      this.segmentChanged();
    });
  }

  segmentChanged() {
    this.filteredOffers = this.offers.filter(offer => offer.productType === this.productType);
    this.selectableProducts = this.products.filter(produt => produt.productType === this.productType);
    this.selectedProducts = [];
  }

  itemsChanged() {
    if(this.selectedProducts.length != 0) this.filteredOffers = this.filteredOffers.filter(offer => this.findIfProductNameIncluded(offer));
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
}