import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Bar } from '../../entities/bar';
import { BarsService } from '../../services/bars.services';
import { OffersService } from '../../services/offers.service';
import { Offer } from '../../entities/offer';
import { isTrueProperty } from 'ionic-angular/umd/util/util';
import { Product } from '../../entities/product';
import { ProductType } from '../../enums/productType';
import { ProductService } from '../../services/products.service';

@Component({
  selector: 'page-barDetails',
  templateUrl: 'barDetails.html',
})
export class BarDetaillsPage {

  bar: Bar = new Bar();
  offers: Offer[];
  segmentType = "OFFERS";
 
  showOffers: boolean = true;
  showEvents: boolean = false;
  showMenu: boolean = false;
  foods: boolean = true;
  drinks: boolean = true;
  others: boolean = true;
  
  selectedProductTypes: ProductType[] = [
    ProductType.DRINK,
    ProductType.FOOD,
    ProductType.OTHER
  ];
  filteredProducts: Product[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private barsService: BarsService,
    private offersService: OffersService, private productService: ProductService) {
    this.bar._id = this.navParams.get('id');
    this.bar.name = this.navParams.get('name');
    this.getBar();
  }

  getBar() {
    this.barsService.getBar(this.bar._id).subscribe((bar) => {
      this.bar = bar;
      this.filteredProducts = bar.menuProducts;
      this.filteredProducts.sort(this.comparePrice);
      this.getOffersFromBar();
    });
  }

  getOffersFromBar() {
    this.offersService.getOffersFromBar(this.bar._id).subscribe((offers) => {
      this.offers = offers;
    });
  }

  segmentChanged() {
    if (this.segmentType == "OFFERS") {
      this.showOffers = true;
      this.showEvents = false;
      this.showMenu = false;
    } else if (this.segmentType == "MENU") {
      this.showOffers = false;
      this.showEvents = false;
      this.showMenu = true;
    } else if (this.segmentType == "EVENTS") {
      this.showOffers = false;
      this.showEvents = true;
      this.showMenu = false;
    }
  }

  updateSelectedProducts() {
    this.selectedProductTypes = [];
    this.filteredProducts = this.bar.menuProducts;
    if (this.drinks) this.selectedProductTypes.push(ProductType.DRINK);
    if (this.foods) this.selectedProductTypes.push(ProductType.FOOD);
    if (this.others) this.selectedProductTypes.push(ProductType.OTHER);
    this.filteredProducts = this.filteredProducts.filter(product => this.productIncluded(product));
    this.filteredProducts.sort(this.comparePrice);
  }

  productIncluded(product: Product) {
    let productIncluded: boolean = false;
    this.selectedProductTypes.forEach(productType => {
      if(product.productType == productType) {
        productIncluded = true;
        return;
      }
    });
    return productIncluded;
  }

  comparePrice(productA: Product, productB: Product) {
    if (productA.price < productB.price )
       return -1;
    if (productA.price > productB.price)
      return 1;
    return 0;
  }
}
