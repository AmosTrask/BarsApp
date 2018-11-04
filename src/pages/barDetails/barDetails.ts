import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Bar } from '../../entities/bar';
import { BarsService } from '../../services/bars.services';

@Component({
  selector: 'page-barDetails',
  templateUrl: 'barDetails.html',
})
export class BarDetaillsPage {

  bar: Bar = new Bar();

  constructor(public navCtrl: NavController, public navParams: NavParams, private barsService: BarsService) {
    this.bar._id = this.navParams.get('id');
    this.bar.name = this.navParams.get('name');
    this.getBar();
  }

  getBar() {
    this.barsService.getBar(this.bar._id).subscribe((bar) => {
      this.bar = bar;
    });
  }
}
